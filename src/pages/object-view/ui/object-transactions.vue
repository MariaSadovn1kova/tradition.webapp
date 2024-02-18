<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useProjectStore, useAppStore } from '@/entities';
import { TransactionCard } from '@/features'
import type { ITransaction } from '@/entities/project/model';

const props = defineProps<{
  allExpenses: number;
  allReceipts: number;
}>();

const route = useRoute();
const projectStore = useProjectStore();
const appStore = useAppStore();

const activeMode = computed(() => appStore.getMode);
const projectID = computed(() => route.params.projectID as string);
const objectID = computed(() => route.params.objectID as string);
const objectTransactions = computed(() => projectStore.getObjectsTransactions(projectID.value, objectID.value, activeMode.value));

const result = computed(() => objectTransactions.value ? objectTransactions.value.reduce((acc: { title: string, items: ITransaction[] }[], currentItem: ITransaction) => {
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

const { t } = useI18n();
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
          <transaction-card :transaction="transaction"/>
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