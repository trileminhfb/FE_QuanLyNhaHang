<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2">
            <Search v-model="searchQuery" />
        </div>
        <div class="w-full h-full border-t border-gray-400 px-2 pt-2">
            <table class="w-full h-[30vw] table-auto font-semibold text-2xl ">
                <thead>
                    <tr class="border-2 border-gray-300">
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <Sort @sort="direction => sortBy('name', direction)" />
                                <p class="text-start w-full">Họ tên</p>
                            </div>
                        </th>
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <Sort @sort="direction => sortBy('point', direction)" />
                                <p>Điểm</p>
                            </div>
                        </th>
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <p>Ranking</p>
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
                                    <p class="ps-5 hover:cursor-pointer">{{ item.name }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">{{ item.point }}</td>
                        <td class="text-center">
                            <div v-if="item.point >= 200" class="w-full flex justify-center">
                                <p class="bg-blue-300 px-2">Diamond</p>
                            </div>
                            <div v-else-if="item.point >= 150" class="w-full flex justify-center">
                                <p class="bg-yellow-300 px-2">Gold</p>
                            </div>
                            <div v-else-if="item.point >= 100" class="w-full flex justify-center">
                                <p class="bg-gray-300 px-2">Sliver</p>
                            </div>
                            <div v-else class="w-full flex justify-center">
                                <p class="bg-red-700 px-2">Bronze</p>
                            </div>
                        </td>


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
                                        <p class="hover:bg-gray-500 text-start w-full h-full" @click="goDetailCategory">
                                            Chi
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
    { name: 'Name 1', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 2', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 3', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 4', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 5', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 6', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 7', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 8', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 9', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 10', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 11', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 12', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 13', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 14', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
    { name: 'Name 15', point: Math.floor(Math.random() * 210) + 1, status: Math.round(Math.random()) },
])

// Giải thích:
// - Math.random(): Tạo ra một số thập phân ngẫu nhiên từ 0 (bao gồm) đến 1 (không bao gồm).
// - Math.floor(Math.random() * 100): Tạo ra một số nguyên ngẫu nhiên từ 0 đến 99.
// - Math.floor(Math.random() * 100) + 1: Tạo ra một số nguyên ngẫu nhiên từ 1 đến 100 (cho qty).
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

function goDetailCustomers() {
    router.push('/admin/customers/details-customers')
}
</script>