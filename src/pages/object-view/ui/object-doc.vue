<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { DateTime } from 'luxon';

import { FileAPI } from '@/shared';

const route = useRoute();

const objectID = computed(() => route.params.objectID as string);

const fetchFiles = async(): Promise<void>  => {
  const test = FileAPI.getAllFilesByObjecttID(objectID.value);
  console.log(FileAPI.getAllFilesByObjecttID(objectID.value));
}

</script>

<template>
  <div class="doc">
    <div>pdf</div>
    <button
      @click="fetchFiles()"
    >
      ddd
    </button>
    <input 
      type="file"
      accept=".pdf, .docx, .xlsx"
      class="create-object__file-input"
      multiple
    />
    <div>excel</div>
  </div>
</template>

<style>

</style>