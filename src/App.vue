<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

import { TraditionButton } from './features'
import { MainNavbar } from './widgets'

</script>

<template>
  <main-navbar />
  <tradition-button class="main-button" />
  <RouterView />
</template>

