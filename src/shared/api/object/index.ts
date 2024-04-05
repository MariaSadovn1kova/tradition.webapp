import axios from 'axios';

import { API_URL } from '@/shared/api/main';

import type { TObject } from './models';

const baseURL = `${API_URL.app}/object`;

export default {
  getAllObjectsByProjectID: (project_id: string):
  Promise<TObject.IObject[]> => axios.get<TObject.IObject[]>(`${baseURL}/project/${project_id}`).then((res) => res.data),

  getObjectByID: (object_id: string):
  Promise<TObject.IObject> => axios.get<TObject.IObject>(`${baseURL}/${object_id}`).then((res) => res.data),

  deleteObject: (object_id: string):
  Promise<TObject.IObject> => axios.delete<TObject.IObject>(`${baseURL}/${object_id}`).then((res) => res.data),

  createObject: (data: TObject.ICreateObject):
  Promise<TObject.IObject> => axios.post<TObject.IObject>(`${baseURL}`, data).then((res) => res.data)
}