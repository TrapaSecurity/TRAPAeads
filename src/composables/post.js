import { TRAPAPOST, getDanPost, getDorisPost } from '@/secrets/post'

import { useAuthStore } from '@/stores/auth'


export async function useGetPosts(sHandler, eHandler) {
  const authStore = useAuthStore()
  if (!authStore.isAuth) {
    sHandler([
      ...TRAPAPOST
    ])
  } else if (authStore.accessToken === 'user1') {
    sHandler([
      (await getDanPost()),
      ...TRAPAPOST
    ])
  } else if (authStore.accessToken === 'user2') {
    sHandler([
      (await getDorisPost()),
      ...TRAPAPOST
    ])
  }
}


export async function useCreatePost(content, sHandler, eHandler) {
  eHandler()
}
