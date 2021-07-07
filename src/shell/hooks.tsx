import { useSelector } from '@xstate/react';
import { useMemo } from 'react';
import { useContext } from 'react';
import { InterpreterFrom } from 'xstate';

import { app } from './state';
import {
  ApplicationStateContext,
  LocalizationProviderContext,
} from './context';

export function useTranslate() {
  const translate = useContext(LocalizationProviderContext);

  if (!translate) {
    throw new Error('useTranslate must be used within a Shell');
  }

  return translate;
}

export function useApp() {
  const service = useContext(ApplicationStateContext);

  if (!service) {
    throw new Error('useAppState must be used within a Shell');
  }

  const events = useMemo(
    () => ({
      focus: {
        release: (id: string) => service.send({ type: 'focus-release', id }),
      },
      screens: {
        releases: () => service.send('screen-release-list'),
        messages: () => service.send('screen-message-list'),
        stream: () => service.send('screen-stream-list'),
      },
      commands: {
        change: (commands: AppCommand[]) =>
          service.send({ type: 'change-commands', commands }),
        exec: () => service.send('exec-command'),
        filter: (query: string) =>
          service.send({ type: 'filter-commands', query }),
        next: () => service.send('next-command'),
        prev: () => service.send('prev-command'),
      },
      help: {
        toggle: () => service.send(`toggle-help`),
        close: () => service.send(`close-help`),
        open: () => service.send(`open-help`),
      },
      launcher: {
        toggle: () => service.send(`toggle-launcher`),
        close: () => service.send(`close-launcher`),
        open: () => service.send(`open-launcher`),
      },
      menu: {
        toggle: () => service.send(`toggle-menu`),
        close: () => service.send(`close-menu`),
        open: () => service.send(`open-menu`),
      },
      messages: {
        fetch: () => service.send('fetch-message'),
        retry: () => service.send('retry-message'),
      },
      releases: {
        fetch: () => service.send('fetch-release'),
        retry: () => service.send('retry-release'),
      },
      stream: {
        fetch: () => service.send('fetch-stream'),
        retry: () => service.send('retry-stream'),
      },
    }),
    // eslint-disable-next-line
    []
  );

  return [service, events] as const;
}

export function useAppState() {
  const [appState] = useApp();

  return appState;
}

export function useAppEvents() {
  const [, appEvents] = useApp();

  return appEvents;
}

export function useAppSelector<GivenReturnType>(
  selector: (
    givenState: InterpreterFrom<typeof app>['state']
  ) => GivenReturnType
) {
  const service = useAppState();

  return useSelector(service, selector);
}
