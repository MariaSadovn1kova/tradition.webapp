<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { TraditionInput, TraditionButton } from '@/features'

const { t } = useI18n();

const test = ref('djkdkd');
</script>

<template>
  <div class="create-project">

    <tradition-button class="main-button" :link="'/projects'"> 
      <span>{{ $t(`projects.create_project`) }}</span>
    </tradition-button>
  
    <h1>{{ $t(`projects.create_project`) }}</h1>

    <div class="create-project__container">
      <tradition-input 
        :title="'Название проекта'"
        v-model="test"
      />
    </div>

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
}
</style>