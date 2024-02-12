<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useAppStore } from '@/entities';

const appStore = useAppStore();

const { t } = useI18n();

const activeMode = computed(() => appStore.getMode);

const mods = ['receipts', 'expenses']

const setActiveMode = (value: string): void => {
  appStore.setMode(value);
};
</script>

<template>
  <div class="mode-switch">
    <div class="mode-switch__switches">
      <button 
        v-for="(item, index) in mods"
        :key="'mode' + index"
        :class="[ 'mode-switch__switches__switch', { [`mode-switch__switches__switch_active`]: activeMode === item }]"
        @click="setActiveMode(item)"
      >
        {{ $t(`projects.${item}`) }}
      </button>
      <div class="mode-switch__switches__date">10.02.2024</div>
    </div>
    <div class="mode-switch__container">
      <div 
        :class="[ 'mode-switch__container__banner', 'banner', activeMode ]"
      >
        <div class="banner__title">
          {{ $t(`banner.${activeMode}`) }}
        </div>
        <div class="banner__count">
          20.000 Р
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import './mode-switch.pcss';
</style>