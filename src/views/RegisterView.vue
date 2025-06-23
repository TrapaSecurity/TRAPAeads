<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'

import { useRegister } from '@/composables/auth'


const username = ref('')
const usernameError = ref(false)
const email = ref('')
const password = ref('')
const passwordError = ref(false)
const passwordCheck = ref('')
const passwordCheckError = ref(false)


watch(username, () => {
  usernameError.value = false
})
watch(password, () => {
  passwordError.value = false
  if (password.value !== passwordCheck.value)
    passwordCheckError.value = true
  else
    passwordCheckError.value = false
})
watch(passwordCheck, () => {
  if (password.value !== passwordCheck.value)
    passwordCheckError.value = true
  else
    passwordCheckError.value = false
})


async function register() {
  await useRegister(username.value, password.value, () => {}, () => {
    usernameError.value = true
    passwordError.value = true
  })
}
</script>

<template>
  <div class="overflow-auto">
    <div class="position-relative">
      <div class="background-container container-fluid">
        <div class="login-container">
          <div class="d-flex mx-auto align-items-center justify-content-center mb-4">
            <img src="/logo.png" width="72">
          </div>
          <form @submit.prevent="register" class="login-form">
            <h2 class="text-center fw-bold fs-6 mb-3">Register your TRAPAgram account</h2>
            <input v-model="username" :class="{ 'error': usernameError }" type="text" class="container-fluid mb-2" placeholder="Username" autocomplete="off">
            <input v-model="email" type="text" class="container-fluid mb-2" placeholder="Email" autocomplete="off">
            <input v-model="password" :class="{ 'error': passwordError }" type="password" class="container-fluid mb-2" placeholder="Password" autocomplete="off">
            <input v-model="passwordCheck" :class="{ 'error': passwordCheckError }" type="password" class="container-fluid mb-2" placeholder="Password Again" autocomplete="off">
            <button type="submit" class="login-btn container-fluid">Register</button>
            <RouterLink :to="{ name: 'login' }" class="d-block text-decoration-none container-fluid text-center forgot-link">Have an account?</RouterLink>
          </form>
          <div class="divider d-flex align-items-center justify-content-center">
            <div></div>
            <p class="m-0">or</p>
            <div></div>
          </div>
          <button class="other-login-btn container-fluid d-flex align-items-center justify-content-between">
            <img src="/logo.png" width="45">
            <p class="m-0">Continue with TRAPAgram</p>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.99868 14.5L11.0013 8.5L4.99868 2.5" stroke="#777777" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="app-container position-fixed end-0 bottom-0">
        <p class="text-center">Scan to get the app</p>
        <div class="qrcode-container d-flex justify-content-center align-items-center">
          <img src="/qrcode.png" width="149">
        </div>
      </div>

      <div class="footer d-flex align-items-center flex-wrap">
        <p class="m-0">&copy; 2025</p>
        <p class="m-0">TRAPAeads Terms</p>
        <p class="m-0">Privacy Policy</p>
        <p class="m-0">Cookies Policy</p>
        <p class="m-0">Report a problem</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
input.error {
  outline: 1px solid rgb(220, 53, 69);
}

@media (max-width: 767px) {
  .background-container {
    padding: 0 26px 180px;
  }

  .login-container {
    margin-top: 103px;
    width: 100%;
  }

  .app-container {
    display: none;
  }

  .footer {
    bottom: 14px;
    width: 100%;
    padding: 0 16px;
    justify-content: center;
    gap: 12px;
    row-gap: 7px;
    position: absolute;
  }

  .footer>p {
    font-size: 12px;
    color: #777;
  }

  .other-login-btn {
    border: 1px solid rgba(243, 245, 247, 0.15);
    background-color: #101010;
    border-radius: 12px;
    height: 87px;
    padding: 0 21px;
  }

    .divider {
    gap: 16px;
    margin-bottom: 21.5px;
  }

  .divider>p {
    font-size: 14.88px;
    color: #777;
    font-weight: 300;
  }

  .divider>div {
    height: 1px;
    width: 27px;
    background-color: rgba(243, 245, 247, 0.3);
  }
  
  .login-form {
    margin-bottom: 29.5px;
  }

  .forgot-link {
    font-size: 14.88px;
    color: #777;
  }

  .login-btn {
    border-radius: 12px;
    background-color: #fff;
    color: #101010;
    font-size: 15px;
    height: 56px;
    font-weight: 500;
    border: none;
    margin-bottom: 19px;
  }

  button {
    transition: transform 0.1s ease-in-out; 
  }

  button:active {
    transform: scale(0.98);
  }

  input {
    height: 55px;
    background-color: #1e1e1e;
    border: 1px solid #0000;
    border-radius: 12px;
    outline: none;
    padding: 0 17px;
  }

  input::placeholder {
    font-family: inherit;
    font-size: 14.3px;
  }

  input:focus {
    border: 1px solid rgba(243, 245, 247, 0.15);
  }
}

@media (min-width: 768px) {
  .app-container {
    width: 174px;
    margin: 32px;
  }

  .app-container>p {
    font-size: 13px;
    color: #777;
  }

  .qrcode-container {
    width: 174px;
    height: 174px;
    background-color: #181818;
    border: 1px solid rgba(243, 245, 247, 0.15);
    border-radius: 16px;
  }

  .footer {
    bottom: 15.5px;
    width: 424px;
    justify-content: space-between;
    position: fixed;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .footer>p {
    font-size: 12px;
    color: #777;
  }

  .other-login-btn {
    border: 1px solid rgba(243, 245, 247, 0.15);
    background-color: #101010;
    border-radius: 12px;
    height: 87px;
    padding: 0 21px;
  }

  .divider {
    gap: 16px;
    margin-bottom: 21.5px;
  }

  .divider>p {
    font-size: 14.88px;
    color: #777;
    font-weight: 300;
  }

  .divider>div {
    height: 1px;
    width: 27px;
    background-color: rgba(243, 245, 247, 0.3);
  }
  
  .login-form {
    margin-bottom: 29.5px;
  }

  .forgot-link {
    font-size: 14.88px;
    color: #777;
  }

  .login-btn {
    border-radius: 12px;
    background-color: #fff;
    color: #101010;
    font-size: 15px;
    height: 56px;
    font-weight: 500;
    border: none;
    margin-bottom: 19px;
  }

  button {
    transition: transform 0.1s ease-in-out; 
  }

  button:active {
    transform: scale(0.98);
  }

  input {
    height: 55px;
    background-color: #1e1e1e;
    border: 1px solid #0000;
    border-radius: 12px;
    outline: none;
    padding: 0 17px;
  }

  input::placeholder {
    font-family: inherit;
    font-size: 14.3px;
  }

  input:focus {
    border: 1px solid rgba(243, 245, 247, 0.15);
  }

  .background-container {
    height: 100vh;
    background-image: url('/bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  .login-container {
    position: fixed;
    transform: translate(-50%,-50%);
    left: 50%;
    top: 48%;
    width: 370px;
  }
}
</style>