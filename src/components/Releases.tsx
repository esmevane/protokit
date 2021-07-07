import { Title } from '@mantine/core';
import { useEffect } from 'react';

import { Release } from './Release';
import classes from './Releases.module.css';
import { Page } from './Page';
import { useAppSelector, useTranslate, useAppEvents } from '../shell';

export function Releases() {
  const t = useTranslate();
  const appEvents = useAppEvents();
  const releases = useAppSelector((state) => state.context.cache.release.data);
  const loading = useAppSelector((state) => state.matches('releases.loading'));

  useEffect(() => {
    appEvents.releases.fetch();
    // eslint-disable-next-line
  }, []);

  return (
    <Page>
      <div
        data-testid="releases-container"
        className={classes.container}
        style={{
          opacity: loading ? '0.6' : '1',
        }}
      >
        <header className={classes.header}>
          <Title>{t('screens.release.list.title')}</Title>
        </header>
        <section className={classes.body}>
          {releases.map((release) => (
            <Release key={release.id} release={release} />
          ))}
        </section>
      </div>
    </Page>
  );
}
