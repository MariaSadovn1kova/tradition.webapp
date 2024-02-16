<script setup lang="ts">
import { computed } from 'vue'
import TraditionCard from '../tradition-card/tradition-card.vue'
import type { IProject, IObject } from '@/entities/project/model'

const props = defineProps<{
  items: IProject[] | IObject[];
  type: 'project' | 'object';
}>();

const items = computed(() => props.items);
const type = computed(() => props.type);
</script>
<template>
    <div class="tradition-list__container">
        <tradition-card 
            v-for="item in items" 
            :key="item.id"
            :item="item"
            :type="type"
            :link="`/${type}/${item.id}`"
        />
    </div>
</template>

<style lang="postcss" scoped>
@import './tradition-list.pcss';
</style>