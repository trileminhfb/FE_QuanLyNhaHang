<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-10 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="uppercase font-bold text-2xl">Thêm món ăn mới</div>
            <div class="w-[70vw] h-full flex justify-center items-start text-xl rounded-lg">
                <div class="w-full h-[70vh] flex flex-row">
                    <!-- LEFT SIDE FORM -->
                    <div class="border flex-col gap-2 p-5 flex flex-[2] rounded-s-lg">
                        <div class="w-full">
                            <p>Tên món ăn</p>
                            <input class="border w-full h-12 ps-2" v-model="foodData.name" type="text"
                                placeholder="Tên món">
                        </div>
                        <div class="w-full">
                            <p>Giá món ăn (VNĐ)</p>
                            <input class="w-full border h-12 px-2" v-model="foodData.cost" type="number"
                                placeholder="Giá">
                        </div>
                        <div class="w-full">
                            <p>Mô tả món ăn</p>
                            <textarea class="w-full border mt-2 h-[300px] px-2 py-2 resize-none"
                                v-model="foodData.detail" placeholder="Nhập mô tả món ăn tại đây..."></textarea>
                        </div>
                    </div>

                    <!-- RIGHT SIDE FORM -->
                    <div class="border flex flex-1 gap-2 flex-col items-center p-2 rounded-e-lg">
                        <div class="flex flex-col gap-2 justify-center items-center">
                            <div class="h-[200px] w-[200px] border rounded-lg overflow-hidden">
                                <img class="object-cover w-full h-full" :src="virtualImg || '/placeholder.png'"
                                    alt="Hình ảnh hiển thị">
                            </div>
                            <input type="file" class="hidden" ref="imageInput" @change="handleImage">
                            <input
                                class="hover:cursor-pointer hover:bg-slate-500 rounded-md w-full h-12 text-2xl px-5 bg-gray-300"
                                type="button" value="Chọn ảnh" @click="() => imageInput.click()">
                        </div>
                        <div class="w-[300px]">
                            <p>Kiểu món ăn</p>
                            <select class="h-10 w-full border-2 ps-2" v-model="foodData.type">
                                <option value="">-- Chọn kiểu món --</option>
                                <option v-for="type in allItemsTypes" :key="type.id" :value="type.id">{{ type.name }}
                                </option>
                            </select>
                        </div>
                        <div class="w-[300px]">
                            <div class="mb-2">Thể loại</div>
                            <div v-if="foodData.type"
                                class="border overflow-y-auto text-sm flex flex-wrap gap-2 p-2 max-h-[200px]">
                                <div v-for="category in filteredCategories" :key="category.id"
                                    class="border hover:cursor-pointer rounded-lg px-2 flex items-center justify-center h-10"
                                    :class="{ 'bg-green-500 text-white': foodData.categories.includes(category.id) }"
                                    @click="toggleCategory(category.id)">
                                    <p>{{ category.name }}</p>
                                </div>
                            </div>
                            <div v-else class="text-sm text-gray-500">Vui lòng chọn kiểu món ăn để hiển thị thể loại.
                            </div>
                        </div>
                        <div class="flex flex-row gap-5">
                            <input
                                class="bg-green-500 rounded-md w-24 hover:bg-green-300 hover:text-black text-white h-12 text-2xl"
                                type="button" value="Lưu" @click="goSave">
                            <input class="rounded-md w-24 hover:bg-gray-300 border border-black h-12 text-2xl"
                                type="button" value="Trở lại" @click="goBack">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AccessDenied v-if="showToast" />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import SwitchButton from '../../../components/Admin/SwitchButton.vue';
import AccessDenied from '../../../components/Admin/AccessDenied.vue';

const router = useRouter();
const foodData = ref({
    name: '',
    cost: 0,
    best_seller: 0,
    status: 1,
    detail: '',
    image: '',
    type: null,
    categories: []
});
const imageInput = ref(null);
const allItemsTypes = ref([]);
const allItemsCategories = ref([]);
const virtualImg = ref(null);
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

const fetchType = async () => {
    try {
        const response = await axios.get("http:// 192.168.1.53:8888/api/admin/types");
        allItemsTypes.value = response.data.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu types:", error);
    }
};

const fetchCategory = async () => {
    try {
        const response = await axios.get("http:// 192.168.1.53:8888/api/admin/categories");
        allItemsCategories.value = response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu categories:", error);
    }
};

const filteredCategories = computed(() => {
    return allItemsCategories.value.filter(cat => cat.id_type === foodData.value.type);
});

function toggleField(field) {
    if (user.value.role !== 'admin' && user.value.role !== 'manager') {
        alert("Bạn không có quyền thực hiện thao tác này.");
        return;
    }
    foodData.value[field] = foodData.value[field] === 1 ? 0 : 1;
}

function toggleCategory(categoryId) {
    if (user.value.role !== 'admin' && user.value.role !== 'manager') {
        alert("Bạn không có quyền thực hiện thao tác này.");
        return;
    }
    const index = foodData.value.categories.indexOf(categoryId);
    if (index > -1) foodData.value.categories.splice(index, 1);
    else foodData.value.categories.push(categoryId);
}

function handleImage(event) {
    if (user.value.role !== 'admin' && user.value.role !== 'manager') {
        alert("Bạn không có quyền thực hiện thao tác này.");
        return;
    }
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            foodData.value.image = file;
            virtualImg.value = reader.result;
        };
        reader.readAsDataURL(file);
    }
}

async function goSave() {
    if (user.value.role !== 'admin' && user.value.role !== 'manager') {
        alert("Bạn không có quyền thực hiện thao tác này.");
        return;
    }
    try {
        const formData = new FormData();
        formData.append('name', foodData.value.name);
        formData.append('id_type', foodData.value.type);
        formData.append('best_seller', foodData.value.best_seller);
        formData.append('cost', foodData.value.cost);
        formData.append('detail', foodData.value.detail);
        formData.append('status', foodData.value.status);
        formData.append('category_ids', foodData.value.categories);
        formData.append('image', foodData.value.image);

        await axios.post("http:// 192.168.1.53:8888/api/admin/foods/create", formData);
        alert("Tạo món ăn thành công!");
        router.push({ name: 'admin-foods' });
    } catch (err) {
        console.error("Lỗi khi lưu:", err);
        alert("Đã xảy ra lỗi khi lưu món ăn.");
    }
}

function goBack() {
    router.push({ name: 'admin-foods' });
}

watch(() => user.value.role, (newRole) => {
    if (newRole !== 'admin' && newRole !== 'manager') {
        showToast.value = true;

    }
});

onMounted(() => {
    fetchUserProfile();
    fetchType();
    fetchCategory();
});
</script>
