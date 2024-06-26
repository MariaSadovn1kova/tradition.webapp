<script setup lang="ts">
import { ref,  computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from "vue-router";

import { TraditionInput, TraditionButton } from '@/features';
import { useTransactionStore } from '@/entities';
import { TransactionAPI, FileAPI } from '@/shared';

import type { TTransaction } from '@/shared/api/transaction/models'

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const projectID = computed(() => route.params.projectID as string);
const objectID = computed(() => route.params.objectID as string);

const transactionType = ref('receipts');
const transactionCategory = ref('all');
const transactionSum = ref(0);
const transactionTitle = ref('');
const transactionDes = ref('');
const transactionFrom = ref('');
const transactionComment = ref('');
const transactionFile = ref<File|null>();

const transactionTypes = ['receipts', 'expenses'];
const transactionCategories = ['all', 'materials', 'wages'];

const createTransaction = async(): Promise<void> => {
  const createTransaction = ref<TTransaction.ICreateTransaction>({
    title: transactionTitle.value ? transactionTitle.value : transactionType.value === 'receipts' ? 'Поступление' : null,
    type: transactionType.value,
    sort: transactionType.value === 'expenses' ? transactionCategory.value : null,
    amount: transactionSum.value,
    descr: transactionDes.value ? transactionDes.value : null,
    sender: transactionFrom.value ? transactionFrom.value : null,
    comment: transactionComment.value ? transactionFrom.value : null,
    date: new Date(),
    project_id: projectID.value,
    object_id: objectID.value
  })
  await TransactionAPI.createTransaction(createTransaction.value).then((res: TTransaction.ITransaction) => {
    if(transactionFile.value) {
      handleFileUpload(transactionFile.value, res.id);
    }
    router.push(`/project/${projectID.value}/${objectID.value}`);
  });
}

const handleFileInput = async(event: Event): Promise<void>  => {
  const file = (event.target as HTMLInputElement).files?.[0];
  transactionFile.value = file;
}

const handleFileUpload = (file: File, transaction_id: string): Promise<string> => new Promise(() => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('transaction_id', transaction_id);
  FileAPI.createFile(formData);
});
</script>

<template>
  <div class="create-transaction">

    <router-link 
      class="create-transaction__back-btn"
      :to="`/project/${projectID}/${objectID}`"
    >
      {{ $t(`button.back`)}}
    </router-link >
  
    <h1 class="create-transaction__title">{{ $t(`objects.create_object`) }}</h1>

    <div class="create-transaction__container">

    <div class="create-transaction__select-title">
      {{ $t(`transaction.type`) }}
    </div>

    <select 
      v-model="transactionType"
      class="create-transaction__select"
    >
      <option 
        v-for="type in transactionTypes"
        :key="`option__${type}`"
        :value="type"
      >
        {{ $t(`projects.${type}`) }}
      </option>
    </select>

    <div class="create-transaction__select-title">
      {{ $t(`transaction.category`) }}
    </div>

    <select 
      v-if="transactionType === 'expenses'"
      v-model="transactionCategory"
      class="create-transaction__select"
    >
      <option 
        v-for="type in transactionCategories"
        :key="`option__${type}`"
        :value="type"
      >
        {{ $t(`transaction.${type}`) }}
      </option>
    </select>

    <tradition-input 
      v-if="transactionType === 'expenses'"
      :title="'Название платежа'"
      :place-holder="'Введите название платежа'"
      :isInput="true"
      v-model="transactionTitle"
    />

    <tradition-input 
      :title="'Сумма платежа'"
      :place-holder="'Сумма платежа'"
      :isInput="true"
      :isNumber="true"
      v-model="transactionSum"
    />

    <tradition-input 
      :title="'Описание платежа'"
      :place-holder="'Введите описание платежа'"
      :isInput="true"
      v-model="transactionDes"
    />

    <tradition-input 
      v-if="transactionType === 'receipts'"
      :title="'От'"
      :place-holder="'От кого поступил платеж'"
      :isInput="true"
      v-model="transactionFrom"
    />

    <tradition-input 
      v-if="transactionType === 'receipts'"
      :title="'Комментарий'"
      :place-holder="'Введите комментарий'"
      :isInput="true"
      v-model="transactionComment"
    />

    <input 
      v-if="transactionType === 'expenses'"
      type="file"
      class="create-transaction__file-input"
      max-size="52428800"
      @input="handleFileInput($event)"
    />

    </div>
    
    <button
      class="create-transaction__button"
      @click="createTransaction()"
    >
      {{ $t(`transaction.create`) }}
    </button>

  </div>
</template>

<style lang="postcss" scoped>
.create-transaction {
  padding: 0 30px;

  .create-transaction__back-btn {
    background: inherit;
    border: none;
    color: var(--vt-c-font-grey);
    font-weight: 600;
    font-size: 16px;
    padding: 0;
  }

  .create-transaction__title {
    margin-top: 20px;
  }
  
  .create-transaction__container {
    padding: 20px;  
    background: var(--vt-c-white);
    border-radius: var(--vt-default-radius);
    box-shadow: var(--vt-default-shadow);

    .create-transaction__select-title {
      padding: 2px 0;
      color: var(--vt-c-font-grey);
    }

    .create-transaction__select {
      padding: 10px;
      width: 100%; 
      border-radius: 6px;
      border: 1px solid var(--vt-c-input-green);
      margin-bottom: 20px;

      &:focus {
        outline: 0;
        outline-offset: 0;
        background: var(--vt-c-input-green);
      }
    }
  }

  .create-transaction__button {
    position: fixed;
    padding: 18px;
    height: 55px;
    border: none;
    width: calc(100% - 60px);
    bottom: 20px;
    left: 30px;
    color: var(--vt-c-white);
    border-radius: var(--vt-default-radius);
    background: var(--vt-c-green-gradient);

    &:active {
      background: var(--vt-c-dark-green-gradient);
    }
  }

  input[type="file"]::-webkit-file-upload-button {
    background: var(--vt-c-green-gradient);
    color: white;
    padding: 5px 10px;
    border: 1px solid var(--vt-c-green-gradient);
    border-radius: 5px;
    cursor: pointer;
  }

  input[type="file"]::-ms-browse {
    background: var(--vt-c-green-gradient);
    color: white;
    padding: 5px 10px;
    border: 1px solid var(--vt-c-green-gradient);
    border-radius: 5px;
  }
}
</style>