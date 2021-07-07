import Mousetrap from 'mousetrap';
import { useEffect } from 'react';

import { useAppEvents } from 'shell';

export function LauncherBinding() {
  const events = useAppEvents();

  useEffect(() => {
    Mousetrap.bind('mod+k', (event) => {
      events.launcher.toggle();

      return false;
    });

    return () => {
      Mousetrap.unbind('mod+k');
    };
  });

  return null;
}
