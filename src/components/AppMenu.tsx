import { Burger, Drawer, Text, Title } from '@mantine/core';

import { useAppEvents, useAppSelector, useTranslate } from 'shell';
import { Flex } from './Flex';

export function AppMenu() {
  const t = useTranslate();
  const events = useAppEvents();
  const isOpen = useAppSelector((state) => state.matches('menu.open'));

  const triggerAndClose =
    (givenFunction: () => void) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      givenFunction();
      event.preventDefault();
      events.menu.close();
    };

  return (
    <>
      <Burger
        opened={isOpen}
        color="indigo"
        aria-label={t('menu.button')}
        onClick={events.menu.open}
      />
      <Drawer
        opened={isOpen}
        onClose={events.menu.close}
        padding="lg"
        size="xl"
        aria-labelledby="app-menu-title"
      >
        <Flex flexDirection="column" gap="1rem">
          <Title order={3} id="app-menu-title">
            {t('menu.title')}
          </Title>
          <Text
            variant="link"
            component="a"
            href="#"
            onClick={triggerAndClose(events.screens.messages)}
          >
            {t('screens.message.list.link')}
          </Text>
          <Text
            variant="link"
            component="a"
            href="#"
            onClick={triggerAndClose(events.screens.stream)}
          >
            {t('screens.stream.list.link')}
          </Text>
          <Text
            variant="link"
            component="a"
            href="#"
            onClick={triggerAndClose(events.screens.releases)}
          >
            {t('screens.release.list.link')}
          </Text>
        </Flex>
      </Drawer>
    </>
  );
}
