<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Chi tiết người dùng</div>

            <div v-if="customerData" class="w-[50vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="border flex flex-row">
                        <!-- Ảnh -->
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <div class="relative">
                                <img :src="img.preview" alt="Avatar"
                                    class="w-36 h-36 rounded-full border-4 border-white shadow-lg" />
                                <div onclick="document.querySelector('input[type=file]').click()"
                                    class="absolute top-0 left-0 w-full h-full bg-transparent hover:bg-gray-500/20 cursor-pointer rounded-full">
                                </div>
                                <input type="file" accept="image/*" class="hidden" :onchange="onFileChange">
                            </div>
                        </div>

                        <!-- Thông tin -->
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex flex-row gap-2 items-center">
                                <p class="flex-1">Họ và tên:</p>
                                <input type="text" id="name" v-model="form.FullName"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    placeholder="Nhập tên người dùng..." />
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p class="flex-1">Email:</p>
                                <input type="text" id="email" v-model="form.mail"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    placeholder="Nhập mail người dùng..." />
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p class="flex-1">Số điện thoại:</p>
                                <input type="text" id="phoneNumber" v-model="form.phoneNumber"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    placeholder="Nhập số điện thoại..." />
                            </div>

                            <div class="flex flex-row gap-2 items-center">
                                <p class="flex-1">Ngày sinh:</p>
                                <input v-model="form.birth" class="flex-1 border rounded px-4 py-2 text-lg" type="date"
                                    name="birth" id="birth" />
                            </div>

                            <!-- Buttons -->
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goSave">
                                    Lưu
                                </div>

                                <div class="bg-red-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-red-300"
                                    @click="goDelete(customerData)">
                                    Xoá
                                </div>

                                <div class="rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                    @click="goBack">
                                    Trở lại
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
        </div>
    </div>
    <AccessDenied v-if="showToast" />

</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from "vue";
import { useRoute, useRouter } from 'vue-router'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue'
import axios from 'axios'
import api from '../../../services/api'
import AccessDenied from '../../../components/Admin/AccessDenied.vue'

const router = useRouter()
const route = useRoute()
const customerData = route.query.data ? JSON.parse(route.query.data) : null
const showConfirm = ref(false)
const itemToDelete = ref(null)
const img = reactive({
    origin: customerData.image,
    preview: customerData.image
});

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

// Khởi tạo form từ customerData
const form = ref({
    FullName: customerData?.FullName || '',
    mail: customerData?.mail || '',
    phoneNumber: customerData?.phoneNumber || '',
    birth: formatDateForInput(customerData?.birth || ''),
    image: ''
})

// Chuyển ngày sinh về dạng YYYY-MM-DD
function formatDateForInput(dateStr) {
    if (!dateStr) return ''
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return dateStr // đã đúng format

    const parts = dateStr.split('/')
    if (parts.length === 3) {
        const [day, month, year] = parts
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
    return ''
}

function goBack() {
    router.push({ name: 'admin-customers' })
}

function goDelete(item) {
    itemToDelete.value = item
    showConfirm.value = true
}

async function confirmDelete() {
    if (!itemToDelete.value || !itemToDelete.value.id) {
        console.error('Không có item hoặc ID để xoá')
        showConfirm.value = false
        return
    }

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/customers/${itemToDelete.value.id}`)
        alert('Đã xoá thành công!')
        router.push({ name: 'admin-customers' })
    } catch (error) {
        console.error('Lỗi khi xoá:', error)
        alert('Không thể xoá.')
        showConfirm.value = false
    }
}

const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        form.value.image = file
        img.preview = URL.createObjectURL(file)
    }
}

async function goSave() {
    try {
        const formData = new FormData()
        formData.append('_method', 'PUT')
        formData.append('FullName', form.value.FullName)
        formData.append('mail', form.value.mail)
        formData.append('phoneNumber', form.value.phoneNumber)
        formData.append('image', form.value.image)
        formData.append('birth', form.value.birth)
        formData.append('originImg', img.origin)
        await api.post(`admin/customers/update/${customerData.id}`, formData)
        alert("Cập nhật thành công!")
        router.push({ name: 'admin-customers' })
    } catch (error) {
        console.error("Lỗi khi lưu:", error)
        alert("Đã xảy ra lỗi khi lưu dữ liệu.")
    }
}

function cancelDelete() {
    showConfirm.value = false
    itemToDelete.value = null
}
</script>
