import { jwtVerify, importSPKI } from 'jose'
import user from '@/secrets/user'
import key from '@/secrets/key'

import { useAuthStore } from '@/stores/auth'


function base64url(source) {
  let encodedSource = btoa(JSON.stringify(source));
  return encodedSource.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}


async function RS256Verify(message, sig, pubKey) {
  const jwt = base64url({ alg: 'RS256' }) + '.' + base64url({ message }) + '.' + sig
  try {
    const { payload, protectedHeader } = await jwtVerify(jwt, pubKey, { algorithms: ['RS256'] })
    return true
  } catch (err) {
    return false
  }
}


export async function useLogin(username, password, authCode, sHandler, eHandler) {
  const pubKey = await importSPKI(key.pubKey, 'RS256')
  if (await RS256Verify(username, user.user1.username, pubKey) && await RS256Verify(password, user.user1.password, pubKey))
    sHandler('user1')
  else if (await RS256Verify(username, user.user2.username, pubKey) && await RS256Verify(password, user.user2.password, pubKey) && await RS256Verify(authCode, user.user2.authCode, pubKey))
    sHandler('user2')
  else if (await RS256Verify(username, user.user2.username, pubKey) && await RS256Verify(password, user.user2.password, pubKey))
    eHandler('user2')
  else
    eHandler('Wrong')
}


export async function useRegister(username, password, sHandler, eHandler) {
  eHandler()
}


export async function useGetProfile(sHandler, eHandler) {
  const authStore = useAuthStore()
  sHandler(authStore.username)
}
