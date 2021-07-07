import { Button, Text, Title } from '@mantine/core';

import { useAppSelector, useTranslate } from 'shell';

import classes from './ReleaseDetail.module.css';
import { Page } from './Page';
import { Flex } from './Flex';

export function ReleaseDetail() {
  const t = useTranslate();
  const release = useAppSelector((state) => {
    const items = state.context.cache.release.data;
    const focus = state.context.focusTopics.release.focus;

    if (focus) {
      return items.find((release) => release.id === focus) || null;
    }

    return null;
  });

  return release ? (
    <Page>
      <section className={classes.container}>
        <header className={classes.header}>
          <Title>{t('screens.release.view.title')}</Title>
        </header>
        <Flex flexDirection="column" gap="1rem" className={classes.body}>
          <Text color="indigo" size="xl">
            {release.title}
          </Text>
          <Text color="indigo">{release.authors.join(', ')}</Text>
          <section>
            <Text>{release.summary}</Text>
          </section>
          <Button color="indigo">{release.cost}</Button>
        </Flex>
      </section>
    </Page>
  ) : null;
}
