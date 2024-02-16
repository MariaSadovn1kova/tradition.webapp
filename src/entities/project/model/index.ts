import { defineStore } from 'pinia';

export interface IAmount {
  type: string;
  count: number;
}

export interface ITransaction {
  id: string;
  type: string;
  count: number;
  date: Date;
  group?: string; 
}

export interface IObject {
  id: string;
  title: string;
  amount_today: IAmount;
  amount_all: IAmount;
  transactions?: ITransaction[];
}

export interface IProject {
  id: string;
  title: string;
  amount_today: IAmount;
  objects?: IObject[];
}  

interface IProjectState {
  projects: IProject[];
} 

export const useProjectStore = defineStore('project', {
    state: (): IProjectState => ({
      projects: [
        {
          id: '1',
          title: 'Проект 1',
          amount_today: {
            type: 'receipts',
            count: 20000,
          },
          objects: [
            {
              id: '1',
              title: 'Об 1',
              amount_today: 
              {
                type: 'receipts',
                count: 10000,
              },
              amount_all: 
              {
                type: 'receipts',
                count: 20000,
              }
            },
            {
              id: '1',
              title: 'Об 2',
              amount_today: 
              {
                type: 'receipts',
                count: 30000,
              },
              amount_all: 
              {
                type: 'receipts',
                count: 40000,
              }
            },
          ]
        },
      ]
    }),
    actions: {
      fetchProjects() {}
    },
    getters: {
      getProjects: (state) => state.projects,
      getProjectById: (state) => (projectID: string):IProject|undefined => state.projects.find((project) => project.id === projectID),
      getProjectsCount: (state) => state.projects.length,
      getObjectsCount: (state) => (projectID: string):number => {
        {
          const project = state.projects.find((project) => project.id === projectID);
          return project && project.objects ? project.objects.length : 0;
        }
      }
    },
  });