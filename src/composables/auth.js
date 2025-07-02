import SHA256 from 'crypto-js/sha256'
import user from '@/secrets/user'

import { useAuthStore } from '@/stores/auth'


export async function useLogin(username, password, authCode, sHandler, eHandler) {
  console.log(SHA256(username).toString())
  let husername = SHA256(username).toString()
  let hpassword = SHA256(password).toString()
  let hauthCode = SHA256(authCode).toString()
  if (husername === user.user1.username && hpassword === user.user1.password)
    sHandler('user1')
  else if (husername == user.user2.username && hpassword === user.user2.password && hauthCode === user.user2.authCode)
    sHandler('user2')
  else if (husername == user.user2.username && hpassword === user.user2.password)
    eHandler('user2')
  else
    eHandler('Wrong')
}


export async function useRegister(username, password, sHandler, eHandler) {
  eHandler()
}


export async function useGetProfile(sHandler, eHandler) {
  const authStore = useAuthStore()
  if (authStore.accessToken === 'user1')
    sHandler('dan')
  else if (authStore.accessToken === 'user2')
    sHandler('Doris3127')
}
