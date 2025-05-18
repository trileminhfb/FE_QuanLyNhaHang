<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chỉnh sửa người dùng
            </div>

            <div class="w-[40vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class=" border flex flex-row">
                        <div class="flex flex-col flex-1 justify-center items-center">
                            <div class="flex flex-col flex-1 justify-center items-center p-2">
                                <div class="relative ">
                                    <img :src="img.preview || 'http://127.0.0.1:8000/storage/images/avt.png'"
                                        alt="Avatar" class="w-36 h-36 rounded-full border-4 border-white shadow-lg" />

                                    <div onclick="document.querySelector('input[type=file]').click()"
                                        class="absolute top-0 left-0 w-full h-full bg-transparent hover:bg-gray-500/20 cursor-pointer rounded-full">
                                    </div>
                                    <input type="file" accept="image/*" class="hidden" :onchange="onFileChange">
                                </div>
                            </div>
                        </div>

                        <div class="border flex flex-[2] flex-col p-2 gap-1">
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Tên người dùng:</p>

                                <input type="text" id="name" v-model="form.name"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    :placeholder="userData.name || 'Nhập tên người dùng...'" />
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Trạng thái:</p>

                                <select v-model="form.status" class="flex-1 border rounded px-4 py-2 w-[200px]">
                                    <option disabled value="">--Trạng thái--</option>
                                    <option value="active">Đang làm việc</option>
                                    <option value="inactive">Nghỉ việc</option>
                                    <option value="banned">Bị ban</option>
                                </select>
                            </div>

                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Số điện thoại:</p>

                                <input type="text" id="phone_number" v-model="form.phone_number"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    :placeholder="userData.phone_number || 'Nhập số điện thoại...'" />
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Email:</p>

                                <input type="text" id="email" v-model="form.email"
                                    class="flex-1 border rounded px-4 py-2 text-lg"
                                    :placeholder="userData.email || 'Nhập email...'" />
                            </div>
                            <div class="flex flex-row items-center gap-2">
                                <p class="flex flex-1">Ngày sinh:</p>

                                <input :placeholder="userData.birth" v-model="form.birth"
                                    class=" flex-1 border rounded px-4 py-2 text-lg" type="date" name="birth"
                                    id="birth">
                            </div>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-green-300"
                                    @click="goSave">
                                    Lưu
                                </div>

                                <div class="bg-red-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:text-black hover:bg-red-300"
                                    @click="goDelete">
                                    Xoá
                                </div>

                                <ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />

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
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import ConfirmDelete from '../../../components/Admin/ConfirmDelete.vue';
import axios from 'axios'
import api from '../../../services/api';

const router = useRouter()
const route = useRoute()
const userData = route.query.data ? JSON.parse(route.query.data) : null;

const showConfirm = ref(false)
const img = reactive({
    origin: userData?.image,
    preview: userData?.image
});

const form = ref({
    id: userData?.id || '',
    image: '',
    name: userData?.name || '',
    role: userData?.role || '',
    phone_number: userData?.phone_number || '',
    email: userData?.email || '',
    // password: userData?.password || '',
    birth: userData?.birth || '',
    status: userData?.status || ''

})

async function goSave() {
    if (!form.value.name || !form.value.email || !form.value.birth) {
        alert("Vui lòng điền đầy đủ Tên, Email và Ngày sinh.");
        return;
    }

    try {
        const formData = new FormData()
        formData.append('_method', 'PUT')
        formData.append('name', form.value.name)
        formData.append('id', form.value.id)
        formData.append('role', form.value.role)
        formData.append('phone_number', form.value.phone_number)
        formData.append('image', form.value.image)
        formData.append('birth', form.value.birth)
        formData.append('originImg', img.origin)
        formData.append('status', form.value.status)
        formData.append('email', form.value.email)

        const response = await api.post(`admin/users/update/${userData.id}`, formData);

        // Kiểm tra response và thông báo cho người dùng
        if (response.status === 200) {
            alert("Cập nhật thành công!");
            router.push({ name: 'admin-users' });
        } else {
            alert("Không thể cập nhật dữ liệu. Vui lòng thử lại.");
        }
    } catch (error) {
        console.error("Lỗi khi lưu:", error);
        if (error.response) {
            // Nếu lỗi có phản hồi từ server, thông báo chi tiết
            alert(`Đã xảy ra lỗi: ${error.response.data.message || 'Lỗi không xác định.'}`);
        } else {
            // Lỗi không có phản hồi
            alert("Đã xảy ra lỗi khi kết nối với server.");
        }
    }
}

const onFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
        form.value.image = file
        img.preview = URL.createObjectURL(file)
    }
}
function goBack() {
    router.push({ name: 'admin-users' })
}
function goDelete() {
    showConfirm.value = true
}

async function confirmDelete() {
    showConfirm.value = false

    try {
        await axios.delete(`http://127.0.0.1:8000/api/admin/users/delete/${userData.id}`)
        alert('Đã xoá  thành công!')
        router.push({ name: 'admin-users' })
    } catch (error) {
        console.error('Lỗi khi xoá :', error)
        alert('Không thể xoá .')
    }
}

function cancelDelete() {
    showConfirm.value = false
}
</script>
