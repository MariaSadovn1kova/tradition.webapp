<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { 
  ModeSwitch, 
  TraditionList, 
  TraditionButton,
  TraditionLoader
} from '../features';
import { useProjectStore } from '@/entities';

const { t } = useI18n();
const route = useRoute();
const projectStore = useProjectStore();

const projectID = computed(() => route.params.projectID as string);
const project = computed(() => projectStore.getProjectById(projectID.value));
const objects = computed(() => project.value?.objects ? project.value?.objects : null);
const objectsCount = computed(() => projectStore.getObjectsCount(projectID.value));
</script>

<template>
  <tradition-button class="main-button"> 
    <span>{{ $t(`objects.create_object`) }}</span>
  </tradition-button>
  <tradition-loader v-if="!project"/>
  <div v-else class="project-container">
    <h1>{{ project.title }}</h1>
    <mode-switch />
    <div class="project-subtitle">
      <span class="project-subtitle__text">{{ $t(`objects.my_objects`) }}</span>
      <span class="project-subtitle__project-count">{{ objectsCount }}</span>
    </div>
    <tradition-list 
      v-if="objects"
      :items="objects"
      :type="'object'"
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