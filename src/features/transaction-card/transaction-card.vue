<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { DateTime } from 'luxon'

import { TraditionModal } from '@/features';
import { formattedNumber, TransactionAPI } from '@/shared'
import { useAppStore, useTransactionStore } from '@/entities';

import type { TTransaction } from '@/shared/api/transaction/models'

const props = defineProps<{
  transaction: TTransaction.ITransaction
}>();

const emit = defineEmits(['update-transactions']);

const { t } = useI18n();
const appStore = useAppStore();
const transactionStore = useTransactionStore();

const dateTime = DateTime.fromJSDate(new Date(props.transaction.date));

const active = ref(false);
const showDeleteModal = ref(false);

const activeMode = computed(() => appStore.getMode);
const formattedDate = computed(() => dateTime.toFormat('dd.LL.yyyy'));
const formattedAuthor = computed(() => props.transaction.sender ? `от: ${props.transaction.sender.slice(0, 15)}` : `от: не указано`);
const formattedComment = computed(() => props.transaction.comment ? `комментарий: ${props.transaction.comment.slice(0, 10)}` : `комментарий: отсутствует`);
const formattedAmount = computed(() => formattedNumber( props.transaction.amount ));

const deleteTransaction = async (): Promise<void> => {
  await TransactionAPI.deleteTransaction(props.transaction.id).then(() => { 
    emit('update-transactions');
  });
  showDeleteModal.value = false;
};
</script>

<template>
  <tradition-modal 
    v-if="showDeleteModal"
    class="delete-modal"
  >
    <div class="delete-modal__title">
      {{ $t(`button.delete_transaction_submit`) }}
    </div>
    <div class="delete-modal__btns btns">
      <button 
        class="btns__cancel" 
        @click="showDeleteModal = false"
        >
        {{ $t(`button.cancel`) }}
      </button>
      <button 
        class="btns__submit"
        @click="deleteTransaction()"
      >
        {{ $t(`button.submit`) }}
      </button>
    </div>
</tradition-modal>

  <div :class="['transaction', {'active' : active}]" @click="active = !active">
    <div class="transaction-container">
      <div class="tradition-card__text-content text-content">
        <div class="text-content__title">{{ transaction.title }}</div>
        <div class="text-content__subtitle">{{ transaction.sort ?? formattedAuthor }}</div>
      </div>
      <div class="tradition-card__arrow">
        <img v-if="activeMode === 'receipts'" src="@/assets/img/arrow_up.png">
        <img v-else src="@/assets/img/arrow_down.png">
      </div>
      <div class="tradition-card__transaction-info transaction-info"> 
        <span :class="['transaction-info__subtitle', activeMode]">{{ formattedAmount }}</span>
      </div>
    </div>
      <div 
        v-if="active"
        class="transaction-sub-container"
      >
        <div class="transaction_sub-title">{{ formattedDate }}</div>
        <div class="transaction_sub-title">{{ formattedComment }}</div>
        <div class="transaction__btns btns">
          <button 
            class="btns__delete-btn"
            @click.stop="showDeleteModal = true"
          >
            {{ $t(`button.delete_transaction`)}}
          </button>
          <button 
            class="btns__download-btn" 
            v-if="transaction.type === 'expenses'"
          >
            {{ $t(`button.download`)}}
          </button>
        </div>
      </div>
  </div>
</template>

<style>
@import './transaction-card.pcss';
</style>