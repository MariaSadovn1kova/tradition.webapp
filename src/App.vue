<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import { MainNavbar } from './widgets'

const isSigninRoute = computed(() => { return route.name === 'signin' });
const route = useRoute()

</script>

<template>
  <main-navbar v-if="!isSigninRoute"/>
  <RouterView />
</template>

