<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  title: string;
  modelValue: string | number | readonly string[] | null | undefined;
  placeHolder?: string;
  isInput?: boolean;
  isNumber?: boolean;
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
      v-if="isInput"
      class="tradition-input__input"
      :type="isNumber ? `number` : `text`" 
      name="input" 
      v-model="localModelValue"
      :placeholder="placeHolder"
    /> 

    <textarea
      v-else 
      class="tradition-input__input"
      v-model="localModelValue"
      :placeholder="placeHolder"
    />
    
  </div>
</template>

<style lang="postcss" scoped>
@import './tradition-input.pcss';
</style>