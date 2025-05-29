    <template>
        <div v-if="user.role === 'admin' || user.role === 'manager'"
            class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2">
            <div class="h-full w-full flex flex-col font-semibold">
                <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                    <div class="w-full border h-fit flex flex-col">
                        <div class="flex-1 border flex flex-row">
                            <div class="border flex flex-[2] flex-col p-2 gap-2">
                                <div class="flex flex-row w-full items-center px-5 gap-4">
                                    <p class="flex-1">Hình ảnh:</p>
                                    <div class="flex flex-col gap-2">
                                        <div class="overflow-hidden">
                                            <img v-if="imagePreview" class="w-32 h-32 border object-cover"
                                                :src="imagePreview" alt="Preview" />
                                        </div>

                                        <input ref="fileInput" type="file" class="hidden" @change="onFileChange"
                                            accept="image/*" />

                                        <input
                                            class="w-32 border bg-gray-400 p-2 hover:cursor-pointer hover:bg-gray-300 text-center"
                                            type="button" value="Chọn ảnh" @click="$refs.fileInput.click()" />
                                    </div>
                                </div>

                                <div class="flex flex-row w-full items-center px-5 gap-4">
                                    <p class="flex-1">Tên thành phần:</p>

                                    <input v-model="form.name_ingredient" type="text"
                                        class="flex-1 border rounded px-4 py-2 w-[200px]" />
                                </div>

                                <div class="flex flex-row w-full items-center px-5 gap-4">
                                    <p class="flex-1">Đơn vị tính:</p>

                                    <select class="flex-1 border p-2" v-model="form.unit" name="unit" id="unit">
                                        <option disabled value="">-- Chọn đơn vị --</option>
                                        <option value="Kg">Kg</option>
                                        <option value="Thùng">Thùng</option>
                                        <option value="Chai">Chai</option>
                                    </select>
                                </div>

                                <div class="flex flex-row gap-2 p-2">
                                    <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                        @click="goSave" :class="{ 'opacity-50 cursor-not-allowed': isSaving }">
                                        <span v-if="isSaving">Đang lưu...</span>
                                        <span v-else>Lưu</span>
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
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted, computed, watch, reactive } from "vue";
import axios from 'axios'
import AccessDenied from '../../../../components/Admin/AccessDenied.vue'

const router = useRouter()
const route = useRoute()

const form = reactive({
    name_ingredient: '',
    unit: 1,
    image: ''
})

const isSaving = ref(false)
const imagePreview = ref(null)

function onFileChange(e) {
    const file = e.target.files[0]
    if (file) {
        form.image = file
        imagePreview.value = URL.createObjectURL(file)
    }
}

function goBack() {
    router.push({ name: 'ingredient-warehouse-admin' })
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
    if (newRole !== 'admin' && newRole !== 'manager') {
        showToast.value = true;
    }
});

async function goSave() {
    isSaving.value = true

    const formData = new FormData()
    formData.append('image', form.image)
    formData.append('name_ingredient', form.name_ingredient)
    formData.append('unit', form.unit)

    try {
        await axios.post('http:// 192.168.1.53:8888/api/admin/ingredients/create', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        alert('Đã thêm mới thành công!')
        router.push({ name: 'ingredient-warehouse-admin' })
    } catch (error) {
        console.error('Lỗi thêm:', error)
        alert('Không thể thêm.')
    } finally {
        isSaving.value = false
    }
}
</script>
