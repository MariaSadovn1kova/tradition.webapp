<script setup lang="ts">
const props = defineProps<{
  link: string
}>();
</script>

<template>
  <div class="button__container button">
    <router-link class="button__main" :to="props.link">
      <slot/>
    </router-link>
  </div>  
</template>


<style lang="postcss" scoped>
@import './tradition-button.pcss';
</style>