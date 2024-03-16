<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  modelValue: string|number|boolean;
  placeHolder?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const localModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
</script>

<template>
  <div class="tradition-input">
    <div class="tradition-input__title">{{ props.title }}</div>
    <input 
      class="tradition-input__input"
      type="text" 
      name="input" 
      v-model="localModelValue"
      :placeholder="placeHolder"
    />    
  </div>
</template>

<style lang="postcss" scoped>
@import './tradition-input.pcss';
</style>