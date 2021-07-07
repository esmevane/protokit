import { screen } from '@testing-library/react';
import { routes } from 'api';

import { releases } from 'models';
import * as TestUtils from 'test-utils';

import { Releases } from './Releases';

it('shows latest releases', async () => {
  await TestUtils.renderWithAppShell(<Releases />);

  await screen.findByText('Latest releases');
  await screen.findByText(releases[0].attributes.title);
});

it('is loading when fetching releases', async () => {
  TestUtils.server.use(
    TestUtils.rest.get(routes.releases, async (_, response, context) => {
      await new Promise((resolve) => setTimeout(resolve, 1000000));

      return response(context.json({}));
    })
  );

  const releases = await TestUtils.renderWithAppShell(<Releases />);
  const container = await releases.findByTestId('releases-container');

  await screen.findByText('Latest releases');

  expect(container.style.opacity).toEqual('0.6');
});
