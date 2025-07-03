import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useLocalStorage } from '@/composables/utils'


export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('auth.accessToken'))
  const username = ref('')
  const password = ref('')
  const authCode = ref('')
  useLocalStorage(accessToken, 'auth.accessToken')
  useLocalStorage(username, 'auth.username')
  useLocalStorage(password, 'auth.password')
  useLocalStorage(authCode, 'auth.authCode')

  const isAuth = computed(() => accessToken.value !== null)

  function set(accessTokenVal) {
    accessToken.value = accessTokenVal
  }

  function unset() {
    accessToken.value = null
    username.value = ''
    password.value = ''
    authCode.value = ''
  }

  return { accessToken, username, password, authCode, isAuth, set, unset }
})
