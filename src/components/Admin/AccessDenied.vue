<template>
    <div class="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
        <div v-if="isLoading" class="flex flex-col items-center">
            <div class="loader"></div>
            <p class="text-sm text-gray-500 mt-2">Đang tải...</p>
        </div>
        <div v-else class="flex flex-col items-center space-y-4 animate-fade-in">
            <p class="text-lg font-semibold">Bạn không được vào trang này</p>
            <button class="bg-gray-200 text-black rounded-md px-4 py-2 hover:bg-gray-300 transition-colors duration-200"
                @click="goBack">
                Quay lại
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(true);

function goBack() {
    router.push({ name: 'home' });
}

onMounted(() => {
    // Simulate loading delay (e.g., 1.5 seconds)
    setTimeout(() => {
        isLoading.value = false;
    }, 1500);
});
</script>

<style scoped>
.loader {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>