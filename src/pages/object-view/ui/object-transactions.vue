<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useProjectStore, useAppStore, useTransactionStore } from '@/entities';
import { TransactionCard } from '@/features'

import type { TTransaction } from '@/shared/api/transaction/models';

const props = defineProps<{
  allExpenses: number;
  allReceipts: number;
}>();

const { t } = useI18n();
const route = useRoute();
const appStore = useAppStore();
const projectStore = useProjectStore();
const transactionStore = useTransactionStore();

const activeMode = computed(() => appStore.getMode);
const projectID = computed(() => route.params.projectID as string);
const objectID = computed(() => route.params.objectID as string);

const isLoading = computed(() => transactionStore.getIsLoading);
const transactions = computed(() => transactionStore.getActiveObjectTransactions);

const activeTransactions = computed(() => transactions.value.filter((item: TTransaction.ITransaction) => item.type === activeMode.value));

const result = computed(() => activeTransactions.value ? activeTransactions.value.reduce((acc: { title: string, items: TTransaction.ITransaction[] }[], currentItem: TTransaction.ITransaction) => {
  const currentDate = new Date(currentItem.date);
  const today = new Date();

  if (currentDate.toDateString() === today.toDateString()) {
    const todayItem = acc.find(item => item.title === 'Сегодня');
    if (todayItem) {
      todayItem.items.push(currentItem);
    } else {
      acc.push({ title: 'Сегодня', items: [currentItem] });
    }
  } else {
    const diffTime = Math.abs(today.getTime() - currentDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      const yesterdayItem = acc.find(item => item.title === 'Вчера');
      if (yesterdayItem) {
        yesterdayItem.items.push(currentItem);
      } else {
        acc.push({ title: 'Вчера', items: [currentItem] });
      }
    } else {
      acc.push({ title: currentItem.date.toString(), items: [currentItem] });
    }
  }
  return acc;
}, []) : null);

const fetchTransactions = async (): Promise<void> => {
  transactionStore.fetchObjectTransactionsByID(objectID.value);
};

onMounted(() => {
  transactionStore.fetchObjectTransactionsByID(objectID.value);
});
</script>

<template>
  <div class="transaction-container">
    <div class="budget">
      <div class="budget__title">{{ $t(`transaction.object_budget`) }}</div>
      <div class="budget__sum">
        <span class="budget__sum__receipts">{{ props.allExpenses }} / </span> 
        <span class="budget__sum__expenses">{{ props.allReceipts }}</span>
      </div>
    </div>

    <div 
      v-if="result" 
      class="transactions-container"
    >
      <div 
        v-for="block in result"
        :key="`${block.title}_transaction`"
      >
        <div class="transactions-block__title">{{ block.title }}</div>
        <div 
          v-for="transaction in block.items" 
          :key="`${transaction.title}_transaction`"
        >
          <transaction-card 
            :transaction="transaction"
            @update-transactions="fetchTransactions()"
          />
        </div>
      </div>
    </div>

    <div 
      v-else
      class="empty__transactions"
    >
      {{ $t(`transaction.empty_transaction`) }}
    </div>
    
  </div>
</template>

<style lang="postcss" scoped>
.transaction-container {

  .budget {
    display: flex;
    justify-content: space-between;

    .budget__title {
      color: var(--vt-c-font-black);
      font-weight: 500;
    }

    .budget__sum {

      .budget__sum__receipts {
        color: var(--vt-c-font-grey);
        font-weight: 500;
      }
      .budget__sum__expenses {
        color: var(--vt-c-font-green);
        font-weight: 500;
      }
    }
  }

  .transactions-container {
    padding-bottom: 400px;

    .transactions-block__title {
      margin-top: 20px;
      margin-bottom: 10px;
      font-weight: 500;
      font-size: 20px;
      color: var(--vt-c-font-grey);
    }

  }

  .empty__transactions {
    margin-top: 70px;
    width: 100%;
    text-align: center;
    font-weight: 500;
    font-size: 20px;
    color: var(--vt-c-font-grey);
  }
}
</style>