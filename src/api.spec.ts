import faker from 'faker';

import * as API from 'api';
import * as TestUtils from 'test-utils';
import { messagePayload, streamPayload } from 'models';

describe('messages', () => {
  it('gets the message inbox', async () => {
    const expectation: Payload<'message'> = messagePayload();

    TestUtils.server.use(
      TestUtils.rest.get(API.routes.messages, (request, response, context) => {
        return response(context.json({ data: [expectation] }));
      })
    );

    expect(await API.messages()).toEqual([expectation.attributes]);
  });
});

describe('releases', () => {
  it('gets releases', async () => {
    const expectation: Payload<'release'> = {
      type: 'release',
      attributes: {
        id: faker.datatype.uuid(),
        authors: [faker.fake('{{name.firstName}} {{name.lastName}}')],
        title: faker.commerce.productName(),
        summary: faker.commerce.productDescription(),
        cost: faker.finance.amount(),
      },
    };

    TestUtils.server.use(
      TestUtils.rest.get(API.routes.releases, (request, response, context) => {
        return response(context.json({ data: [expectation] }));
      })
    );

    expect(await API.releases()).toEqual([expectation.attributes]);
  });
});

describe('stream', () => {
  it('gets the stream inbox', async () => {
    const expectation: Payload<'stream'> = streamPayload();

    TestUtils.server.use(
      TestUtils.rest.get(API.routes.stream, (request, response, context) => {
        return response(context.json({ data: [expectation] }));
      })
    );

    expect(await API.stream()).toEqual([expectation.attributes]);
  });
});
