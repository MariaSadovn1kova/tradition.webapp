<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { DateTime } from 'luxon'

import { useAppStore } from '@/entities';
import { formattedNumber } from '@/shared'

const props = defineProps<{
  amount: number;
}>();

const appStore = useAppStore();

const { t } = useI18n();

const dateTime = DateTime.local();
const mods = ['receipts', 'expenses']

const activeMode = computed(() => appStore.getMode);
const todaysDay = computed(() => dateTime.toFormat('dd.LL.yyyy'));
const formattedAmount = computed(() => formattedNumber(props.amount));

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
      <div class="mode-switch__switches__date">{{ todaysDay }}</div>
    </div>
    <div :class="[ 'mode-switch__container', { [`mode-switch__container_no-left-radius`]: activeMode === 'receipts' }]">
      <div 
        :class="[ 'mode-switch__container__banner', activeMode ]"
      >
        <div class="banner">
          <div class="banner__today-count">
            <div class="banner__title">{{ $t(`all_banner.${activeMode}`) }}</div>
            <div class="banner__count">{{ formattedAmount }}</div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import './mode-switch.pcss';
</style>