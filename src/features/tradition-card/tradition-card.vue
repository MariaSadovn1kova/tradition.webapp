<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { formattedNumber } from '@/shared'
import type { IProject, IObject } from '@/entities/project/model'
import { useProjectStore } from '@/entities';

const props = defineProps<{
  item: IProject | IObject;
  type: 'project' | 'object';
  link: string;
}>();

const route = useRoute();
const projectStore = useProjectStore();

const item = computed(() => props.item);
const link = computed(() => props.link);

const projectID = computed(() => route.params.projectID as string);
const objectsCount = computed(() => projectStore.getObjectsCount(projectID.value));
const formattedAmount = computed(() => formattedNumber(props.item.amount_today.count));
</script>

<template>
  <router-link class="tradition-card__container" :to="link">
    <div class="tradition-card__text-content text-content">
      <div class="text-content__title">{{ item.title }}</div>
      <div class="text-content__subtitle">{{ objectsCount }}</div>
    </div>
    <div class="tradition-card__transaction-info transaction-info"> 
      <span :class="['transaction-info__subtitle', item.amount_today.count]">{{ formattedAmount }}</span>
    </div>
  </router-link>
</template>

<style lang="postcss" scoped>
@import './tradition-card.pcss';
</style>