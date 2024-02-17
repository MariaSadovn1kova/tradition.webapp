import { defineStore } from 'pinia';

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
  expenses_today: number;
  expenses_all: number;
  receipts_today: number;
  receipts_all: number;
  transactions?: ITransaction[];
}

export interface IProject {
  id: string;
  title: string;
  expenses_today: number;
  receipts_today: number;
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
          expenses_today: 70,
          receipts_today: 100,
          objects: [
            {
              id: '1',
              title: 'Об 1',
              expenses_today: 3000,
              expenses_all: 7000,
              receipts_today: 200,
              receipts_all: 3000,
            },
            {
              id: '2',
              title: 'Об 2',
              expenses_today: 3000,
              expenses_all: 7000,
              receipts_today: 200,
              receipts_all: 3000,
            },
          ]
        },
        {
          id: '2',
          title: 'Проект 2',
          expenses_today: 7,
          receipts_today: 100,
          objects: [
            {
              id: '1',
              title: 'Об 1',
              expenses_today: 3000,
              expenses_all: 7000,
              receipts_today: 200,
              receipts_all: 3000,
            },
          ]
        }
      ]
    }),
    actions: {
      fetchProjects() {}
    },
    getters: {
      getProjects: (state) => state.projects,
      getProjectById: (state) => (projectID: string):IProject|undefined => state.projects.find((project) => project.id === projectID),
      getProjectsCount: (state) => state.projects.length,
      getProjectSumExpenses: (state) => state.projects.reduce((sum, item) => sum + item.expenses_today, 0),
      getProjectSumReceipts: (state) => state.projects.reduce((sum, item) => sum + item.receipts_today, 0),

      getObjectsSumExpenses: (state) => (projectID: string):number => {
        {
          const project = state.projects.find((project) => project.id === projectID);
          return project?.objects ? project.objects.reduce((sum, item) => sum + item.expenses_today, 0) : 0
        }
      },
      getObjectsSumReceipts: (state) => (projectID: string):number => {
        {
          const project = state.projects.find((project) => project.id === projectID);
          return project?.objects ? project.objects.reduce((sum, item) => sum + item.receipts_today, 0) : 0
        }
      },
      getObjectById: (state) => (projectID: string, objectID: string):IObject|null => {
        {
          const project = state.projects.find((project) => project.id === projectID);
          const object = project?.objects ? project.objects.find((object) => object.id === objectID) : null;
          return object ? object : null 
        }
      },
      getObjectsCount: (state) => (projectID: string):number => {
        {
          const project = state.projects.find((project) => project.id === projectID);
          return project && project.objects ? project.objects.length : 0;
        }
      }
    },
  });