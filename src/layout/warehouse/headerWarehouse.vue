<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2 text-lg">
        <div class="flex flex-col gap-2">
            <p class="text-3xl font-bold uppercase">Kho quản lý</p>
            <div class="flex flex-row gap-2 font-semibold">
                <p class="bg-gray-300 w-52 text-center rounded-lg p-2 hover:bg-red-500 hover:text-white hover:cursor-pointer"
                    @click="goWarehouse">
                    Tồn kho </p>
                <p class="bg-gray-300 w-52 text-center rounded-lg p-2 hover:bg-red-500 hover:text-white hover:cursor-pointer"
                    @click="goImport">
                    Nhập kho </p>
                <p class="bg-gray-300 w-52 text-center rounded-lg p-2 hover:bg-red-500 hover:text-white hover:cursor-pointer"
                    @click="goIngredient">
                    Danh sách thành phần</p>
            </div>

        </div>
    </div>
</template>
<script setup>

import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()

function goWarehouse() {
    router.push({ name: 'menu-warehouse-admin' })
}
function goImport() {
    router.push({ name: 'import-warehouse-admin' })
}
function goIngredient() {
    router.push({ name: 'ingredient-warehouse-admin' })
}

</script>