import { act } from '@testing-library/react';
import Mousetrap from 'mousetrap';

export const keySequence = async (sequence: string) => {
  await act(async () => {
    Mousetrap.trigger(sequence);
  });
};
