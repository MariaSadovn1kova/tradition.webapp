<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { ModeSwitch, TraditionList, TraditionButton } from '../features'
import { useProjectStore } from '@/entities';

const route = useRoute();
const projectStore = useProjectStore();

const projectID = computed(() => route.params.projectID as string);
const objectID = computed(() => route.params.objectID as string);
const project = computed(() => projectStore.getProjectById(projectID.value));
const object = computed(() => projectStore.getObjectById(projectID.value, objectID.value));
</script>

<template>
  <tradition-button class="main-button"> 
    <span>{{ $t(`projects.create_project`) }}</span>
  </tradition-button>
  <div class="project-container">
    <h1>{{ object.title }}</h1>
    <h3>{{ project.title }}</h3>
    <mode-switch />
    
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