<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { 
  ModeSwitch, 
  TraditionList, 
  TraditionButton,
  TraditionLoader
} from '../features';
import { useProjectStore, useObjectStore, useAppStore } from '@/entities';

const { t } = useI18n();
const route = useRoute();

const appStore = useAppStore();
const projectStore = useProjectStore();
const objectStore = useObjectStore(); 

const activeMode = computed(() => appStore.getMode);

const projectID = computed(() => route.params.projectID as string);

const project = computed(() => projectStore.getActiveProject); 
const projectSumAmount = computed(() =>{
  const amount = activeMode.value === "receipts" ? project.value?.receipts_count : project.value?.expenses_count;
  return amount ?? 0;
}); 

const objects = computed(() => objectStore.getActiveProjectObjects); 

// const activeMode = computed(() => appStore.getMode);
// const project = computed(() => projectStore.getProjectById(projectID.value));
// const objects = computed(() => project.value?.objects ? project.value?.objects : null);
// const objectsCount = computed(() => projectStore.getObjectsCount(projectID.value));
// const objectsSumAmount = computed(() => activeMode.value === 'expenses' ? 
//   projectStore.getObjectsSumExpenses(projectID.value): 
//   projectStore.getObjectsSumReceipts(projectID.value));

onMounted(() => {
  projectStore.fetchProjectByID(projectID.value);
  objectStore.fetchAllObjectsByProjectID(projectID.value);
});
</script>

<template>
  <tradition-button class="main-button" :link="'/create/object'"> 
    <span>{{ $t(`objects.create_object`) }}</span>
  </tradition-button>
  <div class="project-container">
    <h1>{{ project?.title }}</h1>
    <mode-switch 
      :today-amount="projectSumAmount"
    />

    <div>{{objects}}</div>
    <!-- <div class="project-subtitle">
      <span class="project-subtitle__text">{{ $t(`objects.my_objects`) }}</span>
      <span class="project-subtitle__project-count">{{ objectsCount }}</span>
    </div>
    <tradition-list 
      v-if="objects"
      :items="objects"
      :type="'object'"
    /> -->
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