<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from "vue-router";

import { TraditionInput, TraditionButton } from '@/features';
import { ProjectAPI } from '@/shared';
import type { TProject } from '@/shared/api/project/models'

const { t } = useI18n();

const router = useRouter();
const projectName = ref('');

const createProject = async (): Promise<void> => {
  if (projectName.value) {
    const createProject = ref<TProject.ICreateProject>({
      title: projectName.value
    })
     await ProjectAPI.createProject(createProject.value).then(() => {
      router.push('/');
    });
  };
};

</script>

<template>
  <div class="create-project">

    <router-link 
      class="create-project__back-btn"
      :to="`/`"
    >
      {{ $t(`button.back`)}}
    </router-link >
  
    <h1 class="create-project__title">{{ $t(`projects.create_project`) }}</h1>

    <div class="create-project__container">
      <tradition-input 
        :title="'Название проекта'"
        :place-holder="'Введите название проекта'"
        :isInput="true"
        v-model="projectName"
      />
    </div>

    <button
      class="create-project__button"
      @click="createProject()"
    >
      {{ $t(`projects.create_project`) }}
    </button>

  </div>
</template>

<style lang="postcss" scoped>
.create-project {
  padding: 0 30px;

  .create-project__back-btn {
    background: inherit;
    border: none;
    color: var(--vt-c-font-grey);
    font-weight: 600;
    font-size: 16px;
    padding: 0;
  }

  .create-project__title {
    margin-top: 20px;
  }
  
  .create-project__container {
    padding: 20px;  
    background: var(--vt-c-white);
    border-radius: var(--vt-default-radius);
    box-shadow: var(--vt-default-shadow);
    height: 200px;
  }

  .create-project__button {
    position: fixed;
    padding: 18px;
    height: 55px;
    border: none;
    width: calc(100% - 60px);
    bottom: 20px;
    left: 30px;
    color: var(--vt-c-white);
    border-radius: var(--vt-default-radius);
    background: var(--vt-c-green-gradient);

    &:active {
      background: var(--vt-c-dark-green-gradient);
    }
  }
}
</style>