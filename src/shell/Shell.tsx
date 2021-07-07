import { MantineProvider } from '@mantine/core';
import { useInterpret } from '@xstate/react';
import { useCallback } from 'react';

import { t } from 'localization';

import { app } from './state';
import {
  ApplicationStateContext,
  LocalizationProviderContext,
} from './context';
import { ThemeVariables } from './ThemeVariables';

export function Shell(props: Props<unknown>) {
  const service = useInterpret(app, { devTools: true });
  const translate = useCallback(t, []);

  return (
    <ApplicationStateContext.Provider value={service}>
      <MantineProvider
        theme={{
          colorScheme: 'dark',
        }}
      >
        <LocalizationProviderContext.Provider value={translate}>
          <>{props.children}</>
          <ThemeVariables />
        </LocalizationProviderContext.Provider>
      </MantineProvider>
    </ApplicationStateContext.Provider>
  );
}
