import { useAuthStore } from '@/stores/auth'
import { useFetch } from '@/composables/auth'
import { useGetAPIURL } from '@/composables/utils'


export async function useGetPosts(sHandler, eHandler) {
  const authStore = useAuthStore()
  if (!authStore.isAuth) {
    sHandler([
      {
        id: 1, likes: 5892,
        content: "!!! TRAPA Security Advertisement !!!",
        create_time: "2025-06-23T05:38:22.121Z",
        author_name: "TRAPA.Security"
      }
    ])
  } else if (authStore.accessToken === 'dan') {
    sHandler([
      {
        id: 2, likes: 1,
        content: "偷偷把秘密藏在私人的貼文，應該沒有人會發現吧 👀\n\nTRAPA{DanDaDanDanD4DanDanDaDan}",
        create_time: "2025-06-22T06:09:22.131Z",
        author_name: "dan"
      },
      {
        id: 1, likes: 5892,
        content: "!!! TRAPA Security Advertisement !!!",
        create_time: "2025-06-22T05:38:22.121Z",
        author_name: "TRAPA.Security"
      }
    ])
  } else if (authStore.accessToken === 'Doris3127') {
    sHandler([
      {
        id: 3, likes: 1,
        content: "偷偷把秘密藏在私人的貼文，應該沒有人會發現吧，而且我還有開 2FA 耶 👀\n\nTRAPA{比起 Doris 我更喜歡 Doritos}",
        create_time: "2025-06-22T13:58:22.131Z",
        author_name: "Doris3127"
      },
      {
        id: 1, likes: 5892,
        content: "!!! TRAPA Security Advertisement !!!",
        create_time: "2025-06-22T05:38:22.121Z",
        author_name: "TRAPA.Security"
      }
    ])
  }
}


export async function useCreatePost(content, sHandler, eHandler) {
  eHandler()
}