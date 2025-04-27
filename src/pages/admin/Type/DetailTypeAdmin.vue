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
                            <p class="text-2xl ">Nướng</p>
                            <p class="font-normal">
                                Món bò lúc lắc truyền thống, thịt bò mềm ngọt xào cùng rau củ tươi ngon.
                            </p>
                            <div class="border p-2 h-96 flex flex-col gap-2 ">
                                <p>Danh sách các loại</p>
                                <div class="overflow-y-auto max-h-full">
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                    <div class="flex flex-row gap-2 justify-start items-center border">
                                        <img class="object-cover w-12 h-16" src="/picture/food/food 1.png" alt="">
                                        <p>Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                    </div>
                                </div>

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
    router.push({ name: 'admin-types' })
}

</script>