import { Card, Text, Title } from '@mantine/core';
import { useEffect } from 'react';

import { useAppEvents, useAppSelector, useTranslate } from 'shell';
import { Flex } from 'components/Flex';
import { Page } from 'components/Page';

import classes from './Stream.module.css';

export function Stream() {
  const t = useTranslate();
  const appEvents = useAppEvents();
  const stream = useAppSelector((state) => state.context.cache.stream.data);
  const loading = useAppSelector((state) => state.matches('stream.loading'));

  useEffect(() => {
    appEvents.stream.fetch();
    // eslint-disable-next-line
  }, []);

  return (
    <Page>
      <Flex style={{ padding: '1rem', opacity: loading ? '0.6' : '1' }}>
        <Title color="indigo" order={1}>
          {t('screens.stream.list.title')}
        </Title>
      </Flex>
      <section className={classes.body}>
        {stream.map((streamItem) => (
          <Card key={streamItem.actor}>
            <Flex
              flexDirection="column"
              justifyContent="space-between"
              gap="2rem"
            >
              <Flex gap="1rem" flexDirection="column">
                <Text weight={600} size="xl">
                  {streamItem.actor}
                </Text>
                <Text>{streamItem.content}</Text>
              </Flex>
            </Flex>
          </Card>
        ))}
      </section>
    </Page>
  );
}
