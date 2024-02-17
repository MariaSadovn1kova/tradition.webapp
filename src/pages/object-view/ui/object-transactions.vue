<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  allExpenses: number;
  allReceipts: number;
}>();

const { t } = useI18n();
</script>

<template>
  <div class="transaction-container">
    <div class="budget">
      <div class="budget__title">{{ $t(`transaction.object_budget`) }}</div>
      <div class="budget__sum">
        <span class="budget__sum__receipts">{{ props.allReceipts }} / </span> 
        <span class="budget__sum__expenses">{{ props.allExpenses }}</span>
      </div>
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

}
</style>