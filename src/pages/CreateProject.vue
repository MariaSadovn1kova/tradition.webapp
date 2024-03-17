<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from "vue-router";
import { TraditionInput, TraditionButton } from '@/features';

const { t } = useI18n();

const router = useRouter();
const projectName = ref('');

const createProject = (): void => {
  console.log(projectName.value);
  router.push('/');
}
</script>

<template>
  <div class="create-project">
  
    <h1>{{ $t(`projects.create_project`) }}</h1>

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