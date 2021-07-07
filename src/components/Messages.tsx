import { Card, Text, Title } from '@mantine/core';
import { useEffect } from 'react';

import { useAppEvents, useAppSelector, useTranslate } from 'shell';
import { Flex } from 'components/Flex';
import { Page } from 'components/Page';

import classes from './Messages.module.css';

export function Messages() {
  const t = useTranslate();
  const appEvents = useAppEvents();
  const messages = useAppSelector((state) => state.context.cache.message.data);
  const loading = useAppSelector((state) => state.matches('messages.loading'));

  useEffect(() => {
    appEvents.messages.fetch();
    // eslint-disable-next-line
  }, []);

  return (
    <Page>
      <Flex style={{ padding: '1rem', opacity: loading ? '0.6' : '1' }}>
        <Title color="indigo" order={1}>
          {t('screens.message.list.title')}
        </Title>
      </Flex>
      <section className={classes.body}>
        {messages.map((message) => (
          <Card key={message.author}>
            <Flex gap="1rem" flexDirection="column">
              <Text weight={600} size="xl">
                {message.author}
              </Text>
              <Text>{message.content}</Text>
            </Flex>
          </Card>
        ))}
      </section>
    </Page>
  );
}
