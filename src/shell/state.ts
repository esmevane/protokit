import { assign } from '@xstate/immer';
import { Machine, send } from 'xstate';

import { messages, releases, stream } from 'api';

type CommandEvents =
  | { type: 'change-commands'; commands: AppCommand[] }
  | { type: 'exec-command' }
  | { type: 'filter-commands'; query: string }
  | { type: 'next-command' }
  | { type: 'prev-command' };

type AsyncEvent = 'fetch' | 'retry';
type ToggleEvent = 'close' | 'open' | 'toggle';

type AppEvent =
  | CommandEvents
  | { type: `${AsyncEvent}-${keyof Payloads}` }
  | { type: `focus-release`; id: string }
  | { type: `screen-${ScreenNames}` }
  | { type: `${ToggleEvent}-${'launcher' | 'menu' | 'help'}` };

interface AsyncSchema {
  initial: 'idle';
  states: {
    idle: {};
    loading: {};
    success: {};
    failure: {};
  };
}

interface ToggleSchema {
  initial: 'closed';
  states: {
    open: {};
    closed: {};
  };
}

interface AppSchema {
  states: {
    help: ToggleSchema;
    launcher: ToggleSchema;
    menu: ToggleSchema;
    releases: AsyncSchema;
    messages: AsyncSchema;
    stream: AsyncSchema;
    screen: {
      states: Record<ScreenNames, {}>;
    };
  };
}

type AsyncResource<GivenResource extends PayloadKind> = {
  error: string | null;
  data: Payloads[GivenResource][];
};

interface FocusResource {
  focus: string | null;
}

interface AppState {
  cache: {
    [K in keyof Payloads]: AsyncResource<K>;
  };
  focusTopics: {
    [K in keyof Payloads]: FocusResource;
  };
  commands: {
    entries: AppCommand[];
    selection: number;
    query: string;
    matches: AppCommand[];
  };
}

export const app = Machine<AppState, AppSchema, AppEvent>({
  type: 'parallel',
  context: {
    commands: {
      selection: 0,
      matches: [],
      query: '',
      entries: [],
    },
    focusTopics: {
      release: { focus: null },
      message: { focus: null },
      stream: { focus: null },
    },
    cache: {
      message: { error: null, data: [] },
      release: { error: null, data: [] },
      stream: { error: null, data: [] },
    },
  },
  on: {
    'focus-release': [
      {
        cond: (context, event) =>
          context.cache.release.data
            .map((release) => release.id)
            .includes(event.id),
        target: ['.screen.release-view'],
        actions: assign((context, event) => {
          context.focusTopics.release.focus = event.id;
        }),
      },
    ],
    'change-commands': {
      actions: assign((context, event) => {
        context.commands.entries = event.commands;
        context.commands.matches = event.commands;
        context.commands.selection = 0;
        context.commands.query = '';
      }),
    },
    'exec-command': {
      actions: [
        (context) => {
          const command = context.commands.matches[context.commands.selection];

          command?.exec();
        },
        send({ type: 'filter-commands', query: '' }),
      ],
      target: ['.launcher.closed'],
    },
    'filter-commands': {
      actions: [
        assign((context, event) => {
          context.commands.selection = 0;
          context.commands.query = event.query;
        }),
        assign((context, event) => {
          context.commands.matches = context.commands.matches
            .filter((command) =>
              command.name
                .toLowerCase()
                .includes(event.query.trim().toLowerCase())
            )
            .slice(0, 10);
          context.commands.query = event.query;
        }),
      ],
    },
    'next-command': {
      actions: assign((context) => {
        context.commands.selection =
          context.commands.selection < context.commands.entries.length - 1
            ? context.commands.selection + 1
            : context.commands.selection;
      }),
    },
    'prev-command': {
      actions: assign((context) => {
        context.commands.selection =
          context.commands.selection > 0
            ? context.commands.selection - 1
            : context.commands.selection;
      }),
    },
  },
  states: {
    help: {
      initial: 'closed',
      states: {
        open: {
          on: { 'toggle-help': 'closed', 'close-help': 'closed' },
        },
        closed: { on: { 'toggle-help': 'open', 'open-help': 'open' } },
      },
    },
    launcher: {
      initial: 'closed',
      states: {
        open: {
          on: { 'toggle-launcher': 'closed', 'close-launcher': 'closed' },
        },
        closed: { on: { 'toggle-launcher': 'open', 'open-launcher': 'open' } },
      },
    },
    menu: {
      initial: 'closed',
      states: {
        open: {
          on: { 'toggle-menu': 'closed', 'close-menu': 'closed' },
        },
        closed: { on: { 'toggle-menu': 'open', 'open-menu': 'open' } },
      },
    },
    messages: {
      initial: 'idle',
      states: {
        idle: { on: { 'fetch-message': 'loading' } },
        success: { on: { 'fetch-message': 'loading' } },
        failure: {
          on: { 'retry-message': 'loading' },
          exit: assign((context) => {
            context.cache.message.error = null;
          }),
        },
        loading: {
          invoke: {
            src: messages,
            onDone: {
              target: 'success',
              actions: assign((context, event) => {
                context.cache.message.data = event.data;
              }),
            },
            onError: {
              target: 'failure',
              actions: assign((context, event) => {
                context.cache.message.error = event.data;
              }),
            },
          },
        },
      },
    },
    releases: {
      initial: 'idle',
      states: {
        idle: { on: { 'fetch-release': 'loading' } },
        success: { on: { 'fetch-release': 'loading' } },
        failure: {
          on: { 'retry-release': 'loading' },
          exit: assign((context) => {
            context.cache.release.error = null;
          }),
        },
        loading: {
          invoke: {
            src: releases,
            onDone: {
              target: 'success',
              actions: assign((context, event) => {
                context.cache.release.data = event.data;
              }),
            },
            onError: {
              target: 'failure',
              actions: assign((context, event) => {
                context.cache.release.error = event.data;
              }),
            },
          },
        },
      },
    },
    stream: {
      initial: 'idle',
      states: {
        idle: { on: { 'fetch-stream': 'loading' } },
        success: { on: { 'fetch-stream': 'loading' } },
        failure: {
          on: { 'retry-stream': 'loading' },
          exit: assign((context) => {
            context.cache.stream.error = null;
          }),
        },
        loading: {
          invoke: {
            src: stream,
            onDone: {
              target: 'success',
              actions: assign((context, event) => {
                context.cache.stream.data = event.data;
              }),
            },
            onError: {
              target: 'failure',
              actions: assign((context, event) => {
                context.cache.stream.error = event.data;
              }),
            },
          },
        },
      },
    },
    screen: {
      initial: 'release-list',
      on: {
        'screen-message-list': '.message-list',
        'screen-release-list': '.release-list',
        'screen-stream-list': '.stream-list',
      },
      states: {
        'message-list': {},
        'message-view': {},
        'release-list': {},
        'release-view': {},
        'stream-list': {},
        'stream-view': {},
      },
    },
  },
});
