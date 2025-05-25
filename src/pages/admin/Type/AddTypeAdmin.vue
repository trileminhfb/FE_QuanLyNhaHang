<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="w-[calc(60vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-4">
        <div class="h-full w-full flex flex-col font-semibold gap-4">
            <!-- Tiêu đề -->
            <div class="uppercase font-bold text-3xl text-gray-800">Thêm kiểu</div>

            <div class="h-fit bg-white rounded-lg shadow-md p-6 border space-y-2">
                <div class="flex items-center gap-4">
                    <p class="w-32">Tên kiểu:</p>
                    <input type="text" id="name-category" v-model="form.name"
                        class="flex-1 border rounded px-4 py-2 text-lg" placeholder="Nhập tên kiểu..." />
                </div>

                <!-- Trạng thái -->
                <div class="flex items-center gap-4">
                    <label class="w-32">Trạng thái:</label>
                    <SwitchButton v-model="form.status" @toggle="(val) => console.log('Trạng thái mới:', val)" />
                </div>

                <!-- Nút thao tác -->
                <div class="flex justify-end gap-4 pt-4">
                    <button class="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-400" @click="goSave">Lưu
                    </button>
                    <button class="border px-6 py-2 rounded hover:bg-gray-100" @click="goBack">Trở lại</button>
                </div>
            </div>
        </div>
    </div>
    <AccessDenied v-if="showToast" />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch, reactive } from "vue";
import axios from 'axios'
import SwitchButton from '../../../components/Admin/SwitchButton.vue'
import AccessDenied from '../../../components/Admin/AccessDenied.vue'

const router = useRouter()
const route = useRoute()

function goBack() {
    router.push({ name: 'admin-types' })
}

const form = ref({
    name: '',
    status: 1
})

async function goSave() {
    try {
        await axios.post('http://127.0.0.1:8000/api/admin/types/create', form.value)
        alert('Đã thêm kiểu mới thành công!')
        router.push({ name: 'admin-types' })
    } catch (error) {
        console.error('Lỗi thêm kiểu:', error)
        alert('Không thể thêm kiểu.')
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
    fetchUserProfile();
});

watch(() => user.value.role, (newRole) => {
    if (newRole !== 'admin' && newRole !== 'manager') {
        showToast.value = true;
    }
});

</script>
