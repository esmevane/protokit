import { routes } from 'api';
import { messages, releases, stream } from 'models';
import { setupWorker, rest } from 'msw';

function simulatedDelay(timeInMillis: number = 300) {
  return new Promise((resolve) => setTimeout(resolve, timeInMillis));
}

export const handlers = [
  rest.get(routes.health, (_request, response, context) => {
    return response(context.json({ data: { type: 'stats', attributes: {} } }));
  }),
  rest.get(routes.messages, async (_request, response, context) => {
    await simulatedDelay();
    return response(context.json({ data: messages }));
  }),
  rest.get(routes.releases, async (_request, response, context) => {
    await simulatedDelay();
    return response(context.json({ data: releases }));
  }),
  rest.get(routes.stream, async (_request, response, context) => {
    await simulatedDelay();
    return response(context.json({ data: stream }));
  }),
];

export const devServer = () => {
  if (process.env.NODE_ENV === 'development') {
    const worker = setupWorker(...handlers);

    worker.start();
  }
};
