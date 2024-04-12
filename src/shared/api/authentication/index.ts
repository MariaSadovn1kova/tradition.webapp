import axios from 'axios';
import FileSaver from 'file-saver';

import { API_URL } from '@/shared/api/main';
import type { TAuthentication } from './models';

const baseURL = `${API_URL.app}/user`;

export default {
  logIn: (userData: TAuthentication.ILogin):
  Promise<void> => axios.post<void>(`${baseURL}/login`, userData, { withCredentials: true }).then((result) => {}),
}