import { useAuthStore } from '@/stores/auth'


export async function useLogin(username, password, authCode, sHandler, eHandler) {
  if (username === 'dan' && password === 'p@ssw0rd')
    sHandler('dan')
  else if (username == 'Doris3127' && password === '$v1%a3D43w#' && authCode === '128803')
    sHandler('Doris3127')
  else if (username == 'Doris3127' && password === '$v1%a3D43w#')
    eHandler('Doris3127')
  else
    eHandler('wrong')
}


export async function useRegister(username, password, sHandler, eHandler) {
  eHandler()
}


export async function useGetProfile(sHandler, eHandler) {
  const authStore = useAuthStore()
  console.log(authStore.accessToken)
  sHandler(authStore.accessToken)
}
