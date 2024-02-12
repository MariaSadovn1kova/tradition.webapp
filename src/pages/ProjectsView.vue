<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import { ModeSwitch, TraditionList } from '../features'
import { useProjectStore } from '@/entities';

const projectStore = useProjectStore();

const { t } = useI18n();

const projects = computed(() => projectStore.getProjects);
const projectsCount = computed(() => projects.value.length);

onMounted(() => {
  projectStore.getAllProjects();
});
</script>

<template>
  <div class="project-container">
    <mode-switch />
    <div class="project-subtitle">
      <span class="project-subtitle__text">{{ $t(`projects.my_projects`) }}</span>
      <span class="project-subtitle__project-count">{{ projectsCount }}</span>
    </div>
    <tradition-list />
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