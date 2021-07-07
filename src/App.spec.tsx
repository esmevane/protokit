import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { releases } from 'models';
import { keySequence } from 'test-utils';

import { App } from './App';

it('shows release list on the homepage', async () => {
  const app = render(<App />);

  await app.findByText('Latest releases');
});

it('shows release detail on release click', async () => {
  const app = render(<App />);
  const [book] = releases;

  await app.findByText('Latest releases');
  userEvent.click(await app.findByLabelText(book.attributes.title));

  await app.findByText('Overview');
  await app.findByText(book.attributes.title);
});

it('displays a command launcher', async () => {
  const app = render(<App />);

  await keySequence('?');
  await app.findByText('Useful commands');
  await app.findByText('Open command launcher');
});

it('shows a command launcher when mod+k is pressed', async () => {
  const app = render(<App />);

  await keySequence('mod+k');
  await app.findByPlaceholderText('Command name');
});

it('opens the menu on menu click', async () => {
  const app = render(<App />);

  userEvent.click(await app.findByLabelText('Open menu'));
  await screen.findByLabelText('Menu');
});

it('opens the menu when mod+esc is pressed', async () => {
  render(<App />);

  await keySequence('mod+esc');
  await screen.findByLabelText('Menu');
});

it('navigates to messages on m', async () => {
  const app = render(<App />);

  await keySequence('m');
  await app.findByText('Messages');
});

it('navigates back to releases to messages on r', async () => {
  const app = render(<App />);

  await keySequence('m');
  await keySequence('r');
  await app.findByText('Latest releases');
});

it('navigates to stream on s', async () => {
  const app = render(<App />);

  await keySequence('s');
  await app.findByText('Stream');
});
