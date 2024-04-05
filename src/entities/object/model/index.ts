import { defineStore } from 'pinia';

import { ObjectAPI } from '@/shared';
import type { TObject } from '@/shared/api/object/models'

interface IObjectState {
  isLoading: boolean;
  activeProjectObjects: TObject.IObject[];
  activeObject: TObject.IObject | null;
} 

export const useObjectStore = defineStore('object', {
    state: (): IObjectState => ({
      isLoading: false,
      activeProjectObjects: [],
      activeObject: null
    }),

    actions: {
      async fetchAllObjectsByProjectID(project_ID: string): Promise<void> {
        await ObjectAPI.getAllObjectsByProjectID(project_ID).then((res: TObject.IObject[]) => {
          this.isLoading = true;
          this.activeProjectObjects = res;
          console.log(res)
        }).then(() => { this.isLoading = false });
      },

      async fetchObjectByID(object_ID: string): Promise<void> {
        await ObjectAPI.getObjectByID(object_ID).then((res: TObject.IObject) => {
          this.isLoading = true;
          this.activeObject = res;
        }).then(() => { this.isLoading = false });
      },

      async createObject(project_ID: string): Promise<void> {
        await ObjectAPI.getAllObjectsByProjectID(project_ID).then((res: TObject.IObject[]) => {
          this.isLoading = true;
        }).then(() => { this.isLoading = false });
      }
    },

    getters: {
      getIsLoading: (state) => state.isLoading,
      getActiveProjectObjects: (state) => state.activeProjectObjects,
      getActiveObject: (state) => state.activeObject,
      getObjectsCount: (state) => state.activeProjectObjects.length,
    },
  });