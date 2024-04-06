<script setup lang="ts">

const props = defineProps<{
  description: string;
}>();

</script>

<template>
  <div class="object-description__container">
    {{ description }}
  </div>
</template>

<style lang="postcss" scoped>
.object-description__container {
  background: var(--vt-c-white);
  box-shadow: var(--vt-default-shadow);
  border-radius: var(--vt-default-radius);
  min-height: 220px;
  padding: 20px;
  text-align: center;
}
</style>