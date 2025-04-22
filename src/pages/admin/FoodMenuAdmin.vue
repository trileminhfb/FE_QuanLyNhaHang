<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2 gap-2">
            <Search v-model="searchQuery" />
            <AddButton />
        </div>
        <div class="w-full h-full border-t border-gray-400 px-2 pt-2">
            <table class="w-full h-[30vw] table-auto font-semibold text-2xl ">
                <thead>
                    <tr class="border-2 border-gray-300">
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <Sort @sort="direction => sortBy('name', direction)" />
                                <p class="text-start w-full">Tên món</p>
                            </div>
                        </th>
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <Sort @sort="direction => sortBy('star', direction)" />
                                <p>Điểm</p>
                            </div>
                        </th>
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <Sort @sort="direction => sortBy('qty', direction)" />
                                <p>Số lượng đã đặt</p>
                            </div>
                        </th>
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <Sort @sort="direction => sortBy('price', direction)" />
                                <p>Giá</p>
                            </div>
                        </th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedItems" :key="index" class="border-2 border-gray-300">
                        <td>
                            <div class="h-full flex flex-row justify-start items-center">
                                <div class="overflow-hidden flex flex-row justify-center items-center">
                                    <img class="hover:cursor-pointer overflow-auto object-cover h-32 w-24"
                                        src="/imageicon/food 1 icon.jpg" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">{{ item.name }}</p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div v-if="item.status === 1"
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-end items-center p-1">
                                                <div class="w-6 h-6 bg-green-500 rounded-full"></div>
                                            </div>
                                            <div v-else
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-start items-center p-1">
                                                <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                                            </div>

                                            <div v-if="item.best_seller === 1">
                                                <svg class="hover:cursor-pointer w-6 h-6 text-yellow-500"
                                                    aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                                    height="24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                                </svg>
                                            </div>
                                            <div v-else>
                                                <svg class="hover:cursor-pointer w-6 h-6 text-gray-500"
                                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-width="2"
                                                        d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">{{ item.star }}</td>
                        <td class="text-center">{{ item.qty }}</td>
                        <td class="text-center">{{ item.price.toLocaleString() }} VNĐ</td>
                        <td class="text-center">
                            <div class="flex justify-center items-center h-full">
                                <div
                                    class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                    <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                            d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                    </svg>
                                    <div
                                        class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetailFoods">Chi
                                            tiết</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chỉnh sửa</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Xoá</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>

            </table>
            <Pagination :current-page="currentPage" :total-pages="totalPages" @page-changed="changePage" />

        </div>
    </div>
</template>

<script setup>

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Sort from '../../components/Admin/SortButton.vue'
import Search from '../../components/Admin/Search.vue'
import AddButton from '../../components/Admin/AddButton.vue'
import Pagination from '../../components/Admin/Pagination.vue'

const router = useRouter()
const searchQuery = ref('')
const sortKey = ref('') // 'name' hoặc 'qty'
const sortDirection = ref('') // 'asc' | 'desc'

function sortBy(key, direction) {
    sortKey.value = key
    sortDirection.value = direction
}

const filteredItems = computed(() => {
    let result = [...allItems.value]

    // Lọc theo search nếu có
    if (searchQuery.value) {
        result = result.filter(item =>
            item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
    }

    // Sắp xếp nếu có key và direction
    if (sortKey.value && sortDirection.value) {
        result.sort((a, b) => {
            if (sortDirection.value === 'asc') {
                return a[sortKey.value] > b[sortKey.value] ? 1 : -1
            } else {
                return a[sortKey.value] < b[sortKey.value] ? 1 : -1
            }
        })
    }

    return result
})


const allItems = ref([
    { name: 'Name 1', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 2', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 3', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 4', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 5', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 6', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 7', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 8', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 9', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 10', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 11', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 12', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 13', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 14', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
    { name: 'Name 15', star: Math.floor(Math.random() * 4) + 1, best_seller: Math.round(Math.random()), price: (Math.floor(Math.random() * 100) + 1) * 1000, qty: Math.floor(Math.random() * 100) + 1, status: Math.round(Math.random()) },
])

// Giải thích:
// - Math.random(): Tạo ra một số thập phân ngẫu nhiên từ 0 (bao gồm) đến 1 (không bao gồm).
// - Math.floor(Math.random() * 100): Tạo ra một số nguyên ngẫu nhiên từ 0 đến 99.
// - Math.floor(Math.random() * 100) + 1: Tạo ra một số nguyên ngẫu nhiên từ 1 đ
// - `loại ngẫu nhiên ến 100 (cho qty).
// - Math.round(Math.random()): Làm tròn số ngẫu nhiên (0 đến <1) thành 0 hoặc 1 (cho status).
// - `loại ngẫu nhiên ${index}`: Tạo tên ngẫu nhiên đơn giản.

const itemsPerPage = 5
const currentPage = ref(1)

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))

const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage
    const end = start + itemsPerPage
    return filteredItems.value.slice(start, end)
})

function changePage(page) {
    if (page >= 1 && page <= totalPages.value) { currentPage.value = page }
}

function goDetailFoods() {
    router.push('/admin/foods/details-foods')
}
</script>