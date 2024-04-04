import { defineStore } from 'pinia';

import { ObjectAPI } from '@/shared';
import type { TObject } from '@/shared/api/object/models'

interface IObjectState {
  isLoading: boolean;
  activeProjectObjects: TObject.IObject[];
} 

export const useObjectStore = defineStore('object', {
    state: (): IObjectState => ({
      isLoading: false,
      activeProjectObjects: []
    }),

    actions: {
      async fetchAllObjectsByProjectID(project_ID: string): Promise<void> {
        await ObjectAPI.getAllObjectsByProjectID(project_ID).then((res: TObject.IObject[]) => {
          this.isLoading = true;
          this.activeProjectObjects = res;
        }).then(() => { this.isLoading = false });
      },

      async createObject(project_ID: string): Promise<void> {
        await ObjectAPI.getAllObjectsByProjectID(project_ID).then((res: TObject.IObject[]) => {
          this.isLoading = true;
          this.activeProjectObjects = res;
        }).then(() => { this.isLoading = false });
      }
    },

    getters: {
      getIsLoading: (state) => state.isLoading,
      getActiveProjectObjects: (state) => state.activeProjectObjects
    },
  });