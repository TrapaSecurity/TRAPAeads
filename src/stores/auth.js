import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useLocalStorage } from '@/composables/utils'


export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('auth.accessToken'))
  useLocalStorage(accessToken, 'auth.accessToken')

  const isAuth = computed(() => accessToken.value !== null)

  function set(accessTokenVal) {
    accessToken.value = accessTokenVal
  }

  function unset() {
    accessToken.value = null
  }

  return { accessToken, isAuth, set, unset }
})
