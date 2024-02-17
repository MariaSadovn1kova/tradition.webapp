import { defineStore } from 'pinia';

interface AppState {
  mode: string,
  object_mode: string
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
      mode: 'receipts',
      object_mode: 'transactions'
    }),
    actions: {
      setMode(currentState: string) {
        this.mode = currentState;
      },
      setObjectMode(currentState: string) {
        this.object_mode = currentState;
      }
    },
    getters: {
      getMode: (state) => state.mode,
      getObjectMode: (state) => state.object_mode
    },
  });