<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { TraditionInput } from '@/features';
import { AuthenticationAPI } from '@/shared';
import type { TAuthentication } from '@/shared/api/authentication/models';

const { t } = useI18n();

const userName = ref('');
const userPassword = ref('');

const test = async (): Promise<void> => {

  if (userName.value && userPassword.value) {
    const login = ref<TAuthentication.ILogin>({
      user: userName.value,
      password: userPassword.value
    })
    await AuthenticationAPI.logIn(login.value);
  };
};
</script>

<template>
  <div class="signin">
    <div class="signin__form">
      <tradition-input 
        :title="'Логин'"
        :isInput="true"
        v-model="userName"
      />
      <tradition-input 
        :title="'Пароль'"
        :isInput="true"
        v-model="userPassword"
        isPassword
      />
      <button 
        class="signin__form__submit" 
        @click="test()"
      >
        {{ $t(`signin`) }}
      </button>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.signin {
  height: 100vh;
  width: 100%;
  background-color: var(--vt-c-light-grey);
  padding: 150px 40px;
  display: flex;
  flex-direction: column;

  .signin__form {
    background-color: var(--vt-c-white);
    box-shadow: var(--vt-default-shadow);
    border-radius: 20px;
    height: 300px;
    padding: 30px;
  }

  .signin__form__submit {
    padding: 5px 0;
    margin-top: 40px;
    width: 100%;
    height: 40px;
    font-weight: 500;
    border: none;
    color: var(--vt-c-white);
    border-radius: var(--vt-default-radius);
    background: var(--vt-c-green-gradient);

    &:active {
      background: var(--vt-c-dark-green-gradient);
    }
  }
}
</style>