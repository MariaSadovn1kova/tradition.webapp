<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import TraditionCard from '../tradition-card/tradition-card.vue';

import type { TObject } from '@/shared/api/object/models';
import type { TProject } from '@/shared/api/project/models';

const props = defineProps<{
  items: TProject.IProject[] | TObject.IObject[];
  type: 'project' | 'object';
}>();

const route = useRoute();

const items = computed(() => props.items);
const type = computed(() => props.type);
const projectID = computed(() => route.params.projectID ? route.params.projectID : null);

const getLink = (id: string | number): string => {
  return projectID.value ? `/project/${projectID.value}/${id}` : `/project/${id}`
}
</script>
<template>
  <div class="tradition-list__container">
    <tradition-card 
      v-for="item in items" 
      :key="item.id"
      :item="item"
      :type="type"
      :link="getLink(item.id)"
    />
  </div>
</template>

<style lang="postcss" scoped>
@import './tradition-list.pcss';
</style>