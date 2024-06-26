import { defineStore } from 'pinia';

import { TransactionAPI } from '@/shared';
import type { TTransaction } from '@/shared/api/transaction/models';

interface ITransactionState {
  isLoading: boolean;
  activeObjectTransactions: TTransaction.ITransaction[];
  allTransactions: TTransaction.ITransaction[];
} 

export const useTransactionStore = defineStore('tranasction', {
    state: (): ITransactionState => ({
      isLoading: false,
      activeObjectTransactions: [],
      allTransactions: []
    }),

    actions: {
      async fetchAllTransactions(): Promise<void> {
        await TransactionAPI.getAllTransaction().then((res: TTransaction.ITransaction[]) => {
          this.isLoading = true;
          this.allTransactions = res;
        }).then(() => { this.isLoading = false });
      },
      async fetchObjectTransactionsByID(object_ID: string): Promise<void> {
        await TransactionAPI.getAllObjectTransaction(object_ID).then((res: TTransaction.ITransaction[]) => {
          this.isLoading = true;
          this.activeObjectTransactions = res;
        }).then(() => { this.isLoading = false });
      },
      async createTransasction(payload: TTransaction.ICreateTransaction): Promise<void> {
        await TransactionAPI.createTransaction(payload);
      },
    },

    getters: {
      getIsLoading: (state) => state.isLoading,
      getActiveObjectTransactions: (state) => state.activeObjectTransactions,
      getAllTransactions: (state) => state.allTransactions,
    },
  });