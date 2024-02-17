<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formattedNumber } from '@/shared'
import type { IProject, IObject } from '@/entities/project/model'
import { useProjectStore, useAppStore } from '@/entities';

const props = defineProps<{
  item: IProject | IObject;
  type: 'project' | 'object';
  link: string;
}>();

const route = useRoute();
const projectStore = useProjectStore();
const appStore = useAppStore();

const item = computed(() => props.item);
const link = computed(() => props.link);

const activeMode = computed(() => appStore.getMode);
const projectID = computed(() => route.params.projectID as string);
const objectsCount = computed(() => projectStore.getObjectsCount(item.value.id));
const formattedAmount = computed(() => formattedNumber( activeMode.value === 'expenses' ? props.item.expenses_today : props.item.receipts_today));
</script>

<template>
  <router-link class="tradition-card__container" :to="link">
    <div class="tradition-card__text-content text-content">
      <div class="text-content__title">{{ item.title }}</div>
      <div class="text-content__subtitle">{{ objectsCount }}</div>
    </div>
    <div class="tradition-card__arrow">
      <img v-if="activeMode === 'receipts'" src="@/assets/img/arrow_up.png">
      <img v-else src="@/assets/img/arrow_down.png">
    </div>
    <div class="tradition-card__transaction-info transaction-info"> 
      <span :class="['transaction-info__subtitle', activeMode]">{{ formattedAmount }}</span>
    </div>
  </router-link>
</template> 

<style lang="postcss" scoped>
@import './tradition-card.pcss';
</style>