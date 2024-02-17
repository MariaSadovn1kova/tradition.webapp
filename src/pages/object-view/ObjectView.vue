<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ModeSwitch, TraditionList, TraditionButton } from '@/features'
import { useProjectStore, useAppStore } from '@/entities';
import { ObjectDoc, ObjectInfo, ObjectTransactions } from './ui'

const route = useRoute();
const projectStore = useProjectStore();
const appStore = useAppStore();

const activeMode = computed(() => appStore.getMode);
const activeObjectMode = computed(() => appStore.getObjectMode);
const projectID = computed(() => route.params.projectID as string);
const objectID = computed(() => route.params.objectID as string);
const project = computed(() => projectStore.getProjectById(projectID.value));
const object = computed(() => projectStore.getObjectById(projectID.value, objectID.value));
const objectExpenses = computed(() => object.value?.expenses_all ? object.value?.expenses_all : 0);
const objectReceipts = computed(() => object.value?.receipts_all ? object.value?.expenses_all : 0);
const objectTodayAmount = computed(() => {
  if (!object.value) {
    return 0;
  }
  return activeMode.value === 'expenses' ? object.value.expenses_today : object.value.receipts_today;
});
const objectAllAmount = computed(() => {
  if (!object.value) {
    return 0;
  }
  return activeMode.value === 'expenses' ? object.value.expenses_all : object.value.receipts_all;
});

const objectMenuOptions = ['transactions','information','docs']

const setActiveObjectMode = (value: string): void => {
  appStore.setObjectMode(value);
};
</script>

<template>
  <tradition-button class="main-button" :link="'/create/transaction'"> 
    <span>{{ $t(`objects.create_transaction`) }}</span>
  </tradition-button>
  <div class="object-container">
    <h1>{{ object?.title }}</h1>
    <h3>{{ project?.title }}</h3>
    <mode-switch 
      :today-amount="objectTodayAmount"
      :all-amount="objectAllAmount"
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
    /> 
    <object-info v-else-if="activeObjectMode === 'information'" />
    <object-doc v-else /> 
    
  </div>
</template>


<style lang="postcss" scoped>
.object-container {
  padding: 0 30px;
  
  .object__menu {
    margin-bottom: 20px;

    .object__menu__option {
      padding: 0;
      margin-right: 10px;
      background: none;
      border: none;
      color: var(--vt-c-font-grey);

      &.active {
        color: var(--vt-c-font-green);
      }
    }
  }
}
</style>