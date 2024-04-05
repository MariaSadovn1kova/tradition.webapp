import axios from 'axios';

import { API_URL } from '@/shared/api/main';

import type { TTransaction } from './models';

const baseURL = `${API_URL.app}/transaction`;

export default {
  getAllObjectTransaction: (object_ID: string):
  Promise<TTransaction.ITransaction[]> => axios.get<TTransaction.ITransaction[]>(`${baseURL}/objects/${object_ID}`).then((res) => res.data),

  deleteTransaction: (transaction_ID: string):
  Promise<TTransaction.ITransaction> => axios.delete<TTransaction.ITransaction>(`${baseURL}/${transaction_ID}`).then((res) => res.data),

  createTransaction: (data: TTransaction.ICreateTransaction):
  Promise<TTransaction.ITransaction> => axios.post<TTransaction.ITransaction>(`${baseURL}`, data).then((res) => res.data),
}