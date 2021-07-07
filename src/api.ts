import { Message, Release, Stream } from 'models';

export const routes = {
  health: '/health' as const,
  releases: '/releases' as const,
  stream: '/stream' as const,
  messages: '/messages' as const,
};

const headers = {
  'Content-Type': 'application/json',
};

export const health = async () => {
  const response = await fetch(routes.health, { headers });

  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
};

export const messages = async (): Promise<Message[]> => {
  const response = await fetch(routes.messages);

  if (response.ok) {
    const payload = await response.json();

    return payload.data.map((item: any) => item.attributes as Message);
  } else {
    throw await response.json();
  }
};

export const releases = async (): Promise<Release[]> => {
  const response = await fetch(routes.releases);

  if (response.ok) {
    const payload = await response.json();

    return payload.data.map((item: any) => item.attributes as Release);
  } else {
    throw await response.json();
  }
};

export const stream = async (): Promise<Stream[]> => {
  const response = await fetch(routes.stream);

  if (response.ok) {
    const payload = await response.json();

    return payload.data.map((item: any) => item.attributes as Stream);
  } else {
    throw await response.json();
  }
};
