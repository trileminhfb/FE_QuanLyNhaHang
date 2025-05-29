<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="bg-white p-8 rounded-2xl shadow-xl w-[30vw] mx-auto transform transition-all">
            <div v-if="isLoading" class="flex justify-center items-center h-full">
                <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            </div>

            <div v-else-if="errorMessage" class="text-red-500 text-center">
                {{ errorMessage }}
            </div>

            <div v-else class="flex flex-col items-center">
                <div class="relative">
                    <img :src="user.image || '/imageicon/placeholder.png'" alt="Avatar"
                        class="w-36 h-36 rounded-full border-4 border-white shadow-lg" />
                    <div class="absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white"
                        :class="user.status === 'active' ? 'bg-green-400' : 'bg-gray-400'"></div>
                </div>
                <h2 class="mt-4 text-3xl font-bold text-gray-900">{{ user.name }}</h2>
                <p v-if="user.role === 'admin'" class="text-gray-500 font-medium capitalize">Quản trị viên</p>
                <p v-else-if="user.role === 'staff'" class="text-gray-500 font-medium capitalize">Nhân viên</p>
                <p v-else-if="user.role === 'manager'" class="text-gray-500 font-medium capitalize">Quản lý</p>

                <span v-if="user.status === 'active'"
                    class="mt-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                    </svg>
                    Đang hoạt động
                </span>
            </div>

            <div v-if="!isLoading && !errorMessage" class="mt-8 space-y-6">
                <p v-if="message" class="text-green-500 text-sm text-center">{{ message }}</p>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700">Số điện thoại</label>
                        <p class="mt-1 text-gray-900 font-medium">{{ user.phone_number }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700">Ngày sinh</label>
                        <p class="mt-1 text-gray-900 font-medium">{{ user.birth }}</p>
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700">Email</label>
                        <p class="mt-1 text-gray-900 font-medium">{{ user.email }}</p>
                    </div>
                </div>
                <form>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700">Mật khẩu</label>
                        <input type="password" value="********" disabled
                            class="mt-1 w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-300"
                            autocomplete="current-password" />
                    </div>
                </form>
                <div class="flex flex-row w-full gap-2 text-white">
                    <button @click="showEditProfileModal = true"
                        class="flex-1 p-2 bg-green-500 hover:text-black hover:bg-green-200 py-3 rounded-lg font-semibold transition-all">
                        Đổi thông tin
                    </button>
                    <button @click="showChangePassModal = true"
                        class="flex-1 p-2 bg-yellow-500 hover:text-black hover:bg-yellow-200 py-3 rounded-lg font-semibold transition-all">
                        Đổi mật khẩu
                    </button>
                    <button @click="logout"
                        class="flex-1 p-2 bg-red-500 hover:text-black hover:bg-red-200 py-3 rounded-lg font-semibold transition-all">
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>

        <!-- Edit Profile Modal -->
        <div v-if="showEditProfileModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-[30vw]">
                <h2 class="text-2xl font-bold mb-4">Chỉnh sửa thông tin</h2>
                <form @submit.prevent="updateProfile">
                    <div class="mb-4 flex justify-center relative">
                        <div class="h-32 w-32 border rounded-full overflow-hidden">
                            <img class="w-full h-full object-cover"
                                :src="img.preview || editProfileForm.image || '/imageicon/placeholder.png'"
                                alt="Profile Image">
                        </div>
                        <div class="absolute w-32 h-32 bg-transparent hover:bg-gray-500/20 cursor-pointer rounded-full"
                            @click="() => $refs.profileImageInput.click()"></div>
                        <input ref="profileImageInput" type="file" accept="image/*" class="hidden"
                            @change="onFileChange" />
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Họ và tên</label>
                        <input v-model="editProfileForm.name" type="text"
                            class="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                            required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Số điện thoại</label>
                        <input v-model="editProfileForm.phone_number" type="text"
                            class="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                            required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Ngày sinh</label>
                        <input v-model="editProfileForm.birth" type="date"
                            class="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                            required />
                    </div>
                    <p v-if="editError" class="text-red-500 text-sm mb-4">{{ editError }}</p>
                    <div class="flex justify-end gap-2">
                        <button type="button" @click="showEditProfileModal = false"
                            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Hủy</button>
                        <button type="submit"
                            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Lưu</button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Change Password Modal -->
        <div v-if="showChangePassModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white p-6 rounded-lg w-[30vw]">
                <h2 class="text-2xl font-bold mb-4">Đổi mật khẩu</h2>
                <form @submit.prevent="changePassword">
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Mật khẩu cũ</label>
                        <input v-model="changePassForm.old_password" type="password"
                            class="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                            required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Mật khẩu mới</label>
                        <input v-model="changePassForm.new_password" type="password"
                            class="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                            required />
                    </div>
                    <div class="mb-4">
                        <label class="block text-sm font-semibold text-gray-700">Nhập lại mật khẩu mới</label>
                        <input v-model="changePassForm.re_password" type="password"
                            class="mt-1 w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300"
                            required />
                    </div>
                    <p v-if="passError" class="text-red-500 text-sm mb-4">{{ passError }}</p>
                    <div class="flex justify-end gap-2">
                        <button type="button" @click="showChangePassModal = false"
                            class="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400">Hủy</button>
                        <button type="submit"
                            class="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import api from '../../../services/api';

const router = useRouter();
const message = ref('');
const isLoading = ref(true);
const errorMessage = ref('');
const showEditProfileModal = ref(false);
const showChangePassModal = ref(false);
const editError = ref('');
const passError = ref('');

const user = ref({
    id: null,
    name: '',
    email: '',
    phone_number: '',
    role: '',
    status: '',
    image: '',
    birth: '',
});

const editProfileForm = ref({
    name: '',
    image: '',
    phone_number: '',
    birth: '',
});

const changePassForm = ref({
    old_password: '',
    new_password: '',
    re_password: '',
});

const img = reactive({
    origin: null,
    preview: null
});

const fetchUserProfile = async () => {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error('No token');

        const response = await api.get('/admin/users/profile');
        user.value = response.data.data;

        editProfileForm.value = {
            name: user.value.name,
            image: user.value.image || '',
            phone_number: user.value.phone_number,
            birth: user.value.birth,
        };

        img.origin = user.value.image;
        img.preview = user.value.image;
    } catch (error) {
        console.error(error);
        errorMessage.value = error.response?.data?.message || 'Không thể tải thông tin hồ sơ!';
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            router.push({ name: 'admin-login' });
        }
    } finally {
        isLoading.value = false;
    }
};

const updateProfile = async () => {
    editError.value = '';
    try {
        const formData = new FormData();
        formData.append('_method', 'PUT');
        formData.append('name', editProfileForm.value.name);
        formData.append('phone_number', editProfileForm.value.phone_number);
        formData.append('birth', editProfileForm.value.birth);
        if (editProfileForm.value.image && typeof editProfileForm.value.image !== 'string') {
            formData.append('image', editProfileForm.value.image);
        }
        formData.append('originImg', img.origin || '');

        const response = await api.post(`/admin/users/profile-update/${user.value.id}`, formData);
        user.value = response.data.data;

        img.origin = user.value.image;
        img.preview = user.value.image;
        message.value = 'Đổi thông tin thành công!';
        showEditProfileModal.value = false;
    } catch (error) {
        console.error(error);
        editError.value = error.response?.data?.message || 'Không thể cập nhật thông tin.';
    }
};

const changePassword = async () => {
    passError.value = '';
    try {
        const token = localStorage.getItem('auth_token');
        await axios.put('http:// 192.168.1.53:8888/api/admin/users/change-password', changePassForm.value, {
            headers: { Authorization: `Bearer ${token}` },
        });
        message.value = 'Đổi mật khẩu thành công!';
        showChangePassModal.value = false;
        changePassForm.value = { old_password: '', new_password: '', re_password: '' };
    } catch (error) {
        console.error(error);
        passError.value = error.response?.data?.message || 'Không thể đổi mật khẩu!';
    }
};

const logout = () => {
    if (confirm('Bạn có chắc muốn đăng xuất?')) {
        localStorage.removeItem('auth_token');
        router.push({ name: 'admin-login' });
    }
};

const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        editProfileForm.value.image = file;
        img.preview = URL.createObjectURL(file);
    }
};

onMounted(fetchUserProfile);
</script>
