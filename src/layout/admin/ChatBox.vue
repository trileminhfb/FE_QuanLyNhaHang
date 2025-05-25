<template>
  <div class="fixed right-10 bottom-10 h-16 w-16 bg-blue-500 rounded-full flex justify-center items-center">
    <!-- ICON mở chat -->
    <svg @click="isOpen = true" class="w-12 h-12 text-white hover:cursor-pointer" xmlns="http://www.w3.org/2000/svg"
      fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
        d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>

    <!-- Chat Box -->
    <div v-if="isOpen" class="fixed right-28 bottom-10 h-[500px] w-[700px] bg-white border rounded-xl flex">
      <!-- Danh sách người dùng -->
      <div class="w-[250px] border-r p-2 overflow-y-auto">
        <h3 class="text-lg font-bold mb-2">Khách hàng</h3>
        <div v-for="user in users" :key="user.id" class="p-2 hover:bg-blue-100 cursor-pointer rounded-md"
          :class="{ 'bg-blue-200': selectedUser?.id === user.id }" @click="selectUser(user)">
          {{ user.name }}
        </div>
      </div>

      <!-- Khung Chat -->
      <div class="flex-1 flex flex-col">
        <!-- Header -->
        <div class="w-full border-b h-20 flex items-center justify-between px-4 bg-blue-400 rounded-tr-xl">
          <div class="text-white font-semibold text-xl">
            {{ selectedUser?.name || 'Chọn người dùng' }}
          </div>
          <svg @click="isOpen = false" class="w-8 h-8 text-white cursor-pointer" xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M6 18 17.94 6M18 18 6.06 6" />
          </svg>
        </div>

        <!-- Nội dung tin nhắn -->
        <div class="flex-1 overflow-y-auto p-2">
          <div v-for="msg in messages" :key="msg.id" :class="msg.sender === 'customer' ? 'text-right' : 'text-left'">
            <p class="text-xs text-gray-500 mb-1">
              {{ msg.sender === 'customer' ? 'Admin' : selectedUser?.name }}
            </p>
            <p class="inline-block px-3 py-2 rounded-lg max-w-[70%] break-words"
              :class="msg.sender === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'">
              {{ msg.content }}
            </p>
          </div>
        </div>

        <!-- Nhập tin nhắn -->
        <div class="h-auto w-full border-t rounded-b-xl flex items-center p-2 bg-white">
          <textarea v-model="message" ref="textareaRef" rows="1" placeholder="Nhập tin nhắn..."
            class="resize-none overflow-hidden w-full ps-2 focus:outline-none" @input="autoResize"
            @keyup.enter.exact.prevent="sendMessage"></textarea>
          <div @click="sendMessage" class="h-[50px] w-[50px] flex justify-center items-center cursor-pointer">
            <svg class="w-6 h-6 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 24 24">
              <path
                d="M14.502 7.046h-2.5v-.928a2.122 2.122 0 0 0-1.199-1.954 1.827 1.827 0 0 0-1.984.311L3.71 8.965a2.2 2.2 0 0 0 0 3.24L8.82 16.7a1.829 1.829 0 0 0 1.985.31 2.121 2.121 0 0 0 1.199-1.959v-.928h1a2.025 2.025 0 0 1 1.999 2.047V19a1 1 0 0 0 1.275.961 6.59 6.59 0 0 0 4.662-7.22 6.593 6.593 0 0 0-6.437-5.695Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const isOpen = ref(false)
const message = ref('')
const textareaRef = ref(null)

const users = ref([])
const selectedUser = ref(null)
const messages = ref([])

const getUsers = async () => {
  try {
    const res = await api.get('/chat/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })
    users.value = res.data.users
  } catch (err) {
    console.error('Lỗi khi lấy danh sách người dùng:', err)
  }
}

const getMessages = async (userId) => {
  try {
    const res = await api.get(`/chat/get-messages/${userId}/2`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })
    messages.value = res.data.messages
  } catch (err) {
    console.error('Lỗi khi lấy tin nhắn:', err)
  }
}

const selectUser = (user) => {
  selectedUser.value = user
  getMessages(user.id)
}

const sendMessage = async () => {
  const trimmed = message.value.trim()
  if (!trimmed || !selectedUser.value) return

  const body = {
    id_customer: selectedUser.value.id,
    id_user: 2, // admin ID
    message: trimmed,
  }

  try {
    await api.post('/chat/send-message', body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`,
      },
    })
    message.value = ''
    getMessages(selectedUser.value.id)
  } catch (err) {
    console.error('Lỗi khi gửi tin nhắn:', err)
  }
}

const autoResize = () => {
  const textarea = textareaRef.value
  if (textarea) {
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }
}

onMounted(() => {
  getUsers()
})

</script>