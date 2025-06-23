import { watch } from 'vue'

import { useAuthStore } from '@/stores/auth'


export function useLogout() {
  const authStore = useAuthStore()
  authStore.unset()
  return { name: 'login' }
}


export function useLocalStorage(variable, key) {
  watch(variable, (newVal) => {
    if (newVal === null)
      localStorage.removeItem(key)
    else
      localStorage.setItem(key, newVal)
  })
}
