import { Shell } from 'shell';

import { LauncherBinding } from 'components/LauncherBinding';
import { Launcher } from 'components/Launcher';
import { Help } from 'components/Help';
import { Releases } from 'components/Releases';
import { ReleaseDetail } from 'components/ReleaseDetail';
import {
  Workspace,
  WorkspaceBody,
  WorkspaceHeader,
} from 'components/Workspace';
import { IntroCommands } from 'components/IntroCommands';
import { Flex } from 'components/Flex';
import { AppName } from 'components/AppName';
import { AppMenu } from 'components/AppMenu';
import { RenderScreen } from 'components/RenderScreen';
import { Messages } from 'components/Messages';
import { Stream } from 'components/Stream';

export function App() {
  return (
    <Shell>
      <Workspace>
        <WorkspaceHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <AppName />
            <AppMenu />
          </Flex>
        </WorkspaceHeader>
        <WorkspaceBody>
          <RenderScreen for="release-list">
            <Releases />
          </RenderScreen>
          <RenderScreen for="message-list">
            <Messages />
          </RenderScreen>
          <RenderScreen for="stream-list">
            <Stream />
          </RenderScreen>
          <RenderScreen for="release-view">
            <ReleaseDetail />
          </RenderScreen>
        </WorkspaceBody>
      </Workspace>
      <LauncherBinding />
      <IntroCommands />
      <Launcher />
      <Help />
    </Shell>
  );
}
