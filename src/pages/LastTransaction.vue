<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { useTransactionStore } from '@/entities';
import { TransactionCard } from '@/features';

import type { TTransaction } from '@/shared/api/transaction/models';

const transactionStore = useTransactionStore();

const transactions = computed(() => transactionStore.getAllTransactions);

const result = computed(() => transactions.value ? transactions.value.reduce((acc: { title: string, items: TTransaction.ITransaction[] }[], currentItem: TTransaction.ITransaction) => {
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

onMounted(() => {
  transactionStore.fetchAllTransactions();
});
</script>

<template>
  <div class="transactions-list__container">

    <router-link 
      class="back-btn"
      :to="`/`"
    >
      {{ $t(`button.back`)}}
    </router-link >

    <div 
      v-if="transactions.length" 
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
.transactions-list__container {
  padding: 0 30px;

  .back-btn {
    background: inherit;
    border: none;
    color: var(--vt-c-font-grey);
    font-weight: 600;
    font-size: 16px;
    padding: 0;
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
}
</style>