import { useMantineTheme } from '@mantine/core';
import classes from './Workspace.module.css';

export function Workspace(props: Props<unknown>) {
  const theme = useMantineTheme();

  return (
    <div
      className={classes.container}
      style={{ '--background': theme.colors.dark[8] } as any}
    >
      {props.children}
    </div>
  );
}

export function WorkspaceHeader({ children }: Props<unknown>) {
  return <div className={classes.header}>{children}</div>;
}

export function WorkspaceBody({ children }: Props<unknown>) {
  return <div className={classes.body}>{children}</div>;
}
