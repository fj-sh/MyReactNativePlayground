import { persist, type StateStorage } from 'zustand/middleware';
import { MMKV } from 'react-native-mmkv';
import { Appearance } from 'react-native';
import { create } from 'zustand';

// https://levelup.gitconnected.com/stop-using-react-native-async-storage-fdbcc05a6de3
interface AppPersistStore {
  isDarkTheme: boolean;
  setIsDarkTheme: (preference: boolean) => void;
}

export const appPersistStorage = new MMKV({ id: 'app-persist-storage' });

const zustandMMKVStorage: StateStorage = {
  setItem: (name, value) => {
    appPersistStorage.set(name, value);
  },
  getItem: (name) => {
    const value = appPersistStorage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    appPersistStorage.delete(name);
  },
};

export const useAppPersistStore = create<AppPersistStore, [['zustand/persist', AppPersistStore]]>(
  persist(
    (set, get) => ({
      isDarkTheme: Appearance.getColorScheme() === 'dark',
      setIsDarkTheme: (preference) => {
        set({ isDarkTheme: preference });
      },
    }),
    {
      name: 'app-persist-storage',
      getStorage: () => zustandMMKVStorage,
      serialize: (state) => JSON.stringify(state),
      deserialize: (state) => JSON.parse(state),
    }
  )
);
