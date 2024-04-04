import { defineStore } from 'pinia';

import { ProjectAPI } from '@/shared';
import type { TProject } from '@/shared/api/project/models'

interface IProjectState {
  isLoading: boolean;
  projects: TProject.IProject[];
} 

export const useProjectStore = defineStore('project', {
    state: (): IProjectState => ({
      isLoading: false,
      projects: []
    }),

    actions: {
      async fetchAllProjects(): Promise<void> {
        await ProjectAPI.getAllProjects().then((res: TProject.IProject[]) => {
          this.isLoading = true;
          this.projects = res;
        }).then(() => { this.isLoading = false });
      }
    },

    getters: {
      getIsLoading: (state) => state.isLoading,
      getProjects: (state) => state.projects,
      getProjectsCount: (state) => state.projects.length
    },
  });