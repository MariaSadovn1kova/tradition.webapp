import axios from 'axios';
import FileSaver from 'file-saver';

import { API_URL } from '@/shared/api/main';
import type { TFile } from './models';

const baseURL = `${API_URL.app}/file`;

export default {
  createFile: (payload: FormData):
  Promise<TFile.IFile> => axios.post<TFile.IFile>(`${baseURL}`, payload).then((res) => res.data),

  downloadFile: (id: string, filename: string, extension: string): Promise<void> => axios.get<Blob>(`${baseURL}/download/${id}`, { responseType: 'blob' })
  .then((res) => {
    const file = `${filename}.${extension}`;
    FileSaver.saveAs(res.data, file);
  }),

  getAllFilesByObjecttID: (object_id: string):
  Promise<TFile.IFile[]> => axios.get<TFile.IFile[]>(`${baseURL}/project/${object_id}`).then((res) => res.data),
}