import { defineStore } from 'pinia';

import { ProjectAPI } from '@/shared';
import type { TProject } from '@/shared/api/project/models'

interface IProjectState {
  isLoading: boolean;
  projects: TProject.IProject[];
  activeProject: TProject.IProject|null;
} 

export const useProjectStore = defineStore('project', {
    state: (): IProjectState => ({
      isLoading: false,
      projects: [],
      activeProject: null
    }),

    actions: {
      async createProject(payload: TProject.ICreateProject): Promise<void> {
        await ProjectAPI.createProject(payload);
      },

      async fetchAllProjects(): Promise<void> {
        await ProjectAPI.getAllProjects().then((res: TProject.IProject[]) => {
          this.isLoading = true;
          this.projects = res;
        }).then(() => { this.isLoading = false });
      },

      async fetchProjectByID(project_ID: string): Promise<void> {
        await ProjectAPI.getProjectByID(project_ID).then((res: TProject.IProject) => {
          this.isLoading = true;
          this.activeProject = res;
        }).then(() => { this.isLoading = false });
      }
    },

    getters: {
      getIsLoading: (state) => state.isLoading,
      getProjects: (state) => state.projects,
      getActiveProject: (state) => state.activeProject,
      getProjectsCount: (state) => state.projects.length,
      getProjectReceiptsSum: (state) => state.projects.reduce((acc, obj) => acc + obj.receipts_count, 0),
      getProjectExpensesSum: (state) => state.projects.reduce((acc, obj) => acc + obj.expenses_count, 0)
    },
  });