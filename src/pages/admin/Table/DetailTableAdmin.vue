<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <div class=" uppercase font-bold text-2xl">
                Chi tiết kiểu
            </div>
            <div class="w-[70vw] h-full flex justify-center items-start text-xl">
                <div class="w-full border h-fit flex flex-col">
                    <div class="flex-1 border flex flex-row">
                        <div class="border flex flex-[2] flex-col p-2">
                            <div class="flex flex-row gap-2 items-center">
                                <p class="text-2xl ">Bàn 16</p>
                                <p class="text-2xl bg-yellow-500 p-2">Đang sử dụng</p>
                            </div>
                            <div class="flex flex-row gap-2 p-2">
                                <div
                                    class="bg-green-500 rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-green-300">
                                    Chỉnh sửa
                                </div>
                                <div
                                    class="bg-red-500 rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-red-300">
                                    Xoá
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
import { useRouter } from 'vue-router'
const router = useRouter()

function goBack() {
    router.push({ name: 'admin-tables' })

}

</script>