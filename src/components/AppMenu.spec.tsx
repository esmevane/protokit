import { waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import * as TestUtils from 'test-utils';

import { AppMenu } from './AppMenu';

it('has a title and links', async () => {
  const menu = await TestUtils.renderWithAppShell(<AppMenu />);

  userEvent.click(await menu.findByLabelText('Open menu'));

  await menu.findByLabelText('Menu');

  await menu.findByText('Inbox');
  await menu.findByText('Releases');
  await menu.findByText('Stream');
});

it('clicking a link closes the menu', async () => {
  const menu = await TestUtils.renderWithAppShell(<AppMenu />);

  userEvent.click(await menu.findByLabelText('Open menu'));
  userEvent.click(await menu.findByText('Inbox'));

  await waitForElementToBeRemoved(() => menu.queryByLabelText('Menu'));
});
