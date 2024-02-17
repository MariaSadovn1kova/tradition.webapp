<script setup lang="ts">

</script>

<template>
  <div class="navbar">
    <div class="navbar__item user">
      <div class="user__avatar">
        <img src="@/assets/img/test_avatar.png">
      </div>
      <div class="user__name">
          Иванова И.И.
      </div>
    </div>
    <div class="navbar__item">
      <router-link class="navbar__item__last-operation" to="/last-transaction">
        <img src="@/assets/img/last_operation.png">
      </router-link>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
@import './main-navbar.pcss';
</style>s