<template>
  <div class="fixed right-4 !bottom-[70px] md:!bottom-32 w-10 h-10 md:h-16 md:w-16 bg-blue-500 rounded-full flex justify-center items-center md:h-16 md:w-16">
    <!-- Icon mở chat -->
    <img @click="isOpen = true" class="rounded-full hover:cursor-pointer w-full h-full"
      src="/imageicon/bot icon.png" alt="bot icon" />

    <!-- Hộp chat -->
    <div v-if="isOpen"
    class="fixed right-4 bottom-16 w-[85vw] max-w-[300px] h-[60vh] max-h-[400px] bg-white border flex flex-col shadow-lg rounded-xl md:right-8 md:w-[300px] md:h-[400px] z-50">
      
      <!-- Header -->
      <div class="w-full h-16 bg-blue-400 rounded-t-xl flex flex-row items-center md:h-20">
        <div class="flex-[5] flex flex-row items-center px-2 gap-2">
          <div class="w-12 h-12 rounded-full bg-white overflow-hidden flex justify-center items-center md:w-16 md:h-16">
            <img class="w-full h-full" src="/imageicon/bot icon.png" alt="bot icon" />
          </div>
          <p class="text-white font-semibold text-lg md:text-xl">Chat với AI</p>
        </div>
        <div class="flex flex-1 justify-center items-center">
          <svg @click="isOpen = false" class="w-6 h-6 text-white hover:cursor-pointer md:w-8 md:h-8" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6" />
          </svg>
        </div>
      </div>

      <!-- Nút chat nhanh -->
      <div class="p-2 border-b flex justify-around gap-2 bg-gray-50 flex-wrap">
        <button @click="quickChat('Xin chào! Tôi cần hỗ trợ.')"
          class="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 transition text-sm md:px-3 md:text-base">Xin chào!</button>
        <button @click="quickChat('tư vấn món ăn ')"
          class="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 transition text-sm md:px-3 md:text-base">Tư vấn món ăn</button>
        <button @click="quickChat('Tôi muốn liên hệ với nhân viên hỗ trợ.')"
          class="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 transition text-sm md:px-3 md:text-base">Liên hệ hỗ trợ</button>
      </div>

      <!-- Nội dung chat -->
      <div class="flex-1 overflow-y-auto p-2 space-y-2">
        <div v-for="(msg, index) in messages" :key="index" :class="msg.sender === 'user' ? 'text-right' : 'text-left'">
          <!-- Hiển thị đang gõ -->
          <div v-if="msg.typing" class="bg-gray-200 text-black inline-block p-2 rounded-xl typing-indicator">
            <span>.</span><span>.</span><span>.</span>
          </div>
          <!-- Hiển thị tin nhắn -->
          <div v-else
            :class="msg.sender === 'user' ? 'bg-blue-200 text-black inline-block p-2 rounded-xl' : 'bg-gray-200 text-black inline-block p-2 rounded-xl'">
            <div v-html="formatMessage(msg.text)"></div>
          </div>
        </div>
      </div>

      <!-- Nhập tin nhắn -->
      <div class="h-auto w-full border-t rounded-b-xl flex flex-row justify-start items-center p-2 bg-white">
        <textarea v-model="message" ref="textareaRef" rows="1" placeholder="Nhập tin nhắn..."
          class="resize-none overflow-hidden w-full ps-2 focus:outline-none text-sm md:text-base"
          @input="autoResize" @keydown.enter="sendMessage">
        </textarea>
        <div @click="sendMessage"
          class="h-10 w-10 flex justify-center items-center hover:cursor-pointer md:h-12 md:w-12">
          <svg class="w-5 h-5 text-gray-800 md:w-6 md:h-6" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 24 24">
            <path
              d="M14.502 7.046h-2.5v-.928a2.122 2.122 0 0 0-1.199-1.954 1.827 1.827 0 0 0-1.984.311L3.71 8.965a2.2 2.2 0 0 0 0 3.24L8.82 16.7a1.829 1.829 0 0 0 1.985.31 2.121 2.121 0 0 0 1.199-1.959v-.928h1a2.025 2.025 0 0 1 1.999 2.047V19a1 1 0 0 0 1.275.961 6.59 6.59 0 0 0 4.662-7.22 6.593 6.593 0 0 0-6.437-5.695Z" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import api from '../../services/api'

const message = ref('')
const messages = ref([])
const textareaRef = ref(null)
const isOpen = ref(false)

const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}
const id_customer = userInfo.id || 1
const id_user = 1

// Tự động co giãn textarea
const autoResize = () => {
  const textarea = textareaRef.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
}

// Gửi tin nhắn
const sendMessage = async (event) => {
  if (event && event.type === 'keydown' && !event.shiftKey) {
    event.preventDefault()
  }

  if (!message.value.trim()) return

  const userMessage = message.value
  messages.value.push({ sender: 'user', text: userMessage })
  message.value = ''
  autoResize()

  messages.value.push({ sender: 'bot', text: '...', typing: true })

  try {
    const res = await api.post('/chat/send', {
      id_customer,
      id_user,
      message: userMessage
    })

    messages.value = messages.value.filter(msg => !msg.typing)
    messages.value.push({ sender: 'bot', text: res.data.reply })
  } catch (err) {
    console.error('Lỗi gửi tin nhắn:', err)
    messages.value = messages.value.filter(msg => !msg.typing)
    messages.value.push({ sender: 'bot', text: 'Lỗi gửi tin nhắn.' })
  }

  autoResize()
}

// Gửi lời chào khi mở lần đầu
const sendGreeting = () => {
  if (messages.value.length === 0) {
    messages.value.push({
      sender: 'bot',
      text: `Xin chào! Tôi là AI hỗ trợ, bạn cần giúp gì hôm nay?`
    })
  }
}

// Theo dõi khi mở khung chat
watch(isOpen, (newValue) => {
  if (newValue) {
    sendGreeting()
  }
})

onMounted(() => {
  autoResize()
})

// Hàm định dạng tin nhắn có hỗ trợ **bold** và *phóng to*
function formatMessage(text) {
  if (!text) return ''

  // Chia dòng
  const lines = text.split('\n')
  const htmlLines = lines.map(line => {
    let html = line

    // Đổi **text** -> <strong>text</strong>
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

    // Nếu dòng bắt đầu bằng '*', thì bao dòng trong thẻ lớn hơn
    if (html.trim().startsWith('*')) {
      return `<div style="font-size: 1.1rem; font-weight: 500;">${html}</div>`
    }

    return `<div>${html}</div>`
  })

  return htmlLines.join('')
}
// Hàm xử lý nút chat nhanh
const quickChat = (text) => {
  message.value = text
  sendMessage()
}
</script>

<style scoped>
/* Base styles for all screens */
.typing-indicator span {
  display: inline-block;
  animation: blink 1.5s infinite;
  font-weight: bold;
  margin: 0 2px;
  font-size: 1rem; /* Reduced base font size for consistency */
}
.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}
.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes blink {
  0%, 80%, 100% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
}

/* Default chat button and window positioning */
.fixed.right-4.bottom-20 {
  right: 1rem;
  bottom: 4rem; /* Adjusted for better spacing */
  width: 3rem; /* w-12 */
  height: 3rem; /* h-12 */
}

.fixed.right-4.bottom-16 {
  right: 1rem;
  bottom: 8rem; /* Adjusted to avoid overlap with button */
  width: 90vw;
  max-width: 400px;
  height: 70vh;
  max-height: 600px; /* Increased max-height for larger screens */
}

/* General text and padding adjustments */
.text-lg {
  font-size: 1.125rem; /* Slightly smaller for better scaling */
}

.w-12.h-12 {
  width: 3rem;
  height: 3rem;
}

.w-6.h-6 {
  width: 1.5rem;
  height: 1.5rem;
}

.p-2 {
  padding: 0.5rem;
}

.text-sm {
  font-size: 0.875rem;
}

/* Large screens (1024px and above) */
@media (min-width: 1024px) {
  .fixed.right-4.bottom-20 {
    right: 2rem;
    bottom: 2rem;
    width: 4rem; /* Larger button for desktop */
    height: 4rem;
  }

  .fixed.right-4.bottom-16 {
    right: 2rem;
    bottom: 7rem;
    width: 450px; /* Slightly wider chat window */
    height: 600px;
  }

  .text-lg {
    font-size: 1.25rem;
  }

  .text-sm {
    font-size: 1rem;
  }

  .p-2 {
    padding: 0.75rem; /* More spacious padding */
  }
}

/* Tablets (768px to 1023px) */
@media (max-width: 1023px) {
  .fixed.right-4.bottom-20 {
    right: 1.5rem;
    bottom: 1.5rem;
    width: 3.5rem;
    height: 3.5rem;
  }

  .fixed.right-4.bottom-16 {
    right: 1.5rem;
    bottom: 6rem;
    width: 90vw;
    max-width: 380px;
    height: 65vh;
    max-height: 500px;
  }

  .text-lg {
    font-size: 1rem;
  }

  .text-sm {
    font-size: 0.85rem;
  }

  .p-2 {
    padding: 0.5rem;
  }

  .w-12.h-12 {
    width: 2.75rem;
    height: 2.75rem;
  }

  .w-6.h-6 {
    width: 1.25rem;
    height: 1.25rem;
  }
}

/* Small mobile devices (480px and below) */
@media (max-width: 480px) {
  .fixed.right-4.bottom-20 {
    right: 1rem;
    bottom: 6.5rem;
    width: 2.75rem; /* Smaller button for very small screens */
    height: 2.75rem;
  }

  .fixed.right-4.bottom-16 {
    right: 1rem;
    bottom: 5rem;
    width: 95vw;
    max-width: 340px;
    height: 60vh;
    max-height: 450px; /* Adjusted for smaller screens */
  }

  .h-16 {
    height: 3rem; /* Smaller header */
  }

  .text-lg {
    font-size: 0.95rem;
  }

  .text-sm {
    font-size: 0.8rem;
  }

  .p-2 {
    padding: 0.4rem;
  }

  .w-12.h-12 {
    width: 2.25rem;
    height: 2.25rem;
  }

  .w-6.h-6 {
    width: 1.125rem;
    height: 1.125rem;
  }

  .typing-indicator span {
    font-size: 0.9rem;
  }
}

/* Very small devices (below 360px) */
@media (max-width: 360px) {
  .fixed.right-4.bottom-20 {
    right: 0.75rem;
    bottom: 0.75rem;
    width: 2.5rem;
    height: 2.5rem;
  }

  .fixed.right-4.bottom-16 {
    right: 0.75rem;
    bottom: 4rem;
    width: 95vw;
    max-width: 300px;
    height: 55vh;
    max-height: 400px;
  }

  .text-lg {
    font-size: 0.9rem;
  }

  .text-sm {
    font-size: 0.75rem;
  }

  .p-2 {
    padding: 0.3rem;
  }

  .typing-indicator span {
    font-size: 0.85rem;
  }
}
</style>