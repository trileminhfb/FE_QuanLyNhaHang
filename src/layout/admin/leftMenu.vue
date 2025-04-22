<template>
    <div
        class="h-[calc(100vh-100px)] w-[300px] fixed z-0 mt-20 flex flex-col gap-2 font-bold text-2xl ps-2 pt-2 text-black">
        <div class="flex flex-row gap-2 bg-gray-300 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer"
            @click="goHome">
            <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
                <img class="w-12 h-12 object-cover" src="/imageicon/home icon.png" alt="">
            </div>
            <p>
                Trang chủ
            </p>
        </div>
        <div class="flex flex-row gap-2 bg-gray-300 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer"
            @click="goFood">
            <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
                <img class="w-12 h-12 object-cover" src="/imageicon/food icon.png" alt="">
            </div>
            <p>
                Món ăn
            </p>
        </div>
        <div class="flex flex-row gap-2 bg-gray-300 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer"
            @click="goCategory">
            <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
                <img class="w-12 h-12 object-cover" src="/imageicon/category icon.png" alt="">
            </div>
            <p>
                Loại
            </p>
        </div>
        <div class="flex flex-row gap-2 bg-gray-300 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer"
            @click="goType">
            <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
                <img class="w-12 h-12 object-cover" src="/imageicon/category icon.png" alt="">
            </div>
            <p>
                Kiểu
            </p>
        </div>
        <div class="flex flex-row gap-2 bg-gray-300 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer"
            @click="goTable">
            <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
                <img class="w-12 h-12 object-cover" src="/imageicon/table icon.png" alt="">
            </div>
            <p>
                Bàn
            </p>
        </div>
        <div class="flex flex-row gap-2 bg-gray-300 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer"
            @click="goCustomer">
            <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
                <img class="w-12 h-12 object-cover" src="/imageicon/customer icon.png" alt="">
            </div>
            <p>
                Khách hàng
            </p>
        </div>
        <div class="flex flex-row gap-2 bg-gray-300 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer"
            @click="goUser">
            <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
                <img class="w-12 h-12 object-cover" src="/imageicon/staff icon.png" alt="">
            </div>
            <p>
                Nhân viên
            </p>
        </div>
        <div
            class="flex flex-row gap-2 bg-gray-300 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer">
            <div class="rounded-full border-black border-2 h-16 w-16 overflow-hidden flex justify-center items-center">
                <img class="w-12 h-12 object-cover" src="/imageicon/warehouse icon.png" alt="">
            </div>
            <p>
                Kho
            </p>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
    router.push('/admin')
}

function goFood() {
    router.push('/admin/foods')
}

function goUser() {
    router.push('/admin/users')
}

function goTable() {
    router.push('/admin/tables')
}

function goType() {
    router.push('/admin/types')
}

function goCategory() {
    router.push('/admin/categories')
}

function goCustomer() {
    router.push('/admin/customer')
}
</script>
