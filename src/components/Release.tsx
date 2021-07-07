import { Card, Overlay } from '@mantine/core';

import { Release as ReleaseModel } from 'models';
import { useAppEvents } from 'shell';

import classes from './Release.module.css';
import { Flex } from './Flex';

export function Release({ release }: Props<{ release: ReleaseModel }>) {
  const events = useAppEvents();

  return (
    <Card padding={0}>
      <Flex flexDirection="column" justifyContent="space-between">
        <div
          onClick={(event) => event.preventDefault()}
          className={classes.container}
        >
          <div className={classes.title}>{release.title}</div>
          <div className={classes.author}>{release.authors.join(', ')}</div>
          <div className={classes.price}>{release.cost}</div>
        </div>
        <div className={classes.summary}>{release.summary}</div>
      </Flex>
      <Overlay
        opacity={0}
        aria-label={release.title}
        component="a"
        href="#"
        onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          event.preventDefault();
          events.focus.release(release.id);
        }}
      />
    </Card>
  );
}
