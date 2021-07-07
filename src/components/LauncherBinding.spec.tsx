import { screen } from '@testing-library/react';

import * as TestUtils from 'test-utils';

import { LauncherBinding } from './LauncherBinding';
import { useAppSelector } from '../shell';

function LauncherDiagnostics() {
  const isOpen = useAppSelector((state) => state.matches('launcher.open'));

  return isOpen ? <>Launcher open</> : <>Launcher closed</>;
}

it('links launcher.toggle the mod+k keybinding', async () => {
  await TestUtils.renderWithAppShell(
    <>
      <LauncherBinding />
      <LauncherDiagnostics />
    </>
  );

  await TestUtils.keySequence('mod+k');
  await screen.findByText('Launcher open');
});
