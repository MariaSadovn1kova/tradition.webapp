<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from "vue-router";

import { TraditionInput, TraditionButton } from '@/features';
import { ObjectAPI } from '@/shared';
import type { TObject } from '@/shared/api/object/models';

const { t } = useI18n();

const route = useRoute();
const router = useRouter();

const projectID = computed(() => route.params.projectID as string);

const objectName = ref('');
const objectDes = ref('');

const createObject = async (): Promise<void> => {
  if (objectName.value && projectID.value) {

    const createObject = ref<TObject.ICreateObject>({
      title: objectName.value,
      descr: objectDes.value ? objectDes.value : null,
      project_id: projectID.value
    })

     await ObjectAPI.createObject(createObject.value).then(() => {
      router.push(`/project/${projectID.value}`);
    });
  };
};
</script>

<template>
  <div class="create-object">

    <router-link 
      class="create-object__back-btn"
      :to="`/project/${projectID}`"
    >
      {{ $t(`button.back`)}}
    </router-link >

    <h1 class="create-object__title">
      {{ $t(`objects.create_object`) }}
    </h1>

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

  .create-object__back-btn {
    background: inherit;
    border: none;
    color: var(--vt-c-font-grey);
    font-weight: 600;
    font-size: 16px;
    padding: 0;
  }
  
  .create-object__title {
    margin-top: 20px;
  }

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