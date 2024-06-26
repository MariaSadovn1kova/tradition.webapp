<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n';

import { ModeSwitch, TraditionList, TraditionButton, TraditionLoader } from '@/features'
import { useProjectStore, useAppStore } from '@/entities';

const projectStore = useProjectStore();
const appStore = useAppStore();

const { t } = useI18n();

const activeMode = computed(() => appStore.getMode);

const isLoading = computed(() => projectStore.getIsLoading);
const projects = computed(() => projectStore.getProjects);
const projectsCount = computed(() => projectStore.getProjectsCount);
const projectsSumAmount = computed(() => activeMode.value === "receipts" ? projectStore.getProjectReceiptsSum : projectStore.getProjectExpensesSum);

onMounted(() => {
  projectStore.fetchAllProjects();
});
</script>

<template>
  <tradition-button class="main-button" :link="'/create/project'"> 
    <span>{{ $t(`projects.create_project`) }}</span>
  </tradition-button>
  <div class="project-container">
    <mode-switch 
      :amount="projectsSumAmount"
    />

    <tradition-loader v-if="isLoading"/>

    <div v-else>
      <div class="project-subtitle">
        <span class="project-subtitle__text">{{ $t(`projects.my_projects`) }}</span>
        <span class="project-subtitle__project-count">{{ projectsCount }}</span>
      </div>

      <div 
        v-if="!projectsCount"
        class="project__placeholder"
      >
        {{ $t(`placeholder.project`) }}
      </div>

      <tradition-list 
        v-else
        :items="projects"
        :type="'project'"
      />
    </div>

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

  .project__placeholder {
    width: 100%;
    text-align: center;
    margin-top: 100px;
    color: var(--vt-c-font-grey-light);
  }
}
</style>