import userEvent from '@testing-library/user-event';
import * as TestUtils from 'test-utils';

import { useAppEvents, useAppSelector } from './hooks';

function CommandDiagnostics({
  commands = [],
}: Props<{ commands?: AppCommand[] }>) {
  const systemCommands = useAppSelector((state) => state.context.commands);
  const isOpen = useAppSelector((state) => state.matches('launcher.open'));
  const events = useAppEvents();
  const submitCommands = () => events.commands.change(commands);
  return (
    <div>
      <section>
        <header>Commands</header>
        <ul>
          {systemCommands.matches.map((command, index) => (
            <li
              className={systemCommands.selection === index ? 'selected' : ''}
              key={command.name}
            >
              {command.name}
            </li>
          ))}
        </ul>
      </section>
      <div>Current query: {systemCommands.query || 'none'}</div>
      <div>Launcher {isOpen ? 'open' : 'closed'}</div>
      <div>
        Selected command:{' '}
        {systemCommands.matches[systemCommands.selection]?.name}
      </div>
      <input
        onChange={(event) => events.commands.filter(event.currentTarget.value)}
        placeholder="Filter commands"
      />
      <button onClick={events.launcher.open}>Open launcher</button>
      <button onClick={submitCommands}>Submit commands</button>
      <button onClick={events.commands.exec}>Execute</button>
      <button onClick={events.commands.next}>Next command</button>
      <button onClick={events.commands.prev}>Prev command</button>
    </div>
  );
}

describe('Command palette', () => {
  const newCommand = {
    name: 'New command',
    exec: () => {},
    sequence: null,
    mapping: null,
  };

  const secondCommand = {
    name: 'Second command',
    exec: () => {},
    sequence: null,
    mapping: null,
  };

  it('accepts commands from the command-change event', async () => {
    const system = await TestUtils.renderWithAppShell(
      <CommandDiagnostics commands={[newCommand]} />
    );

    userEvent.click(await system.findByText('Submit commands'));

    await system.findByText('New command');
  });

  it('selects the first command by default', async () => {
    const system = await TestUtils.renderWithAppShell(
      <CommandDiagnostics commands={[newCommand]} />
    );

    userEvent.click(await system.findByText('Submit commands'));

    const command = await system.findByText('New command');

    expect(command.classList).toContain('selected');
  });

  it('selects the first option on next-command', async () => {
    const system = await TestUtils.renderWithAppShell(
      <CommandDiagnostics commands={[newCommand, secondCommand]} />
    );

    userEvent.click(await system.findByText('Submit commands'));
    userEvent.click(await system.findByText('Next command'));

    const deselectedCommand = await system.findByText('New command');
    expect(deselectedCommand.classList).not.toContain('selected');

    const selectedCommand = await system.findByText('Second command');
    expect(selectedCommand.classList).toContain('selected');
  });

  it('next-command stops at the last command', async () => {
    const system = await TestUtils.renderWithAppShell(
      <CommandDiagnostics commands={[newCommand, secondCommand]} />
    );

    userEvent.click(await system.findByText('Submit commands'));
    userEvent.click(await system.findByText('Next command'));
    userEvent.click(await system.findByText('Next command'));

    const deselectedCommand = await system.findByText('New command');
    expect(deselectedCommand.classList).not.toContain('selected');

    const selectedCommand = await system.findByText('Second command');
    expect(selectedCommand.classList).toContain('selected');
  });

  it('prev-command stops at the first command', async () => {
    const system = await TestUtils.renderWithAppShell(
      <CommandDiagnostics commands={[newCommand, secondCommand]} />
    );

    userEvent.click(await system.findByText('Submit commands'));
    userEvent.click(await system.findByText('Prev command'));
    userEvent.click(await system.findByText('Prev command'));

    const selectedCommand = await system.findByText('New command');
    expect(selectedCommand.classList).toContain('selected');
  });

  it('prev-command selects the previous command', async () => {
    const system = await TestUtils.renderWithAppShell(
      <CommandDiagnostics commands={[newCommand, secondCommand]} />
    );

    userEvent.click(await system.findByText('Submit commands'));
    userEvent.click(await system.findByText('Next command'));

    const command = await system.findByText('Second command');
    expect(command.classList).toContain('selected');

    userEvent.click(await system.findByText('Prev command'));

    const firstCommand = await system.findByText('New command');
    expect(command.classList).not.toContain('selected');
    expect(firstCommand.classList).toContain('selected');
  });

  it("filter-commands removes any commands which don't match", async () => {
    const system = await TestUtils.renderWithAppShell(
      <CommandDiagnostics commands={[newCommand, secondCommand]} />
    );

    userEvent.click(await system.findByText('Submit commands'));
    userEvent.click(await system.findByText('Next command'));
    userEvent.type(
      await system.findByPlaceholderText('Filter commands'),
      'cond'
    );

    expect(system.queryByText('New command')).toBeNull();

    const command = await system.findByText('Second command');
    expect(command.classList).toContain('selected');
  });

  it('exec-command executes the selected command', async () => {
    const listener = jest.fn();
    const system = await TestUtils.renderWithAppShell(
      <CommandDiagnostics
        commands={[newCommand, { ...secondCommand, exec: listener }]}
      />
    );

    userEvent.click(await system.findByText('Submit commands'));
    userEvent.click(await system.findByText('Next command'));
    userEvent.type(
      await system.findByPlaceholderText('Filter commands'),
      'cond'
    );

    userEvent.click(await system.findByText('Open launcher'));
    userEvent.click(await system.findByText('Execute'));

    expect(listener).toHaveBeenCalled();

    await system.findByText('Launcher closed');
    await system.findByText('Current query: none');
  });
});
