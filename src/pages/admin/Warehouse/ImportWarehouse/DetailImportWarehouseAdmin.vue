<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex flex-row px-5 gap-2">
                                <p class="w-full">Hình ảnh:</p>
                                <div class="w-32 h-32 flex justify-center items-center overflow-hidden border">
                                    <img class=" w-full h-full object-cover"
                                        :src="importMenuWarehouseData?.ingredient?.image" alt="hình ảnh">
                                </div>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Tên thành phần:</p>
                                <p class="text-2xl flex-1 text-end">{{
                                    importMenuWarehouseData?.ingredient?.name_ingredient }}
                                </p>
                            </div>

                            <div class="flex flex-row w-full items-center px-5">
                                <p>Số lượng nhập:</p>
                                <p class="text-2xl flex-1 text-end">{{ importMenuWarehouseData?.quantity }}</p>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p class="flex-1">Giá tiền:</p>
                                <div class="flex flex-row gap-2 justify-end flex-1">
                                    <p class="text-2xl">{{
                                        importMenuWarehouseData?.price.toLocaleString() }}
                                    </p>
                                    <p>VNĐ</p>
                                </div>

                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Ngày nhập:</p>
                                <p class="text-2xl flex-1 text-end">{{ importMenuWarehouseData?.stock_in_date }}</p>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p>Đơn vị tính:</p>
                                <p class="text-2xl flex-1 text-end">{{ importMenuWarehouseData?.ingredient?.unit }}</p>
                            </div>
                            <div class="flex flex-row gap-2 p-2">
                                <div class=" rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                    @click="goBack">
                                    Trở lại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AccessDenied v-if="showToast" />
</template>

<script setup>

import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch, reactive } from "vue";
import AccessDenied from '../../../../components/Admin/AccessDenied.vue';
import axios from "axios";


const router = useRouter()
const route = useRoute()
const importMenuWarehouseData = route.query.data ? JSON.parse(route.query.data) : null;

function goBack() {
    router.push({ name: 'import-warehouse-admin' })
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