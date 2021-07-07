import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { handlers } from 'server';

const server = setupServer(...handlers);

export { server, rest };
