<template>
  <div class="fixed right-4 bottom-16 sm:right-6 sm:bottom-6 md:right-10 md:bottom-10 h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 bg-blue-500 rounded-full flex justify-center items-center z-50">
    <!-- Chat open icon -->
    <svg @click="isOpen = true" class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white hover:cursor-pointer" aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>

    <!-- Chat box -->
    <div v-if="isOpen"
      class="fixed right-4 bottom-16 sm:right-6 sm:bottom-20 md:right-28 md:bottom-28 w-[90vw] sm:w-[400px] h-[70vh] sm:h-[500px] max-w-[400px] max-h-[600px] bg-white border flex flex-col rounded-xl shadow-lg">
      <div class="w-full h-16 sm:h-20 flex flex-row bg-blue-400 rounded-t-xl">
        <div class="flex-[5] flex flex-row items-center px-2 gap-2">
          <div class="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-white overflow-hidden flex justify-center items-center">
            <img class="w-8 h-8 sm:w-12 sm:h-12" src="/imageicon/customer icon.png" alt="user image">
          </div>
          <p class="text-white font-semibold text-lg sm:text-xl">Quản trị viên</p>
        </div>
        <!-- Chat close icon -->
        <div class="flex flex-1 justify-center items-center">
          <svg @click="isOpen = false" class="w-6 h-6 sm:w-8 sm:h-8 text-white hover:cursor-pointer" aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6" />
          </svg>
        </div>
      </div>

      <!-- Chat content -->
      <div class="flex-1 overflow-y-auto p-2 sm:p-3">
        <div v-for="msg in messages" :key="msg.id" :class="msg.sender === 'customer' ? 'text-right' : 'text-left'">
          <!-- Sender name -->
          <p class="text-xs text-gray-500 mb-1">
            {{ msg.sender === 'customer' ? 'Admin' : 'Khách hàng' }}
          </p>
          <p class="inline-block px-2 py-1 sm:px-3 sm:py-2 rounded-lg max-w-[80%] sm:max-w-[70%] break-words"
            :class="msg.sender === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'">
            {{ msg.content }}
          </p>
        </div>
      </div>

      <!-- Message input -->
      <div class="h-auto w-full border-t rounded-b-xl flex flex-row justify-start items-center p-2 bg-white">
        <textarea
          v-model="adminMessage"
          ref="textareaRef"
          rows="1"
          placeholder="Nhập tin nhắn trả lời..."
          class="resize-none overflow-hidden w-full ps-2 focus:outline-none text-sm sm:text-base"
          @input="autoResize"
          @keyup.enter="handleEnter"
        ></textarea>
        <div @click="sendAdminMessage" class="h-10 w-10 sm:h-[50px] sm:w-[50px] flex justify-center items-center hover:cursor-pointer">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M14.502 7.046h-2.5v-.928a2.122 2.122 0 0 0-1.199-1.954 1.827 1.827 0 0 0-1.984.311L3.71 8.965a2.2 2.2 0 0 0 0 3.24L8.82 16.7a1.829 1.829 0 0 0 1.985.31 2.121 2.121 0 0 0 1.199-1.959v-.928h1a2.025 2.025 0 0 1 1.999 2.047V19a1 1 0 0 0 1.275.961 6.59 6.59 0 0 0 4.662-7.22 6.593 6.593 0 0 0-6.437-5.695Z" />
          </svg>
        </div>  
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import api from '../../services/api'

const isOpen = ref(false)
const adminMessage = ref('')
const textareaRef = ref(null)
const messages = ref([])

const sendAdminMessage = async () => {
  const trimmed = adminMessage.value.trim()
  if (!trimmed) return

  const body = {
    id_customer: 1,
    id_user: 2,
    message: trimmed
  }

  try {
    await api.post('/chat/reply-message', body, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      }
    })
    adminMessage.value = ''
    await getMessages()
  } catch (err) {
    console.error('Error sending admin message:', err)
  }
}

const handleEnter = (e) => {
  if (!e.shiftKey) {
    e.preventDefault()
    sendAdminMessage()
  }
}

const autoResize = () => {
  const textarea = textareaRef.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
}

const getMessages = async () => {
  const res = await api.get(`/chat/get-messages/1/2`, {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    }
  })
  messages.value = res.data.messages
  nextTick(() => scrollToBottom())
}

const scrollToBottom = () => {
  const chatContent = document.querySelector('.overflow-y-auto')
  if (chatContent) {
    chatContent.scrollTop = chatContent.scrollHeight
  }
}

onMounted(() => {
  getMessages()
})
</script>

<style scoped>
/* Base styles */
.overflow-y-auto {
  scroll-behavior: smooth; /* Smooth scrolling for chat content */
}

/* Chat button */
.fixed.right-4.bottom-16 {
  right: 1rem;
  bottom: 4rem;
  width: 3rem; /* h-12, w-12 */
  height: 3rem;
  z-index: 9999; /* Ensure button is on top of all elements */
}

/* Chat window */
.fixed.right-4.bottom-16.w-\[90vw\] {
  right: 1rem;
  bottom: 8rem;
  width: 90vw;
  max-width: 400px;
  height: 70vh;
  max-height: 600px;
  z-index: 9999; /* Ensure chat window is on top of all elements */
}

/* Text and padding */
.text-lg {
  font-size: 1.125rem;
}

.text-sm {
  font-size: 0.875rem;
}

.text-xs {
  font-size: 0.75rem;
}

.p-2 {
  padding: 0.5rem;
}

.px-2.py-1 {
  padding: 0.25rem 0.5rem;
}

/* Icons and images */
.w-12.h-12 {
  width: 3rem;
  height: 3rem;
}

.w-8.h-8 {
  width: 2rem;
  height: 2rem;
}

.w-6.h-6 {
  width: 1.5rem;
  height: 1.5rem;
}

.w-5.h-5 {
  width: 1.25rem;
  height: 1.25rem;
}

/* Large screens (1024px and above) */
@media (min-width: 1024px) {
  .fixed.right-4.bottom-16 {
    right: 2rem;
    bottom: 2rem;
    width: 4rem;
    height: 4rem;
    z-index: 9999;
  }

  .fixed.right-4.bottom-16.w-\[90vw\] {
    right: 6rem;
    bottom: 6rem;
    width: 450px;
    height: 600px;
    z-index: 9999;
  }

  .text-lg {
    font-size: 1.25rem;
  }

  .text-sm {
    font-size: 1rem;
  }

  .text-xs {
    font-size: 0.875rem;
  }

  .p-2 {
    padding: 0.75rem;
  }

  .px-2.py-1 {
    padding: 0.5rem 0.75rem;
  }

  .w-12.h-12 {
    width: 4rem;
    height: 4rem;
  }

  .w-8.h-8 {
    width: 3rem;
    height: 3rem;
  }
}

/* Tablets (640px to 1023px) */
@media (max-width: 1023px) and (min-width: 640px) {
  .fixed.right-4.bottom-16 {
    right: 1.5rem;
    bottom: 1.5rem;
    width: 3.5rem;
    height: 3.5rem;
    z-index: 9999;
  }

  .fixed.right-4.bottom-16.w-\[90vw\] {
    right: 1.5rem;
    bottom: 6rem;
    width: 400px;
    height: 500px;
    max-height: 550px;
    z-index: 9999;
  }

  .text-lg {
    font-size: 1.125rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .text-xs {
    font-size: 0.75rem;
  }

  .p-2 {
    padding: 0.5rem;
  }

  .px-2.py-1 {
    padding: 0.375rem 0.625rem;
  }

  .w-12.h-12 {
    width: 3.5rem;
    height: 3.5rem;
  }

  .w-8.h-8 {
    width: 2.5rem;
    height: 2.5rem;
  }
}

/* Small mobile devices (480px and below) */
@media (max-width: 480px) {
  .fixed.right-4.bottom-16 {
    right: 1rem;
    bottom: 1rem;
    width: 2.75rem;
    height: 2.75rem;
    z-index: 9999;
  }

  .fixed.right-4.bottom-16.w-\[90vw\] {
    right: 1rem;
    bottom: 5rem;
    width: 95vw;
    max-width: 340px;
    height: 60vh;
    max-height: 450px;
    z-index: 9999;
  }

  .h-16 {
    height: 3rem;
  }

  .text-lg {
    font-size: 1rem;
  }

  .text-sm {
    font-size: 0.875rem;
  }

  .text-xs {
    font-size: 0.7rem;
  }

  .p-2 {
    padding: 0.4rem;
  }

  .px-2.py-1 {
    padding: 0.25rem 0.5rem;
  }

  .w-12.h-12 {
    width: 2.5rem;
    height: 2.5rem;
  }

  .w-8.h-8 {
    width: 1.75rem;
    height: 1.75rem;
  }

  .w-6.h-6 {
    width: 1.25rem;
    height: 1.25rem;
  }

  .w-5.h-5 {
    width: 1.125rem;
    height: 1.125rem;
  }
}

/* Very small devices (360px and below) */
@media (max-width: 360px) {
  .fixed.right-4.bottom-16 {
    right: 0.75rem;
    bottom: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;
    z-index: 9999;
  }

  .fixed.right-4.bottom-16.w-\[90vw\] {
    right: 0.75rem;
    bottom: 4rem;
    width: 95vw;
    max-width: 300px;
    height: 55vh;
    max-height: 400px;
    z-index: 9999;
  }

  .text-lg {
    font-size: 0.9rem;
  }

  .text-sm {
    font-size: 0.8rem;
  }

  .text-xs {
    font-size: 0.65rem;
  }

  .p-2 {
    padding: 0.3rem;
  }

  .px-2.py-1 {
    padding: 0.2rem 0.4rem;
  }

  .w-12.h-12 {
    width: 2.25rem;
    height: 2.25rem;
  }

  .w-8.h-8 {
    width: 1.5rem;
    height: 1.5rem;
  }
}
</style>