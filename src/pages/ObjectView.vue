<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ModeSwitch, TraditionList, TraditionButton } from '../features'
import { useProjectStore, useAppStore } from '@/entities';

const route = useRoute();
const projectStore = useProjectStore();
const appStore = useAppStore();

const activeMode = computed(() => appStore.getMode);
const projectID = computed(() => route.params.projectID as string);
const objectID = computed(() => route.params.objectID as string);
const project = computed(() => projectStore.getProjectById(projectID.value));
const object = computed(() => projectStore.getObjectById(projectID.value, objectID.value));
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
</script>

<template>
  <tradition-button class="main-button"> 
    <span>{{ $t(`projects.create_project`) }}</span>
  </tradition-button>
  <div class="project-container">
    <h1>{{ object?.title }}</h1>
    <h3>{{ project?.title }}</h3>
    <mode-switch 
      :today-amount="objectTodayAmount"
      :all-amount="objectAllAmount"
    />
  </div>
</template>


<style lang="postcss" scoped>
.project-container {
  padding: 0 30px;

  .project-subtitle {
    display: flex;

    .project-subtitle__text {
      margin-right: 5px;
      color: var(--vt-c-font-green);
    }
    
    .project-subtitle__project-count {
      color: var(--vt-c-font-grey);
    }
  }
}
</style>