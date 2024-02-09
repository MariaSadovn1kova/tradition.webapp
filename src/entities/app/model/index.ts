import { defineStore } from 'pinia';

interface AppState {
  mode: string
}

export const useAppStore = defineStore('app', {
    state: (): AppState => ({
      mode: 'receipts'
    }),
    actions: {
      setMode(currentState: string) {
        this.mode = currentState;
      }
    },
    getters: {
      getMode: (state) => state.mode
    },
  });