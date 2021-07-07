import { Title } from '@mantine/core';
import { Modal, Kbd, Text } from '@mantine/core';
import { useAppEvents, useAppSelector, useTranslate } from 'shell';
import { Flex } from './Flex';

function CommandItem(
  props: Props<{ title: React.ReactNode; sequence: React.ReactNode }>
) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      style={{ width: '100%' }}
    >
      <Text>{props.title}</Text>
      <Text>{props.sequence}</Text>
    </Flex>
  );
}

export function Help() {
  const t = useTranslate();
  const isOpen = useAppSelector((state) => state.matches('help.open'));
  const events = useAppEvents();

  return (
    <Modal
      size="lg"
      transition="slide-down"
      hideCloseButton
      opened={isOpen}
      onClose={events.help.close}
    >
      <Flex flexDirection="column" gap="0.5rem">
        <Title style={{ lineHeight: 2 }}>{t('help.title')}</Title>
        <CommandItem
          title={t('commands.launcher')}
          sequence={
            <>
              <Kbd>Mod</Kbd> + <Kbd>K</Kbd>
            </>
          }
        />
        <CommandItem
          title={t('commands.menu')}
          sequence={
            <>
              <Kbd>Mod</Kbd> + <Kbd>Esc</Kbd>
            </>
          }
        />
      </Flex>
    </Modal>
  );
}
