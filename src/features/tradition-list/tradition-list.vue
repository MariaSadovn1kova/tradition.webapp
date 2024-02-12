<script setup lang="ts">
import TraditionCard from '../tradition-card/tradition-card.vue'

</script>
<template>
    <div class="tradition-list__container">
        <tradition-card v-for="item in 4" :key="item"/>
    </div>
</template>

<style lang="postcss" scoped>
@import './tradition-list.pcss';
</style>