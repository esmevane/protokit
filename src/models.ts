import faker from 'faker';

declare global {
  interface Payloads {
    message: Message;
    release: Release;
    stream: Stream;
  }
}

export interface Message {
  author: string;
  content: string;
  sentAt: number;
}

export interface Release {
  id: string;
  title: string;
  summary: string;
  cost: string;
  authors: string[];
}

export interface Stream {
  type: string;
  actor: string;
  content: string;
  sentAt: number;
}

export function message(attributes: Partial<Message> = {}): Message {
  return {
    author: faker.fake(
      '{{name.firstName}} {{name.lastName}} ({{internet.userName}})'
    ),
    content: faker.lorem.paragraph(),
    sentAt: faker.time.recent(),
    ...attributes,
  };
}

export function messagePayload(
  attributes: Partial<Message> = {}
): Payload<'message'> {
  return { type: 'message', attributes: message(attributes) };
}

export const messages = [
  messagePayload(),
  messagePayload(),
  messagePayload(),
  messagePayload(),
  messagePayload(),
  messagePayload(),
  messagePayload(),
];

export function release(attributes: Partial<Release> = {}): Release {
  return {
    id: faker.datatype.uuid(),
    authors: [faker.fake('{{name.firstName}} {{name.lastName}}')],
    title: faker.commerce.productName(),
    summary: faker.commerce.productDescription(),
    cost: faker.finance.amount(),
    ...attributes,
  };
}

export function releasePayload(
  attributes: Partial<Release> = {}
): Payload<'release'> {
  return { type: 'release', attributes: release(attributes) };
}

export const releases: Payload<'release'>[] = [
  releasePayload(),
  releasePayload(),
  releasePayload(),
  releasePayload(),
];

export function streamItem(attributes: Partial<Stream> = {}): Stream {
  return {
    actor: faker.fake('{{name.firstName}} {{name.lastName}}'),
    type: faker.system.mimeType(),
    content: faker.lorem.paragraph(),
    sentAt: faker.time.recent(),
    ...attributes,
  };
}

export function streamPayload(
  attributes: Partial<Stream> = {}
): Payload<'stream'> {
  return { type: 'stream', attributes: streamItem(attributes) };
}

export const stream = [
  streamPayload(),
  streamPayload(),
  streamPayload(),
  streamPayload(),
  streamPayload(),
  streamPayload(),
  streamPayload(),
  streamPayload(),
];
