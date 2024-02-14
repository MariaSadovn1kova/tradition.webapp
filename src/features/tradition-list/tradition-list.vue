<script setup lang="ts">
import { computed } from 'vue'
import TraditionCard from '../tradition-card/tradition-card.vue'
import type { IProject } from '@/entities/project/model'

const props = defineProps<{
  items: IProject[];
}>();

const projects = computed(() => props.items);
</script>
<template>
    <div class="tradition-list__container">
        <tradition-card 
            v-for="project in projects" 
            :key="project.id"
            :item="project"
        />
    </div>
</template>

<style lang="postcss" scoped>
@import './tradition-list.pcss';
</style>