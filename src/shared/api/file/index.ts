import axios from 'axios';

import { API_URL } from '@/shared/api/main';

import type { TFile } from './models';

const baseURL = `${API_URL.app}/file`;

export default {
  createFile: (payload: FormData):
  Promise<TFile.IFile> => axios.post<TFile.IFile>(`${baseURL}`, payload).then((res) => res.data),

  downloadFile: (id: string):
  Promise<TFile.ICreateFile> => axios.get<TFile.ICreateFile>(`${baseURL}/download/${id}`).then((res) => res.data),
}