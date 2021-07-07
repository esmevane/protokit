import { createContext } from 'react';
import { InterpreterFrom } from 'xstate';

import { t } from 'localization';

import { app } from './state';

export const LocalizationProviderContext = createContext<typeof t | null>(null);
export const ApplicationStateContext =
  createContext<InterpreterFrom<typeof app> | null>(null);
