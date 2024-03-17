<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from "vue-router";
import { TraditionInput, TraditionButton } from '@/features';

const { t } = useI18n();

const router = useRouter();
const objectName = ref('');
const objectDes = ref('');

const createObject = (): void => {
  console.log(objectName.value);
  console.log(objectDes.value);
  router.push('/');
}
</script>

<template>
  <div class="create-object">
  
    <h1>{{ $t(`objects.create_object`) }}</h1>

    <div class="create-object__container">
      <tradition-input 
        :title="'Название объекта'"
        :place-holder="'Введите название объекта'"
        :isInput="true"
        v-model="objectName"
      />

      <tradition-input 
        :title="'Описание объекта'"
        :place-holder="'Введите описание объекта'"
        v-model="objectDes"
      />

      <input 
        type="file"
        accept=".pdf, .docx, .xlsx"
        class="create-object__file-input"
        multiple
      />

    </div>
    
    <button
      class="create-object__button"
      @click="createObject()"
    >
      {{ $t(`objects.create_object`) }}
    </button>

  </div>
</template>

<style lang="postcss" scoped>
.create-object {
  padding: 0 30px;
  
  .create-object__container {
    padding: 20px;  
    background: var(--vt-c-white);
    border-radius: var(--vt-default-radius);
    box-shadow: var(--vt-default-shadow);
  }

  .create-object__button {
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