import { Group, Highlight, Modal, Paper, Text, TextInput } from '@mantine/core';
import { Search } from '@styled-icons/boxicons-solid';
import { useAppEvents, useAppSelector } from 'shell';
import { useState } from 'react';

interface CommandEntryProps {
  query: string;
  match: AppCommand;
  hovered?: boolean;
  selected?: boolean;
}

function CommandEntry(props: Props<CommandEntryProps>) {
  const events = useAppEvents();
  const [hovered, setHovered] = useState(props.hovered ?? false);

  const styles = {
    opacity: props.selected ? 1 : hovered ? 1 : 0.5,
    cursor: 'pointer',
  };

  return (
    <Paper
      style={styles}
      onPointerOver={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Group
        position="apart"
        onClick={() => {
          props.match.exec();
          events.commands.filter('');
          events.launcher.close();
        }}
      >
        <Highlight
          weight={700}
          transform="uppercase"
          color={props.selected ? 'gray' : 'blue'}
          size="sm"
          highlight={props.query}
        >
          {props.match.name}
        </Highlight>
        <Text>{props.match.sequence}</Text>
      </Group>
    </Paper>
  );
}

export function Launcher() {
  const events = useAppEvents();
  const isOpen = useAppSelector((state) => state.matches('launcher.open'));
  const commandState = useAppSelector((state) => state.context.commands);

  const moveSelection = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.code === 'ArrowDown') {
      event.preventDefault();
      events.commands.next();
    }

    if (event.nativeEvent.code === 'ArrowUp') {
      event.preventDefault();
      events.commands.prev();
    }

    if (event.nativeEvent.code === 'Enter') {
      events.commands.exec();
    }
  };

  // Next up
  //
  // "Enter" executes the selected command, and closes the modal
  // Commands should be fed into the launcher by the app - I shouldn't need to change the launcher to update the commands
  // Events submitted pass through app charts

  // Wai aria counterpart is a combobox, this is a combobox for commands
  //
  return (
    <Modal
      size="lg"
      transition="slide-down"
      hideCloseButton
      opened={isOpen}
      onClose={events.launcher.close}
    >
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          display: 'grid',
          gap: '1rem',
          gridTemplate: '"input" 1fr "results" minmax(10px, auto)',
        }}
      >
        <TextInput
          placeholder="Command name"
          variant="filled"
          value={commandState.query}
          onChange={(event) =>
            events.commands.filter(event.currentTarget.value)
          }
          onKeyDown={moveSelection}
          icon={<Search size={16} />}
          data-autofocus
        />
        <Paper>
          {commandState.matches.map((match, index) => (
            <CommandEntry
              key={match.name}
              query={commandState.query}
              match={match}
              selected={index === commandState.selection}
            />
          ))}

          {commandState.matches.length === 0 ? (
            <Group
              style={{ opacity: '0.4', height: '2.75rem' }}
              position="apart"
            >
              <Text weight={700} transform="uppercase" color="gray" size="sm">
                No results
              </Text>
            </Group>
          ) : null}
        </Paper>
      </div>
    </Modal>
  );
}
