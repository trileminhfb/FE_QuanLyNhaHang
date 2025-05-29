<template>
    <div v-if="user.role === 'admin' || user.role === 'manager'"
        class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-semibold">
            <!-- Tiêu đề hóa đơn -->
            <div class="flex flex-row uppercase font-bold text-2xl mb-4">
                <p>ID #</p>
                <p class="text-red-500">{{ invoiceData?.id || 'N/A' }}</p>
            </div>

            <div class="w-full h-full flex flex-col">
                <div class="w-full h-full flex flex-row p-2 border rounded-lg">
                    <div class="flex flex-row gap-2 w-full">
                        <!-- Danh sách món ăn -->
                        <div class="flex-[3] flex flex-col w-full h-full border rounded-lg gap-2 p-2">
                            <div class="w-full h-full">
                                <div class="overflow-y-auto max-h-full">
                                    <table class="w-full h-fit table-auto text-sm">
                                        <thead>
                                            <tr class="border-2 bg-gray-100">
                                                <th class="ps-2 text-start py-2">Tên món</th>
                                                <th class="py-2">Số lượng</th>
                                                <th class="py-2">Giá</th>
                                                <th class="py-2">Tổng giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="foodItem in invoiceData?.invoice_foods" :key="foodItem.id"
                                                class="border-2 hover:bg-gray-50">
                                                <td>
                                                    <div class="h-full flex flex-row justify-start items-center ps-2">
                                                        <div
                                                            class="overflow-hidden flex flex-row justify-center items-center">
                                                            <img class="hover:cursor-pointer object-cover h-16 w-10"
                                                                :src="foodItem.food?.image || '/imageicon/food-placeholder.png'"
                                                                :alt="foodItem.food?.name" />
                                                            <div class="ps-5 flex flex-col gap-5">
                                                                <p class="hover:cursor-pointer">{{ foodItem.food?.name
                                                                    ||
                                                                    'N/A' }}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td class="text-center">{{ foodItem?.quantity || 0 }}</td>
                                                <td class="text-center">{{ (foodItem?.food?.cost || 0).toLocaleString()
                                                    }}
                                                </td>
                                                <td class="text-center">{{ (foodItem?.quantity * foodItem?.food?.cost ||
                                                    0).toLocaleString() }}</td>
                                            </tr>
                                            <tr v-if="!invoiceData?.invoice_foods?.length" class="border-2">
                                                <td colspan="4" class="text-center py-4">Không có món ăn nào được đặt
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- Thông tin hóa đơn -->
                        <div class="flex-1 w-full h-full flex flex-col gap-2 p-2">
                            <div class="font-bold text-xl uppercase">Hoá đơn</div>
                            <div class="flex flex-col gap-2 border rounded-lg p-4">
                                <p class="font-medium">Khách hàng</p>
                                <div class="flex flex-row items-center gap-3 w-full">
                                    <img class="w-20 h-20 rounded-full object-cover"
                                        :src="invoiceData?.customer?.image || '/imageicon/staff icon.png'"
                                        alt="Ảnh khách hàng">
                                    <p>{{ invoiceData?.customer?.FullName || 'Khách vãng lai' }}</p>
                                </div>
                            </div>

                            <div class="flex flex-col gap-2 border rounded-lg p-4">
                                <div class="font-bold">Chi tiết hóa đơn</div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Số bàn</p>
                                    <p>{{ invoiceData?.table?.number ?? 'Không xác định' }}</p>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Người tính tiền</p>
                                    <p>{{ invoiceData?.user?.name || 'Chưa xác định' }}</p>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Tên chương trình giảm giá</p>
                                    <p>{{ invoiceData?.sale?.nameSale || 'Không có' }}</p>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Trạng thái</p>
                                    <div class="text-white">
                                        <p v-if="invoiceData?.status === 1" class="bg-yellow-500 p-2 rounded">Đang sử
                                            dụng</p>
                                        <p v-else-if="invoiceData?.status === 2" class="bg-green-500 p-2 rounded">Hoàn
                                            thành</p>
                                        <p v-else-if="invoiceData?.status === 3" class="bg-red-500 p-2 rounded">Bị huỷ
                                        </p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Thời gian đặt</p>
                                    <p class="font-normal">{{ formatToLocalDatetime(invoiceData?.created_at) || 'N/A' }}
                                    </p>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Tổng tiền món</p>
                                    <div class="flex flex-row font-normal">
                                        <p>{{ calculateTotal(invoiceData?.invoice_foods).toLocaleString() }}</p>
                                        <p class="text-sm ms-1">VNĐ</p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">VAT (10%)</p>
                                    <div class="flex flex-row font-normal">
                                        <p>{{ calculateVAT(invoiceData?.invoice_foods).toLocaleString() }}</p>
                                        <p class="text-sm ms-1">VNĐ</p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Giảm giá ({{ invoiceData?.sale?.percent || 0 }}%)</p>
                                    <div class="flex flex-row font-normal">
                                        <p>{{ calculateDiscount(invoiceData?.invoice_foods,
                                            invoiceData?.sale).toLocaleString() }}</p>
                                        <p class="text-sm ms-1">VNĐ</p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Giảm giá Rank ({{ getRankSale }}%)</p>
                                    <div class="flex flex-row font-normal">
                                        <p>{{ calculateRankDiscount(invoiceData?.invoice_foods,
                                            getRankSale).toLocaleString() }}</p>
                                        <p class="text-sm ms-1">VNĐ</p>
                                    </div>
                                </div>
                                <div class="flex flex-row justify-between w-full">
                                    <p class="font-medium">Điểm nhận được (5%)</p>
                                    <p class="font-normal">{{
                                        calculateRewardPoints(invoiceData?.invoice_foods).toLocaleString() }}</p>
                                </div>
                            </div>
                            <div class="flex flex-row gap-2 justify-between border rounded-lg p-4">
                                <p>Tổng thanh toán</p>
                                <div class="flex flex-row text-red-500">
                                    <p>{{ calculateFinalTotal(invoiceData?.invoice_foods,
                                        invoiceData?.sale).toLocaleString() }}</p>
                                    <p class="text-sm ms-1">VNĐ</p>
                                </div>
                            </div>

                            <div class="flex flex-row gap-2 border rounded-lg p-2">
                                <!-- Nếu status là 1 -->
                                <template v-if="invoiceData?.status === 1">
                                    <div class="bg-green-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-green-600"
                                        @click="updateInvoiceStatus(2)">
                                        Thanh toán
                                    </div>
                                    <div class="bg-red-500 text-white rounded-lg p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-red-600"
                                        @click="updateInvoiceStatus(3)">
                                        Huỷ
                                    </div>
                                    <div class="rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                        @click="goBack">
                                        Trở về
                                    </div>
                                </template>
                                <!-- Nếu status là 2 hoặc 3 -->
                                <template v-else-if="invoiceData?.status === 2 || invoiceData?.status === 3">
                                    <div class="rounded-lg border p-2 flex justify-center items-center flex-1 hover:cursor-pointer hover:bg-gray-300"
                                        @click="goBack">
                                        Trở về
                                    </div>
                                </template>
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
import axios from 'axios'
import { ref, onMounted, computed, watch, reactive } from "vue";
import AccessDenied from '../../../components/Admin/AccessDenied.vue'
import api from "../../../services/api";

const router = useRouter()
const route = useRoute()
const showToast = ref(false);
const invoiceData = ref(route.query.data ? JSON.parse(route.query.data) : null)

function formatToLocalDatetime(isoString) {
    if (!isoString) return 'N/A'
    const date = new Date(isoString)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

function calculateTotal(items) {
    if (!items || !items.length) return 0
    return items.reduce((total, foodItem) => total + (foodItem?.quantity || 0) * (foodItem.food?.cost || 0), 0)
}

function calculateRewardPoints(items) {
    const points = (calculateTotal(items) * 0.05) / 1000
    return Math.round(points)
}

function calculateVAT(items) {
    return calculateTotal(items) * 0.1
}

function calculateDiscount(items, sale) {
    return calculateTotal(items) * (sale?.percent || 0) / 100
}

function calculateRankDiscount(items, salePercent) {
    return calculateTotal(items) * (salePercent || 0) / 100
}

function calculateFinalTotal(items, sale) {
    const total = calculateTotal(items)
    const vat = calculateVAT(items)
    const saleDiscount = calculateDiscount(items, sale)
    const rankDiscount = calculateRankDiscount(items, getRankSale.value)
    return total + vat - saleDiscount - rankDiscount
}

const allRanks = ref([])
const getRankSale = computed(() => {
    if (!invoiceData.value?.customer?.id_rank || !allRanks.value.length) return 0
    const rank = allRanks.value.find(r => r.id === invoiceData.value.customer.id_rank)
    return rank?.saleRank || 0
})

const fetchRank = async () => {
    try {
        const response = await axios.get('http:// 192.168.1.53:8888/api/admin/ranks')
        allRanks.value = Array.isArray(response.data) ? response.data : response.data?.data || []
    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu rank:', error)
        alert('Không thể tải dữ liệu rank!')
    }
}

const user = ref({
    role: 'N/A',
});

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

onMounted(() => {
    fetchRank();
    fetchUserProfile();
})

function goBack() {
    router.push({ name: 'admin-invoice' })
}

async function updateInvoiceStatus(newStatus) {
    if (!invoiceData.value?.id) {
        alert('Hóa đơn không hợp lệ!')
        return
    }

    // Lấy user từ localStorage
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (!currentUser?.id) {
        alert('Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại!')
        return
    }

    const payload = {
        id_table: invoiceData.value?.table?.id || null,
        id_user: currentUser.id,
        total: calculateFinalTotal(invoiceData.value?.invoice_foods, invoiceData.value?.sale),
        timeEnd: new Date().toISOString().slice(0, 19).replace('T', ' '),
        id_customer: invoiceData.value?.customer?.id || null,
        status: newStatus,
        foods: invoiceData.value?.invoice_foods?.map(item => ({
            id: item.food.id,
            quantity: item.quantity
        })) || []
    }

    try {
        const response = await axios.put(`http:// 192.168.1.53:8888/api/admin/invoices/${invoiceData.value.id}`, payload)

        if (newStatus === 2 && invoiceData.value?.customer?.id) {
            await axios.put(`http:// 192.168.1.53:8888/api/admin/customers/${invoiceData.value.customer.id}/add-point`, {
                point: calculateRewardPoints(invoiceData.value.invoice_foods)
            })
        }

        invoiceData.value.status = newStatus
        invoiceData.value.user = { id: currentUser.id, name: currentUser.name || 'Unknown User' }

        alert(newStatus === 2 ? 'Thanh toán thành công!' : 'Hủy hóa đơn thành công!')
        router.push({ name: 'admin-invoice' })
    } catch (error) {
        console.error('Lỗi khi cập nhật hóa đơn:', error.response?.data || error.message)
        alert(`Cập nhật trạng thái thất bại: ${error.response?.data?.message || 'Lỗi không xác định'}`)
    }
}

watch(() => user.value.role, (newRole) => {
    if (newRole !== 'admin' && newRole !== 'manager') {
        showToast.value = true;

    }
});
</script>