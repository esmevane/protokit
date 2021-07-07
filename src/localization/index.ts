import i18next from 'i18next';

import { resources } from './resources';

i18next.init({
  lng: 'en',
  debug: process.env.NODE_ENV === 'development',
  resources,
});

export const t = i18next.t.bind(i18next);
