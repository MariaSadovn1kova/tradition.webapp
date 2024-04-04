import axios from 'axios';

import { API_URL } from '@/shared/api/main';

import type { TProject } from './models';

const baseURL = `${API_URL.app}/project`;

export default {
  getAllProjects: ():
  Promise<TProject.IProject[]> => axios.get<TProject.IProject[]>(`${baseURL}`).then((res) => res.data),

  getProjectByID: (project_ID: string):
  Promise<TProject.IProject> => axios.get<TProject.IProject>(`${baseURL}/${project_ID}`).then((res) => res.data),

  createProject: (data: TProject.ICreateProject):
  Promise<TProject.IProject> => axios.post<TProject.IProject>(`${baseURL}`, data).then((res) => res.data),
}