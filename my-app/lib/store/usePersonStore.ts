// https://github.com/pmndrs/zustand/blob/main/docs/guides/updating-state.md

import { create } from 'zustand';

interface State {
  firstName: string;
  lastName: string;
}

interface Action {
  updateFirstName: (firstName: State['firstName']) => void;
  updateLastName: (lastName: State['lastName']) => void;
}

export const usePersonStore = create<State & Action>((set) => ({
  firstName: 'John',
  lastName: 'Doe',
  updateFirstName: (firstName) => {
    set(() => ({ firstName }));
  },
  updateLastName: (lastName) => {
    set(() => ({ lastName }));
  },
}));
