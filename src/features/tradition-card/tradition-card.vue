<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';

import { formattedNumber } from '@/shared'
import { useProjectStore, useAppStore } from '@/entities';

import type { TObject } from '@/shared/api/object/models';
import type { TProject } from '@/shared/api/project/models';

const props = defineProps<{
  item: TProject.IProject | TObject.IObject;
  type: 'project' | 'object';
  link: string;
}>();

const route = useRoute();
const appStore = useAppStore();

const item = computed(() => props.item);
const link = computed(() => props.link);

const activeMode = computed(() => appStore.getMode);

const projectID = computed(() => route.params.projectID as string);(item as TTask.ITask)

const formattedAmount = computed(() => formattedNumber(activeMode.value === 'expenses' ? props.item.expenses_count : props.item.receipts_count));
</script>

<template>
  <router-link class="tradition-card__container" :to="link">
    
    <div class="tradition-card__text-content text-content">
      <div 
        class="text-content__title"
        :class="type === 'project' ? 'text-content__title--only' : ''"
      >{{ item.title }}</div>
      <div class="text-content__subtitle">{{ (item as TObject.IObject).descr }}</div>
    </div>

    <div class="tradition-card__end-content">
      <div class="tradition-card__arrow">
        <img v-if="activeMode === 'receipts'" src="@/assets/img/arrow_up.png">
        <img v-else src="@/assets/img/arrow_down.png">
      </div>
      <div class="tradition-card__transaction-info transaction-info"> 
        <span :class="['transaction-info__subtitle', activeMode]">{{ formattedAmount }}</span>
      </div>
    </div>

  </router-link>
</template> 

<style lang="postcss" scoped>
@import './tradition-card.pcss';
</style>