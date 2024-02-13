<script setup lang="ts">
import { computed } from 'vue';
import { formattedNumber } from '@/shared'

const formattedAmount = computed(() => formattedNumber(5000));
</script>

<template>
  <div class="tradition-card__container">
    <div class="tradition-card__text-content text-content">
      <div class="text-content__title">Название</div>
      <div class="text-content__subtitle">Подназвание</div>
    </div>
    <div class="tradition-card__transaction-info transaction-info">
      <span class="transaction-info__subtitle">{{ formattedAmount }}</span>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import './tradition-card.pcss';
</style>