<template>
    <div class="h-screen flex justify-center items-center">
        <p class="text-lg">Đang xử lý mã QR...</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

onMounted(() => {
    const tableId = route.query.id

    if (tableId) {
        localStorage.setItem('table_id', tableId)
        router.push({ name: 'users-home' })
    } else {
        alert("Không tìm thấy mã bàn trong QR!")
        router.push({ name: 'users-home' })
    }
})
</script>
