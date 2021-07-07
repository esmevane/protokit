import { useMantineTheme } from '@mantine/core';

export function Page(props: Props<unknown>) {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        background: theme.colors.dark[7],
        height: '100%',
      }}
    >
      {props.children}
    </div>
  );
}
