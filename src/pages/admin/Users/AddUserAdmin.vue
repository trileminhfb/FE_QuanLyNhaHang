<template>
    <div v-if="user.role === 'admin'" class="h-[calc(100vh-100px)] fixed z-0 mt-20 w-full ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Thêm mới người dùng</div>

            <div class="w-[40vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col items-center justify-center">
                    <div class="border flex ">
                        <!-- Ảnh đại diện -->
                        <div class="flex flex-col flex-1 justify-center items-center p-2">
                            <div class="relative ">
                                <img :src="img.preview || 'http:// 192.168.1.53:8888/storage/images/avt.png'" alt="Avatar"
                                    class="w-36 h-36 rounded-full border-4 border-white shadow-lg" />

                                <div onclick="document.querySelector('input[type=file]').click()"
                                    class="absolute top-0 left-0 w-full h-full bg-transparent hover:bg-gray-500/20 cursor-pointer rounded-full">
                                </div>
                                <input type="file" accept="image/*" class="hidden" :onchange="onFileChange">
                            </div>
                        </div>

                        <!-- Form -->
                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Tên người dùng:</p>
                                <input type="text" v-model="form.name" class="flex-1 border rounded px-4 py-2 text-lg"
                                    name="name" placeholder="Nhập tên người dùng..." />
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Password:</p>
                                <input type="password" v-model="form.password"
                                    class="flex-1 border rounded px-4 py-2 text-lg" placeholder="Nhập Password..."
                                    name="password" />
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Vai trò:</p>
                                <select v-model="form.role" class="flex-1 border rounded px-4 py-2 w-[200px]">
                                    <option disabled value="">--Vai trò--</option>
                                    <option value="admin">Quản trị viên</option>
                                    <option value="manager">Quản lý</option>
                                    <option value="staff">Nhân viên</option>
                                </select>
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Số điện thoại:</p>
                                <input type="text" v-model="form.phone_number"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    placeholder="Nhập số điện thoại..." />
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Email:</p>
                                <input type="email" v-model="form.email" class="flex-1 border rounded px-4 py-2 text-lg"
                                    name="email" placeholder="Nhập email..." />
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Ngày sinh:</p>
                                <input type="date" v-model="form.birth"
                                    class="flex-1 border rounded px-4 py-2 text-lg" />
                            </div>

                            <!-- Buttons -->
                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goSave">
                                    Lưu
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
        </div>
    </div>
    <AccessDenied v-if="showToast" />
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from "vue";
import { useRouter } from 'vue-router'
import axios from 'axios'
import AccessDenied from '../../../components/Admin/AccessDenied.vue'

const router = useRouter()
const fileInput = ref(null)
const img = reactive({
    preview: null
});

const form = ref({
    name: '',
    password: '',
    role: '',
    status: 'active',
    phone_number: '',
    email: '',
    birth: '',
    image: '', // <-- ảnh mặc định
})

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

        const response = await axios.get('http:// 192.168.1.53:8888/api/admin/users/profile', {
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
    if (newRole !== 'admin') {
        showToast.value = true;
    }
});

const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        form.value.image = file
        img.preview = URL.createObjectURL(file)
    }
}

async function goSave() {
    if (!form.value.name || !form.value.password || !form.value.email || !form.value.role || !form.value.image) {
        alert('Vui lòng điền đầy đủ thông tin bắt buộc và chọn ảnh đại diện!')
        return
    }

    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('password', form.value.password)
    formData.append('role', form.value.role)
    formData.append('status', form.value.status)
    formData.append('phone_number', form.value.phone_number)
    formData.append('email', form.value.email)
    formData.append('birth', form.value.birth)
    formData.append('image', form.value.image) // hình ảnh bây giờ là bắt buộc

    try {
        const token = localStorage.getItem('auth_token')

        const response = await axios.post('http:// 192.168.1.53:8888/api/admin/users/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
            }
        })

        alert('Đã thêm người dùng thành công!')
        router.push({ name: 'admin-users' })
    } catch (error) {
        console.error('Lỗi thêm người dùng:', error)
        if (error.response && error.response.data && error.response.data.message) {
            alert('Lỗi: ' + error.response.data.message)
        } else {
            alert('Không thể thêm người dùng.')
        }
    }
}

function goBack() {
    router.push({ name: 'admin-users' })
}
</script>
