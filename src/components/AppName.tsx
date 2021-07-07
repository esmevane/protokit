import { Title } from '@mantine/core';

import { useTranslate } from 'shell';

export function AppName() {
  const t = useTranslate();
  return (
    <Title color="indigo" order={1}>
      {t('application')}
    </Title>
  );
}
