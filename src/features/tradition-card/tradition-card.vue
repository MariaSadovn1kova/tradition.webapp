<script setup lang="ts">
import { computed, ref } from 'vue';
import { formattedNumber } from '@/shared'
import type { IProject } from '@/entities/project/model'

const props = defineProps<{
  item: IProject;
}>();

const project = computed(() => props.item);
const objectsCount = computed(() => `${props.item.objects_number} ${props.item.objects_number < 4 ? 'объекта' : 'объектов'}`);
const formattedAmount = computed(() => formattedNumber(props.item.amount_count));
const roterLink = computed(() => `${props.item.id}/Objects`);
</script>

<template>
  <router-link class="tradition-card__container" :to="roterLink">
    <div class="tradition-card__text-content text-content">
      <div class="text-content__title">{{ project.title }}</div>
      <div class="text-content__subtitle">{{ objectsCount }}</div>
    </div>
    <div class="tradition-card__transaction-info transaction-info"> 
      <span :class="['transaction-info__subtitle', project.amount_type]">{{ formattedAmount }}</span>
    </div>
  </router-link>
</template>

<style lang="postcss" scoped>
@import './tradition-card.pcss';
</style>