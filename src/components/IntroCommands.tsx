import { Kbd } from '@mantine/core';
import { useAppEvents } from 'shell';
import Mousetrap from 'mousetrap';
import { useEffect } from 'react';

const createCommands = (events: ReturnType<typeof useAppEvents>) => [
  {
    name: 'Reload releases',
    exec: events.releases.fetch,
    sequence: null,
    mapping: null,
  },
  {
    name: 'Help',
    exec: events.help.open,
    sequence: <Kbd>?</Kbd>,
    mapping: '?',
  },
  {
    name: 'Latest releases',
    exec: events.screens.releases,
    sequence: (
      <>
        <Kbd>l</Kbd>
      </>
    ),
    mapping: 'r',
  },
  {
    name: 'Messages',
    exec: events.screens.messages,
    sequence: (
      <>
        <Kbd>m</Kbd>
      </>
    ),
    mapping: 'm',
  },
  {
    name: 'Stream',
    exec: events.screens.stream,
    sequence: (
      <>
        <Kbd>s</Kbd>
      </>
    ),
    mapping: 's',
  },
  {
    name: 'Menu',
    exec: events.menu.open,
    sequence: (
      <>
        <Kbd>Mod</Kbd>+<Kbd>Esc</Kbd>
      </>
    ),
    mapping: 'mod+esc',
  },
];

export function IntroCommands() {
  const events = useAppEvents();

  useEffect(() => {
    const commands = createCommands(events);
    for (const command of commands) {
      if (command.mapping) {
        Mousetrap.bind(command.mapping, command.exec);
      }
    }

    if (commands.length > 0) {
      events.commands.change(commands);
    }

    return () => {
      for (const command of commands) {
        if (command.mapping) {
          Mousetrap.unbind(command.mapping);
        }
      }
    };
    // eslint-disable-next-line
  }, []);

  return null;
}
