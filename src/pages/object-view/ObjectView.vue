<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { ModeSwitch, TraditionList, TraditionButton, TraditionModal } from '@/features'
import { useProjectStore, useAppStore, useObjectStore } from '@/entities';
import { ObjectAPI } from '@/shared';

import { ObjectDoc, ObjectInfo, ObjectTransactions } from './ui'

const route = useRoute();
const router = useRouter();

const showDeleteModal = ref(false);

const projectStore = useProjectStore();
const objectStore = useObjectStore();
const appStore = useAppStore();

const activeMode = computed(() => appStore.getMode);
const activeObjectMode = computed(() => appStore.getObjectMode);

const projectID = computed(() => route.params.projectID as string);
const objectID = computed(() => route.params.objectID as string);

const project = computed(() => projectStore.getActiveProject);
const object = computed(() => objectStore.getActiveObject);

const objectExpenses = computed(() => object.value?.expenses_count ?? 0);
const objectReceipts = computed(() => object.value?.receipts_count ?? 0);

const objectSumAmount = computed(() =>{
  const amount = activeMode.value === "receipts" ? object.value?.receipts_count : object.value?.expenses_count;
  return amount ?? 0;
}); 

const objectMenuOptions = ['transactions','information','docs']

const setActiveObjectMode = (value: string): void => {
  appStore.setObjectMode(value);
};

const deleteObject = async (): Promise<void> => {
  if (objectID.value) {
    await ObjectAPI.deleteObject(objectID.value).then(() => {
      router.push(`/project/${projectID.value}`);
    });
  };
};

const updateObject = async (): Promise<void> => {
  objectStore.fetchObjectByID(objectID.value);
};

onMounted(() => {
  objectStore.fetchObjectByID(objectID.value);
  projectStore.fetchProjectByID(projectID.value);
});
</script>

<template>

  <tradition-modal  
    v-if="showDeleteModal"
    class="delete-modal"
  >
    <div class="delete-modal__title">
      {{ $t(`button.delete_object_submit`) }}
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
        @click="deleteObject()"
      >
        {{ $t(`button.submit`) }}
      </button>
    </div>
  </tradition-modal>

  <tradition-button class="main-button" :link="`/create/${projectID}/${objectID}/transaction`"> 
    <span>{{ $t(`objects.create_transaction`) }}</span>
  </tradition-button>

  <div class="object-container">

    <div class="object__btns btns">
      <router-link 
        class="btns__back-btn"
        :to="`/project/${projectID}`"
      >
        {{ $t(`button.back`)}}
      </router-link >
      <button 
        class="btns__delete-btn"
        @click="showDeleteModal = true"
      >
        {{ $t(`button.delete_object`)}}
      </button>
    </div>


    <h1 class="object__title">{{ object?.title }}</h1>
    <h3 class="project__title">{{ project?.title }}</h3>

    <mode-switch 
      :amount="objectSumAmount"
    />

    <div class="object__menu">
      <button 
        v-for="item in objectMenuOptions"
        :class="['object__menu__option', { 'active': activeObjectMode === item }]"
        :key="`${item}_option`"
        @click="setActiveObjectMode(item)"
      > 
        {{ $t(`objects.${item}`) }}
      </button>
    </div>

    <object-transactions 
      v-if="activeObjectMode === 'transactions'"
      :all-expenses="objectExpenses"
      :all-receipts="objectReceipts" 
      @update-object="updateObject()"
    /> 
    <object-info 
      v-else-if="activeObjectMode === 'information'" 
      :description="object?.descr ?? 'Описания нет'"
    />
    <object-doc v-else /> 
    
  </div>
</template>

<style lang="postcss" scoped>
.delete-modal {
  .delete-modal__title {
    color: var(--vt-c-font-grey);
    font-weight: 600;
    font-size: 22px;
    text-align: center;
    margin-top: 40px;
  }

  .delete-modal__btns {
    margin-top: 100px;
    display: flex;
    justify-content: center;

    .btns__cancel {
      background: inherit;
      border: none;
      color: var(--vt-c-font-grey-light);
      font-size: 16px;
      padding: 0;
      font-weight: 600;
      margin-right: 20px;
    }

    .btns__submit {
      color: var(--vt-c-white);
      border-radius: var(--vt-default-radius);
      background: var(--vt-c-green-gradient);
      border: none;
      padding: 10px 20px;
      font-weight: 600;
      font-size: 16px;
    }
  }
}

.object-container {
  padding: 0 30px;
  
  .object__btns {
    display: flex;
    justify-content: space-between;

    .btns__back-btn {
      background: inherit;
      border: none;
      color: var(--vt-c-font-grey);
      font-weight: 600;
      font-size: 16px;
      padding: 0;
    }

    .btns__delete-btn {
      background: inherit;
      border: none;
      color: var(--vt-c-font-red);
      font-size: 16px;
      padding: 0;
    }
  }

  .object__title {
    margin-top: 20px;
  }

  .object__menu {
    margin-bottom: 20px;

    .object__menu__option {
      padding: 0;
      margin-right: 10px;
      background: none;
      border: none;
      color: var(--vt-c-font-grey);
      font-size: 14px;
      font-weight: 600;

      &.active {
        color: var(--vt-c-font-green);
      }
    }
  }
}
</style>