<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useGetPosts, useCreatePost } from '@/composables/post'
import { useGetProfile } from '@/composables/auth'

import Nav from '@/components/Nav.vue'


const authStore = useAuthStore()

const currUser = ref('')
const postContent = ref('')
const posts = ref([])


async function post() {
  await useCreatePost(postContent.value, async () => {
    await useGetPosts((data) => {
      posts.value.length = 0
      data = data.map(post => {
        let parsedPost = { id: post.id, content: post.content.replace(/\n/g, '<br>'), likes: post.likes, createTime: post.create_time, author: post.author_name }
        parsedPost.createTime = Math.trunc(((new Date()) - (new Date(parsedPost.createTime))) / 3600000)
        return parsedPost
      })
      posts.value.push(...data)
      posts.value.sort((a, b) => (b.id - a.id))
    })
    postContent.value = ''
  })
}


onMounted(async () => {
  await useGetPosts((data) => {
    data = data.map(post => {
      let parsedPost = { id: post.id, content: post.content, likes: post.likes, createTime: post.create_time, author: post.author_name }
      parsedPost.createTime = Math.trunc(((new Date()) - (new Date(parsedPost.createTime))) / 3600000)
      return parsedPost
    })
    posts.value.push(...data)
    posts.value.sort((a, b) => (b.id - a.id))
  })
  if (authStore.isAuth) {
    await useGetProfile((data) => {
      currUser.value = data.username
    })
  }
})
</script>

<template>
  <div class="position-relative">
    <div>
      <Nav></Nav>
    </div>
    <div class="d-none d-md-flex flex-column align-items-center">
      <div class="d-flex align-items-start" style="gap: 12px;">
        <div class="all-content-container ms-5" style="min-height: 100vh;">
          <div class="title-container container-fluid d-flex justify-content-center align-items-center">
            <p class="m-0">Home</p>
          </div>
          <div class="contents-container container-fluid">
            <div v-if="authStore.isAuth" class="content-container position-relative d-flex align-items-start justify-content-start" style="padding-bottom: 5px;">
              <div class="position-absolute end-0 top-0 mt-2 me-2 cursor-pointer">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 11.25C10.6904 11.25 11.25 10.6904 11.25 10C11.25 9.30964 10.6904 8.75 10 8.75C9.30964 8.75 8.75 9.30964 8.75 10C8.75 10.6904 9.30964 11.25 10 11.25Z" fill="#777777"/>
                  <path d="M5 11.25C5.69036 11.25 6.25 10.6904 6.25 10C6.25 9.30964 5.69036 8.75 5 8.75C4.30964 8.75 3.75 9.30964 3.75 10C3.75 10.6904 4.30964 11.25 5 11.25Z" fill="#777777"/>
                  <path d="M15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="#777777"/>
                </svg>
              </div>
              <div class="icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
              </div>
              <div>
                <div class="content-info d-flex align-items-center justify-content-start gap-3">
                  <h5 class="m-0">{{ currUser }}</h5>
                </div>
                <div class="position-relative">
                  <textarea v-model="postContent" class="content" style="width: 480px;; border: none; background-color: transparent; outline: none; resize: none;" placeholder="What's new?"></textarea>
                  <button @click="post" class="position-absolute top-0 z-2" style="border: 0.5px solid rgba(243, 245, 247, 0.15); border-radius: 6px; background-color: rgba(24, 24, 24, 0.7); padding: 3px 12px; font-size: 13px; right: -12px;">Post</button>
                </div>
              </div>
            </div>
            <template v-for="post in posts">
              <div class="content-container position-relative d-flex align-items-start justify-content-start">
                <div class="position-absolute end-0 top-0 mt-2 me-2 cursor-pointer">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 11.25C10.6904 11.25 11.25 10.6904 11.25 10C11.25 9.30964 10.6904 8.75 10 8.75C9.30964 8.75 8.75 9.30964 8.75 10C8.75 10.6904 9.30964 11.25 10 11.25Z" fill="#777777"/>
                    <path d="M5 11.25C5.69036 11.25 6.25 10.6904 6.25 10C6.25 9.30964 5.69036 8.75 5 8.75C4.30964 8.75 3.75 9.30964 3.75 10C3.75 10.6904 4.30964 11.25 5 11.25Z" fill="#777777"/>
                    <path d="M15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="#777777"/>
                  </svg>
                </div>
                <div class="icon-container">
                  <svg v-if="post.author !== 'TRAPA.Security'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                  </svg>
                  <div v-else class="d-flex justify-content-center align-items-center" style="width: 38px; height: 38px; border: 1px solid #777; border-radius: 50%;">
                    <img src="/logo.png" width="38">
                  </div>
                </div>
                <div>
                  <div class="content-info d-flex align-items-center justify-content-start gap-3">
                    <h5 class="m-0">{{ post.author }}</h5>
                    <p class="m-0">{{ post.createTime }}h</p>
                  </div>
                  <div>
                    <p class="content mb-1" style="white-space: pre-line;">{{ post.content }}</p>
                  </div>
                  <div class="actions-container d-flex align-items-end justify-content-start">
                    <div class="cursor-pointer d-flex justify-content-start align-items-center gap-1">
                      <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.49306 6.36803V6.37823C1.49305 6.93565 1.49302 7.73658 1.84567 8.7287C2.19945 9.72397 2.88918 10.8643 4.19646 12.1715C6.21415 14.1893 8.42339 15.8016 9.25986 16.3885C9.70584 16.7014 10.2953 16.7014 10.7412 16.3884C11.5774 15.8014 13.786 14.1892 15.8036 12.1715C17.1108 10.8643 17.8006 9.72397 18.1543 8.7287C18.507 7.7366 18.507 6.93565 18.5069 6.37823V6.36803C18.5069 3.81626 16.761 1.61108 14.0624 1.61108C12.8016 1.61108 11.8259 2.20268 11.1025 2.94971C10.6557 3.41122 10.2928 3.94342 10 4.46145C9.70717 3.94342 9.34435 3.41122 8.89747 2.94971C8.17414 2.20268 7.19846 1.61108 5.9375 1.61108C3.239 1.61108 1.49306 3.81626 1.49306 6.36803Z" stroke="#CCCCCC" stroke-width="1.38889"/>
                      </svg>
                      <p class="mb-0 user-select-none">{{ post.likes }}</p>
                    </div>
                    <div class="cursor-pointer">
                      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.4644 13.6863L17.4757 17.6617L13.5029 16.6498C13.4668 16.6498 13.3946 16.6498 13.3584 16.6498C12.0221 17.4087 10.433 17.7701 8.7355 17.6617C4.87104 17.3725 1.6928 14.2645 1.29552 10.3975C0.789889 5.26575 5.08774 0.96513 10.2163 1.47109C14.0808 1.86862 17.1868 5.01277 17.4757 8.91586C17.6201 10.6144 17.2229 12.2045 16.4644 13.5418C16.4644 13.614 16.4644 13.6502 16.4644 13.6863Z" stroke="#CCCCCC" stroke-width="1.38889" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <div class="cursor-pointer">
                      <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.50506 1.37251C7.75211 1.07914 8.1902 1.04159 8.48356 1.28864L11.4523 3.78864C11.6047 3.91692 11.6946 4.10444 11.6992 4.30355C11.7039 4.50265 11.6229 4.69417 11.4767 4.82946L8.50797 7.5774C8.22651 7.83794 7.78714 7.82097 7.52662 7.5395C7.26609 7.25804 7.28305 6.81867 7.56452 6.55814L9.23244 5.01427H6.16124C4.47371 5.01427 3.10569 6.38229 3.10569 8.06983V10.5698V13.0698C3.10569 14.7574 4.47371 16.1254 6.16124 16.1254C6.54478 16.1254 6.85569 16.4363 6.85569 16.8198C6.85569 17.2034 6.54478 17.5143 6.16124 17.5143C3.70665 17.5143 1.7168 15.5244 1.7168 13.0698V10.5698V8.06983C1.7168 5.61522 3.70665 3.62538 6.16124 3.62538H9.10224L7.58893 2.35101C7.29556 2.10397 7.25801 1.66588 7.50506 1.37251Z" fill="#CCCCCC"/>
                        <path d="M13.2549 19.7671C13.0079 20.0605 12.5698 20.0981 12.2765 19.851L9.30769 17.351C9.15535 17.2227 9.06542 17.0352 9.06075 16.8361C9.05609 16.637 9.13712 16.4455 9.28328 16.3102L12.252 13.5622C12.5335 13.3017 12.9729 13.3186 13.2333 13.6002C13.4939 13.8816 13.4769 14.321 13.1955 14.5815L11.5276 16.1254H14.5988C16.2863 16.1254 17.6543 14.7573 17.6543 13.0699V10.5698V8.06981C17.6543 6.38228 16.2863 5.01425 14.5988 5.01425C14.2152 5.01425 13.9043 4.70334 13.9043 4.31981C13.9043 3.93629 14.2152 3.62537 14.5988 3.62537C17.0533 3.62537 19.0432 5.61522 19.0432 8.06981V10.5698V13.0699C19.0432 15.5244 17.0533 17.5143 14.5988 17.5143H11.6578L13.1711 18.7886C13.4645 19.0356 13.502 19.4737 13.2549 19.7671Z" fill="#CCCCCC"/>
                      </svg>
                    </div>
                    <div class="cursor-pointer">
                      <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.9897 4.09082L7.0304 9.11104" stroke="#CCCCCC" stroke-width="1.25" stroke-linejoin="round"/>
                        <path d="M8.17128 14.439C8.38463 15.3275 8.49131 15.7718 8.71426 15.932C8.90764 16.071 9.15617 16.1081 9.38173 16.0318C9.64179 15.9438 9.87373 15.5501 10.3376 14.7628L15.9244 5.2809C16.2683 4.69727 16.4403 4.40546 16.4165 4.16566C16.3959 3.95653 16.2871 3.76612 16.1174 3.64215C15.9228 3.5 15.5841 3.5 14.9067 3.5H4.09404C3.19451 3.5 2.74474 3.5 2.53744 3.67754C2.35758 3.83158 2.26253 4.06254 2.28186 4.29856C2.30415 4.57059 2.62363 4.88716 3.26259 5.52032L6.49593 8.7243C6.64394 8.87097 6.71795 8.94431 6.77784 9.02755C6.831 9.10144 6.8758 9.18101 6.91142 9.26479C6.95153 9.35916 6.97586 9.46047 7.02451 9.66309L8.17128 14.439Z" stroke="#CCCCCC" stroke-width="1.25" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="position-sticky top-0" v-if="!authStore.isAuth">
          <div class="login-container">
            <h2 class="text-center">Log in for TRAPAeads</h2>
            <p class="desc text-center">See what people are talking about and join the conversation.</p>
            <RouterLink :to="{ name: 'login' }" class="text-decoration-none other container-fluid d-flex align-items-center cursor-pointer" style="color: #f3f5f7;">
                <img src="/logo.png" width="24">
                <p class="m-0">Continue with TRAPAgram</p>
            </RouterLink>
            <RouterLink :to="{ name: 'login' }" class="text-decoration-none" style="color: #777;">
              <p class="login-link text-center">Log in with username instead</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="d-md-none" style="padding-top: 74px;">
      <div class="container-fluid head z-3 position-fixed top-0 start-0 end-0 d-flex justify-content-center align-items-center">
        <img src="/logo.png" width="48">
      </div>
      <div class="contents-container container-fluid px-0" style="min-height: 80vh;">
        <template v-for="post in posts">
          <div class="content-container position-relative d-flex align-items-start justify-content-start">
            <div class="position-absolute end-0 top-0 mt-2 me-2 cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 11.25C10.6904 11.25 11.25 10.6904 11.25 10C11.25 9.30964 10.6904 8.75 10 8.75C9.30964 8.75 8.75 9.30964 8.75 10C8.75 10.6904 9.30964 11.25 10 11.25Z" fill="#777777"/>
                <path d="M5 11.25C5.69036 11.25 6.25 10.6904 6.25 10C6.25 9.30964 5.69036 8.75 5 8.75C4.30964 8.75 3.75 9.30964 3.75 10C3.75 10.6904 4.30964 11.25 5 11.25Z" fill="#777777"/>
                <path d="M15 11.25C15.6904 11.25 16.25 10.6904 16.25 10C16.25 9.30964 15.6904 8.75 15 8.75C14.3096 8.75 13.75 9.30964 13.75 10C13.75 10.6904 14.3096 11.25 15 11.25Z" fill="#777777"/>
              </svg>
            </div>
            <div class="icon-container">
                <svg v-if="post.author !== 'TRAPA.Security'" xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                  <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                </svg>
                <div v-else class="d-flex justify-content-center align-items-center" style="width: 38px; height: 38px; border: 1px solid #777; border-radius: 50%;">
                  <img src="/logo.png" width="38">
                </div>
              </div>
            <div>
              <div class="content-info d-flex align-items-center justify-content-start gap-3">
                <h5 class="m-0">{{ post.author }}</h5>
                <p class="m-0">{{ post.createTime }}h</p>
              </div>
              <div>
                <p class="content mb-1">{{ post.content }}</p>
              </div>
              <div class="actions-container d-flex align-items-end justify-content-start">
                <div class="d-flex justify-content-start align-items-center gap-1">
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.49306 6.36803V6.37823C1.49305 6.93565 1.49302 7.73658 1.84567 8.7287C2.19945 9.72397 2.88918 10.8643 4.19646 12.1715C6.21415 14.1893 8.42339 15.8016 9.25986 16.3885C9.70584 16.7014 10.2953 16.7014 10.7412 16.3884C11.5774 15.8014 13.786 14.1892 15.8036 12.1715C17.1108 10.8643 17.8006 9.72397 18.1543 8.7287C18.507 7.7366 18.507 6.93565 18.5069 6.37823V6.36803C18.5069 3.81626 16.761 1.61108 14.0624 1.61108C12.8016 1.61108 11.8259 2.20268 11.1025 2.94971C10.6557 3.41122 10.2928 3.94342 10 4.46145C9.70717 3.94342 9.34435 3.41122 8.89747 2.94971C8.17414 2.20268 7.19846 1.61108 5.9375 1.61108C3.239 1.61108 1.49306 3.81626 1.49306 6.36803Z" stroke="#CCCCCC" stroke-width="1.38889"/>
                  </svg>
                  <p class="mb-0">{{ post.likes }}</p>
                </div>
                <div>
                  <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4644 13.6863L17.4757 17.6617L13.5029 16.6498C13.4668 16.6498 13.3946 16.6498 13.3584 16.6498C12.0221 17.4087 10.433 17.7701 8.7355 17.6617C4.87104 17.3725 1.6928 14.2645 1.29552 10.3975C0.789889 5.26575 5.08774 0.96513 10.2163 1.47109C14.0808 1.86862 17.1868 5.01277 17.4757 8.91586C17.6201 10.6144 17.2229 12.2045 16.4644 13.5418C16.4644 13.614 16.4644 13.6502 16.4644 13.6863Z" stroke="#CCCCCC" stroke-width="1.38889" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div>
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.50506 1.37251C7.75211 1.07914 8.1902 1.04159 8.48356 1.28864L11.4523 3.78864C11.6047 3.91692 11.6946 4.10444 11.6992 4.30355C11.7039 4.50265 11.6229 4.69417 11.4767 4.82946L8.50797 7.5774C8.22651 7.83794 7.78714 7.82097 7.52662 7.5395C7.26609 7.25804 7.28305 6.81867 7.56452 6.55814L9.23244 5.01427H6.16124C4.47371 5.01427 3.10569 6.38229 3.10569 8.06983V10.5698V13.0698C3.10569 14.7574 4.47371 16.1254 6.16124 16.1254C6.54478 16.1254 6.85569 16.4363 6.85569 16.8198C6.85569 17.2034 6.54478 17.5143 6.16124 17.5143C3.70665 17.5143 1.7168 15.5244 1.7168 13.0698V10.5698V8.06983C1.7168 5.61522 3.70665 3.62538 6.16124 3.62538H9.10224L7.58893 2.35101C7.29556 2.10397 7.25801 1.66588 7.50506 1.37251Z" fill="#CCCCCC"/>
                    <path d="M13.2549 19.7671C13.0079 20.0605 12.5698 20.0981 12.2765 19.851L9.30769 17.351C9.15535 17.2227 9.06542 17.0352 9.06075 16.8361C9.05609 16.637 9.13712 16.4455 9.28328 16.3102L12.252 13.5622C12.5335 13.3017 12.9729 13.3186 13.2333 13.6002C13.4939 13.8816 13.4769 14.321 13.1955 14.5815L11.5276 16.1254H14.5988C16.2863 16.1254 17.6543 14.7573 17.6543 13.0699V10.5698V8.06981C17.6543 6.38228 16.2863 5.01425 14.5988 5.01425C14.2152 5.01425 13.9043 4.70334 13.9043 4.31981C13.9043 3.93629 14.2152 3.62537 14.5988 3.62537C17.0533 3.62537 19.0432 5.61522 19.0432 8.06981V10.5698V13.0699C19.0432 15.5244 17.0533 17.5143 14.5988 17.5143H11.6578L13.1711 18.7886C13.4645 19.0356 13.502 19.4737 13.2549 19.7671Z" fill="#CCCCCC"/>
                  </svg>
                </div>
                <div>
                  <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.9897 4.09082L7.0304 9.11104" stroke="#CCCCCC" stroke-width="1.25" stroke-linejoin="round"/>
                    <path d="M8.17128 14.439C8.38463 15.3275 8.49131 15.7718 8.71426 15.932C8.90764 16.071 9.15617 16.1081 9.38173 16.0318C9.64179 15.9438 9.87373 15.5501 10.3376 14.7628L15.9244 5.2809C16.2683 4.69727 16.4403 4.40546 16.4165 4.16566C16.3959 3.95653 16.2871 3.76612 16.1174 3.64215C15.9228 3.5 15.5841 3.5 14.9067 3.5H4.09404C3.19451 3.5 2.74474 3.5 2.53744 3.67754C2.35758 3.83158 2.26253 4.06254 2.28186 4.29856C2.30415 4.57059 2.62363 4.88716 3.26259 5.52032L6.49593 8.7243C6.64394 8.87097 6.71795 8.94431 6.77784 9.02755C6.831 9.10144 6.8758 9.18101 6.91142 9.26479C6.95153 9.35916 6.97586 9.46047 7.02451 9.66309L8.17128 14.439Z" stroke="#CCCCCC" stroke-width="1.25" stroke-linejoin="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>

    <RouterLink :to="{ name: 'login' }" v-if="!authStore.isAuth">
      <div>
        <button class="login-btn mt-md-4 me-4 position-fixed top-0 end-0 z-3">Log in</button>
      </div>
    </RouterLink>
    <RouterLink :to="{ name: 'logout' }" v-else>
      <div>
        <button class="login-btn mt-md-4 me-4 position-fixed top-0 end-0 z-3">Log out</button>
      </div>
    </RouterLink>

    <div class="footer d-flex align-items-center flex-wrap">
      <p class="m-0">&copy; 2025</p>
      <p class="m-0">TRAPAeads Terms</p>
      <p class="m-0">Privacy Policy</p>
      <p class="m-0">Cookies Policy</p>
      <p class="m-0">Report a problem</p>
    </div>
  </div>
</template>

<style scoped>
.login-btn {
  display: none;
}

.other {
  transition: transform 0.1s ease-in-out; 
}

.other:active {
  transform: scale(0.98);
}

@media (max-width: 767px) {
  .contents-container {
    padding-bottom: 70px;
    margin-bottom: 68px;
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

  .content-container {
    gap: 12px;
    padding: 16px 24.5px;
    border-bottom: 0.5px solid rgba(243, 245, 247, 0.15);
  }

  .login-btn {
    margin-top: 19px;
  }

  .head {
    height: 74px;
    background-color: rgba(10, 10, 10, 0.85);
    backdrop-filter: blur(28.5px);
  }

  .actions-container>div:nth-child(1) {
    width: 64px;
  }

  .actions-container>div:nth-child(1) p {
    font-size: 12.5px;
    color: #ccc;
  }

  .actions-container>div {
    width: 48px;
  }

  .content {
    font-size: 15px;
  }

  .content-info {
    margin-bottom: 3px;
  }

  .content-info>h5 {
    font-size: 15px;
    font-weight: 500;
    color: #f3f5f7;
  }

  .content-info>p {
    font-size: 14.7px;
    color: #777;
  }

  .icon-container {
    width: 36px;
    height: 36px;
  }
}

@media (max-width: 1091px) {
  .login-container {
    display: none;
  }

  .login-btn {
    display: block;
    font-size: 15px;
    font-weight: 500;
    background-color: #f3f5f7;
    border: none;
    color: #000;
    padding: 6px 18px;
    border-radius: 9px;
  }
}

@media (min-width: 768px) {
  .login-container>.login-link {
    font-size: 15px;
    color: #777 !important;
    margin-bottom: 30.5px;
  }

  .login-container>.other {
    height: 80px;
    background-color: #101010;
    border-radius: 24px;
    border: none;
    padding: 28px;
    gap: 14px;
    margin-bottom: 25.5px;
  }

  .login-container>.other>p {
    font-size: 15px;
    font-weight: 500;
  }

  .login-container>.desc {
    font-size: 15px;
    color: #777;
  }

  .login-container>h2 {
    font-size: 20px;
    color: #f3f5f7;
    margin-top: 32.5px;
    margin-bottom: 12px;
    font-weight: 500;
  }

  .login-container {
    width: 337px;
    border: 1px solid rgba(243, 245, 247, 0.15);
    background-color: #1e1e1e;
    margin-top: 60px;
    border-radius: 24px;
    padding: 0 24px;
  }

  .footer {
    bottom: 15.5px;
    width: 424px;
    justify-content: space-between;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
  }

  .footer>p {
    font-size: 12px;
    color: #777;
  }

  .actions-container>div:nth-child(1) {
    width: 64px;
  }

  .actions-container>div:nth-child(1) p {
    font-size: 12.5px;
    color: #ccc;
  }

  .actions-container>div {
    width: 48px;
  }

  .content {
    font-size: 15px;
  }

  .content-info {
    margin-bottom: 3px;
  }

  .content-info>h5 {
    font-size: 15px;
    font-weight: 500;
    color: #f3f5f7;
  }

  .content-info>p {
    font-size: 14.7px;
    color: #777;
  }

  .icon-container {
    width: 36px;
    height: 36px;
  }

  .content-container {
    gap: 12px;
    padding: 16px 24.5px;
    border-bottom: 0.5px solid rgba(243, 245, 247, 0.15);
  }

  .content-container:last-child {
    border-bottom: none;
  }

  .contents-container {
    background-color: #181818;
    border: 0.5px solid #2d2d2d;
    border-top-left-radius: 24px;
    border-top-right-radius: 24px;
    margin-bottom: 70px;
  }

  .title-container {
    height: 60px;
  }

  .title-container>p {
    font-size: 15px;
    font-weight: 500;
  }

  .all-content-container {
    width: 640px;
  }
}
</style>
