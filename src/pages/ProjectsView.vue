<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import { ModeSwitch, TraditionList, TraditionButton } from '../features'
import { useProjectStore, useAppStore } from '@/entities';

const projectStore = useProjectStore();
const appStore = useAppStore();

const { t } = useI18n();

const activeMode = computed(() => appStore.getMode);
const projects = computed(() => projectStore.getProjects);
const projectsCount = computed(() => projectStore.getProjectsCount);
const projectsSumAmount = computed(() => activeMode.value === 'expenses' ? projectStore.getProjectSumExpenses : projectStore.getProjectSumReceipts);

onMounted(() => {
  projectStore.fetchProjects();
});
</script>

<template>
  <tradition-button class="main-button" :link="'/create/project'"> 
    <span>{{ $t(`projects.create_project`) }}</span>
  </tradition-button>
  <div class="project-container">
    <mode-switch 
      :today-amount="projectsSumAmount"
    />
    <div class="project-subtitle">
      <span class="project-subtitle__text">{{ $t(`projects.my_projects`) }}</span>
      <span class="project-subtitle__project-count">{{ projectsCount }}</span>
    </div>
    <tradition-list 
      :items="projects"
      :type="'project'"
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