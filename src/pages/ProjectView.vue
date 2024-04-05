<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { 
  ModeSwitch, 
  TraditionList, 
  TraditionButton,
  TraditionLoader,
  TraditionModal
} from '@/features';
import { useProjectStore, useObjectStore, useAppStore } from '@/entities';
import { ProjectAPI } from '@/shared';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const showDeleteModal = ref(false);

const appStore = useAppStore();
const projectStore = useProjectStore();
const objectStore = useObjectStore(); 

const projectID = computed(() => route.params.projectID as string);
const activeMode = computed(() => appStore.getMode);
const isLoading = computed(() => projectStore.getIsLoading || objectStore.getIsLoading);

const project = computed(() => projectStore.getActiveProject); 
const projectSumAmount = computed(() =>{
  const amount = activeMode.value === "receipts" ? project.value?.receipts_count : project.value?.expenses_count;
  return amount ?? 0;
}); 

const objects = computed(() => objectStore.getActiveProjectObjects); 
const objectsCount = computed(() => objectStore.getObjectsCount); 

const deleteProject = async (): Promise<void> => {
  if (projectID.value) {
    await ProjectAPI.deleteProject(projectID.value).then(() => {
      router.push(`/`);
    });
  };
};

onMounted(() => {
  projectStore.fetchProjectByID(projectID.value);
  objectStore.fetchAllObjectsByProjectID(projectID.value);
});
</script>

<template>

  <tradition-loader v-if="isLoading"/>

  <div v-else>

    <tradition-modal
      v-if="showDeleteModal"
      class="delete-modal"
    > 
      <div class="delete-modal__title">
        {{ $t(`button.delete_project_submit`) }}
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
          @click="deleteProject()"
        >
          {{ $t(`button.submit`) }}
        </button>
      </div>
    </tradition-modal>

    <tradition-button class="main-button" :link="`/create/${projectID}/object`"> 
      <span>{{ $t(`objects.create_object`) }}</span>
    </tradition-button>

    <div class="project-container">

      <div class="project__btns btns">
        <router-link 
          class="btns__back-btn"
          :to="`/`"
        >
          {{ $t(`button.back`)}}
        </router-link >
        <button 
          class="btns__delete-btn"
          @click="showDeleteModal = true"
        >
          {{ $t(`button.delete_project`)}}
        </button>
      </div>

      <h1 class="project__title">
        {{ project?.title }}
      </h1>

      <mode-switch 
        :today-amount="projectSumAmount"
      />

      <div class="project-subtitle">
        <span class="project-subtitle__text">{{ $t(`objects.my_objects`) }}</span>
        <span class="project-subtitle__project-count">{{ objectsCount }}</span>
      </div>

      <div 
        v-if="!objectsCount"
        class="project__placeholder"
      >
        {{ $t(`placeholder.object`) }}
      </div>

      <tradition-list 
        v-else
        :items="objects"
        :type="'object'"
      />

    </div>
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

.project-container {
  padding: 0 30px;

  .project__btns {
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
  
  .project__placeholder {
    width: 100%;
    text-align: center;
    margin-top: 100px;
    color: var(--vt-c-font-grey-light);
  }

  .project__title {
    margin-top: 20px;
    max-width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }

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