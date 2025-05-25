<template>
    <div v-if="visible" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div class="bg-white rounded-xl p-6 w-[300px] text-center shadow-lg relative">
            <h2 class="text-xl font-semibold mb-4">Thông báo</h2>
            <p class="mb-6">Hãy liên hệ với quản trị viên để được cấp lại mật khẩu.</p>
            <button @click="close" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Đóng
            </button>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    visible: Boolean,
});

const emit = defineEmits(['close']);

function close() {
    emit('close');
}
</script>
