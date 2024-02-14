import { defineStore } from 'pinia';

interface IProject {
  title: string,
  objects_number: number,
  amount_type: string,
  amount_count: number
}  

interface IProjectState {
  projects: IProject[]
} 

export const useProjectStore = defineStore('project', {
    state: (): IProjectState => ({
      projects: []
    }),
    actions: {
      fetchProjects() {
        this.projects = [
            {
              title: 'Проект 1',
              objects_number: 3,
              amount_type: 'receipts',
              amount_count: 20000
            },
            {
              title: 'Проект 2',
              objects_number: 2,
              amount_type: 'expenses',
              amount_count: 30000
            },
            {
              title: 'Проект 3',
              objects_number: 10,
              amount_type: 'receipts',
              amount_count: 50000
            }
        ]
      }
    },
    getters: {
      getProjects: (state) => state.projects,
      getProjectsCount: (state) => state.projects.length
    },
  });