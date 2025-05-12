<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <!-- Hình ảnh thành phần -->
                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Hình ảnh:</p>
                                <div class="">
                                    <img class="" src="" alt="">
                                </div>
                            </div>

                            <!-- Tên thành phần -->
                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Tên thành phần:</p>
                                <input v-model="form.quantity" type="text"
                                    class="flex-1 border rounded px-4 py-2 w-[200px]" />
                            </div>

                            <!-- Đơn vị tính -->
                            <div class="flex flex-row w-full items-center px-5 gap-4">
                                <p class="flex-1">Đơn vị tính:</p>
                                <select class="flex-1 border rounded px-4 py-2 w-[200px]" name="" id=""></select>
                            </div>

                            <div class="flex flex-row gap-2 p-2">
                                <div class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-green-300"
                                    @click="goSave" :class="{ 'opacity-50 cursor-not-allowed': isSaving }">
                                    <span v-if="isSaving">Đang lưu...</span>
                                    <span v-else>Lưu</span>
                                </div>

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
import { ref } from 'vue'
import axios from 'axios'
import { onMounted } from 'vue'
const allItems = ref([])

const router = useRouter()
const route = useRoute()

function goBack() {
    router.push({ name: 'import-warehouse-admin' })
}

const form = ref({
    number: '',
    status: 1
})

async function goSave() {
    try {
        await axios.post('http://127.0.0.1:8000/api/admin/ingredients/create', form.value)
        alert('Đã thêm mới thành công!')
        router.push({ name: 'admin-tables' })
    } catch (error) {
        console.error('Lỗi thêm:', error)
        alert('Không thể thêm.')
    }
}

</script>
