import { defineStore } from 'pinia';

export interface IProject {
  id: string,
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
              id: '1',
              title: 'Проект 1',
              objects_number: 3,
              amount_type: 'receipts',
              amount_count: 20000
            },
            {
              id: '2',
              title: 'Проект 2',
              objects_number: 2,
              amount_type: 'expenses',
              amount_count: 30000
            },
            {
              id: '3',
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