<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-44 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class="w-[30vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2 gap-2">
                            <div class="flex flex-row px-5 gap-2">
                                <p class="w-full">Hình ảnh:</p>
                                <div class="w-32 h-32 flex justify-center items-center overflow-hidden border">
                                    <img class=" w-full h-full object-cover" src="" alt="hình ảnh">
                                </div>
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
                                <p class="flex-1">Tên thành phần:</p>

                                <input class="flex-1 border p-2" v-model="form.name_ingredient"
                                    :placeholder="ingredientWarehouseData?.name_ingredient" type="text">
                            </div>
                            <div class="flex flex-row w-full items-center px-5">
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
                                    @click="goSave(ingredientWarehouseData)">
                                    Lưu
                                </div>
                                <div class="bg-red-500 rounded-lg p-2 flex justify-center items-center flex-1 text-white hover:text-black hover:cursor-pointer hover:bg-red-300"
                                    @click="goDelete(ingredientWarehouseData)">
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
import { ref } from 'vue'
import ConfirmDelete from '../../../../components/Admin/ConfirmDelete.vue';

const router = useRouter()
const route = useRoute()
const ingredientWarehouseData = route.query.data ? JSON.parse(route.query.data) : null;
const showConfirm = ref(false)

function goBack() {
    router.push({ name: 'ingredient-warehouse-admin' })
}

const form = ref({
    id: ingredientWarehouseData?.id || '',
    unit: ingredientWarehouseData?.unit || '',
    name_ingredient: ingredientWarehouseData?.name_ingredient || ''
})

async function goSave() {
    try {
        const response = await axios.put(
            `http://127.0.0.1:8000/api/admin/ingredients/update/${form.value.id}`,
            {
                id: form.value.id,
                unit: form.value.unit,
                name_ingredient: form.value.name_ingredient
            }
        )

        if (response.data.status === 1) {
            alert(response.data.message || "Cập nhật thành công!")
            router.push({ name: 'ingredient-warehouse-admin' })
        } else {
            alert("Cập nhật thất bại.")
        }

    } catch (error) {
        console.error("Lỗi khi lưu:", error)
        alert("Đã xảy ra lỗi khi lưu dữ liệu.")
    }
}


// function goDelete() {
//     showConfirm.value = true
// }

// function confirmDelete() {
//     showConfirm.value = false

//     console.log('Đã xác nhận xoá kiểu món ăn')
//     router.push({ name: 'menu-warehouse-admin' })
// }

// function cancelDelete() {
//     showConfirm.value = false
// }

</script>