<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="fixed z-0 mt-20 ms-[300px] w-[calc(60vw-300px)] h-[calc(100vh-100px)] p-4">
        <div class="w-full h-full flex flex-col gap-4 font-semibold">
            <h1 class="uppercase font-bold text-2xl">Chi tiết kiểu</h1>

            <div class="w-full border rounded p-4 flex flex-col gap-4 bg-white shadow">
                <div class="flex justify-between items-center">
                    <p class="text-lg">Tên kiểu:</p>
                    <p class="text-2xl">{{ typeData?.name }}</p>
                </div>

                <div class="flex justify-between items-center">
                    <p class="text-lg">Trạng thái:</p>
                    <span :class="typeData?.status === 1 ? 'bg-green-500' : 'bg-red-500'"
                        class="text-white px-3 py-1 rounded">
                        {{ typeData?.status === 1 ? 'Đang mở bán' : 'Đang đóng' }}
                    </span>
                </div>

                <div>
                    <p class="mb-2">Danh sách các loại thức ăn:</p>
                    <div class="flex flex-wrap gap-2">
                        <span v-for="(cat, index) in filteredCategories" :key="index"
                            class="bg-gray-200 px-3 py-1 rounded text-base">
                            {{ cat?.name }}
                        </span>
                    </div>
                </div>

                <div class="flex justify-between gap-4 mt-6">
                    <button class="flex-1 bg-green-500 hover:bg-green-300 text-white hover:text-black py-2 rounded"
                        @click="goEdit(typeData)">
                        Chỉnh sửa
                    </button>

                    <button class="flex-1 bg-red-500 hover:bg-red-300 text-white hover:text-black py-2 rounded"
                        @click="goDelete">
                        Xoá
                    </button>

                    <button class="flex-1 border hover:bg-gray-200 py-2 rounded" @click="goBack">
                        Trở lại
                    </button>
                </div>

                <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
            </div>
        </div>
    </div>
    <AccessDenied v-if="showToast" />


</template>

<script setup>

import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch, reactive } from "vue";
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';
import axios from 'axios'
import AccessDenied from '../../../components/Admin/AccessDenied.vue';
const allItems = ref([])

const router = useRouter()
const route = useRoute()
const typeData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

const fetchCategory = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/admin/categories");
        allItems.value = response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
    }
}

const user = ref({
    role: 'N/A',
});
const showToast = ref(false);

async function fetchUserProfile() {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw new Error('No authentication token found.');
        }

        const response = await axios.get('http://127.0.0.1:8000/api/admin/users/profile', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        user.value.role = response.data.data.role; // Only store the role
    } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            router.push({ name: 'admin-login' });
        }
    }
}

onMounted(async () => {
    await fetchCategory();
    fetchUserProfile();
});

watch(() => user.value.role, (newRole) => {
    if (newRole !== 'admin' && newRole !== 'manager') {
        showToast.value = true;
    }
});

const filteredCategories = computed(() =>
    allItems.value.filter(item => item.id_type === typeData?.id)
)

function goBack() {
    router.push({ name: 'admin-types' })
}

function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/types/${typeData.id}`)
        alert('Đã xoá rank thành công!')
        router.push({ name: 'admin-types' })
    } catch (error) {
        console.error('Lỗi khi xoá rank:', error)
        alert('Không thể xoá rank.')
    }
}

function cancelDelete() {
    showConfirm.value = false
}

function goEdit(item) {
    router.push({
        name: 'admin-edit-types',
        params: {
            id: item.id,
        },
        query: {
            data: JSON.stringify(item)
        }
    });
}
</script>
