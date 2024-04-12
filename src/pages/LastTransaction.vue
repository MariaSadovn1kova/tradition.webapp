<script setup lang="ts">
import { computed, onMounted } from 'vue';

import { DateTime } from 'luxon';

import { useTransactionStore } from '@/entities';
import { TransactionCard } from '@/features';

import type { TTransaction } from '@/shared/api/transaction/models';

const transactionStore = useTransactionStore();

const transactions = computed(() => transactionStore.getAllTransactions);

const result = computed(() => transactions.value ? transactions.value.reduce((acc: { title: string, items: TTransaction.ITransaction[] }[], currentItem: TTransaction.ITransaction) => {
  const currentDate = DateTime.fromJSDate(new Date(currentItem.date));
  const formattedDate = currentDate.toFormat('dd.MM.yy') === DateTime.fromJSDate(new Date()).toFormat('dd.MM.yy') ? "Сегодня" : currentDate.toFormat('dd.MM.yy');
  const existingGroup = acc.find(group => group.title === formattedDate);
  
  
  if (existingGroup) {
    existingGroup.items.push(currentItem);
  } else {
    acc.push({
      title: formattedDate,
      items: [currentItem]
    });
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