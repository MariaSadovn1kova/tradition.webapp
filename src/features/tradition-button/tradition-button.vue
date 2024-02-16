<script setup lang="ts">

</script>

<template>
    <div class="button__container">
        <router-link class="button_main" to="/">
            <img src="@/assets/img/home.png">
        </router-link>
        <button class="button__main">
            <slot/>
        </button>
    </div>  
</template>


<style lang="postcss" scoped>
@import './tradition-button.pcss';
</style>