<template>
    <div class="container">
        <div class="history-table">
            <div class="col-left">
                <p class="title-history">
                    <i class="fas fa-info-circle"></i>
                    Chi Tiết Đặt Bàn
                    <i class="fas fa-info-circle"></i>
                </p>

                <div class="booking-detail" v-if="isLoading">
                    <p>Đang tải dữ liệu...</p>
                </div>
                <div class="booking-detail" v-else-if="!booking">
                    <p>Không tìm thấy thông tin đặt bàn.</p>
                </div>
                <div class="booking-detail" v-else>
                    <div class="detail-info">
                        <h3 class="text-lg font-semibold text-white mb-4">Thông Tin Đặt Bàn</h3>
                        <p class="text-white"><strong>Thời Gian Đặt:</strong> {{ formatDate(booking.timeBooking) }}</p>
                        <p>
                            <strong class="text-white">Trạng Thái:</strong>
                            <span :class="{
                                'px-2 mx-2 py-1 rounded-full text-xs font-medium': true,
                                'bg-green-100 text-green-800': booking.status === 2,
                                'bg-yellow-100 text-yellow-800': booking.status === 1,
                                'bg-red-100 text-red-800': booking.status === 4,
                                'bg-gray-100 text-gray-800': booking.status === 3
                            }">
                                {{ getStatusText(booking.status) }}
                            </span>
                        </p>
                    </div>

                    <div class="food-list mt-6">
                        <h3 class="text-lg font-semibold text-white mb-4">Danh Sách Món Ăn</h3>
                        <table v-if="booking.booking_foods.length > 0">
                            <thead>
                                <tr>
                                    <th>Tên Món</th>
                                    <th>Số Lượng</th>
                                    <th>Giá</th>
                                    <th>Tổng Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in booking.booking_foods" :key="item.id_foods">
                                    <td>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div class="h-16 w-12 border overflow-hidden">
                                                <img class="object-cover w-full h-full" :src="item.food.image"
                                                    :alt="item.food.name" />
                                            </div>
                                            <p class="text-white">{{ item.food.name }}</p>
                                        </div>
                                    </td>
                                    <td>{{ item.quantity }}</td>
                                    <td>{{ formatPrice(item.food.cost) }}</td>
                                    <td>{{ formatPrice(item.quantity * item.food.cost) }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p  v-else>Không có món ăn nào trong đặt bàn này.</p>
                    </div>

                    <div class="payment-info mt-6">
                        <h3 class="text-lg font-bold text-white mb-4">Thanh Toán</h3>
                        <div class="flex flex-row gap-2">
                            <p class="text-md font-semibold text-white mb-4">Tiền cọc món (30%):</p>
                            <p class="text-md text-white mb-4">{{ formatPrice(foodDeposit) }}</p>
                        </div>
                        <div class="flex flex-row gap-2">
                            <p class="text-md font-semibold text-white mb-4">Tiền cọc bàn:</p>
                            <p class="text-md text-white mb-4">{{ formatPrice(tableDeposit) }}</p>
                        </div>
                        <div class="flex flex-row gap-2">
                            <p class="text-lg font-bold text-white mb-4">Tổng thanh toán:</p>
                            <p class="text-md text-white mb-4">{{ formatPrice(totalPayment) }}</p>
                        </div>
                    </div>

                    <div class="actions mt-6 flex flex-row gap-2 justify-center">
                        <div v-if="booking.status === 1" class="flex flex-row gap-2">
                            <button class="action-btn pay-btn" @click="payOrder">Thanh Toán</button>
                            <button class="action-btn cancel-btn" @click="cancelOrder">Hủy</button>
                        </div>
                        <button class="action-btn oder-btn" @click="goBack">Trở Lại</button>
                    </div>
                </div>
            </div>

            <div class="col-right">
                <img style="border-radius: 50%; margin-bottom: 50px;" src="/imageicon/phefood.png" alt="Hình ảnh" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const router = useRouter();
const booking = ref(null);
const isLoading = ref(true);
const auth_token = ref(localStorage.getItem('auth_token') || '');

const historyBookingData = route.query.data ? JSON.parse(route.query.data) : null;

const formatDate = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

const getStatusText = (status) => {
    switch (status) {
        case 1:
            return 'Đang chờ thanh toán';
        case 2:
            return 'Đã thanh toán';
        case 3:
            return 'Bị từ chối';
        case 4:
            return 'Bị hủy';
        default:
            return 'Không xác định';
    }
};

const foodTotal = computed(() => {
    if (!booking.value || !booking.value.booking_foods) return 0;
    return booking.value.booking_foods.reduce((total, item) => total + item.quantity * item.food.cost, 0);
});

const foodDeposit = computed(() => foodTotal.value * 0.3);
const tableDeposit = ref(50000);
const totalPayment = computed(() => foodDeposit.value + tableDeposit.value);

const loadBookingDetail = async () => {
    const bookingId = route.params.id;
    isLoading.value = true;

    try {
        if (historyBookingData && historyBookingData.id === parseInt(bookingId)) {
            booking.value = historyBookingData;
        } else {
            if (!auth_token.value) {
                alert('Vui lòng đăng nhập để xem chi tiết đặt bàn.');
                router.push({ name: 'login' });
                return;
            }
            const response = await axios.get(`http://127.0.0.1:8000/api/client/bookings/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${auth_token.value}`,
                },
            });
            booking.value = response.data.data || null;
        }
    } catch (error) {
        console.error('Lỗi khi lấy chi tiết đặt bàn:', error);
        booking.value = null;
        if (error.response?.status === 401) {
            alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('customer_id');
            router.push({ name: 'login' });
        } else {
            alert('Không thể tải chi tiết đặt bàn. Vui lòng thử lại sau.');
        }
    } finally {
        isLoading.value = false;
    }
};

const payOrder = async () => {
    if (!confirm('Bạn có chắc muốn thanh toán đặt bàn này không?')) return;
    try {
        await axios.post(
            `http://127.0.0.1:8000/api/client/bookings/${booking.value.id}/pay`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${auth_token.value}`,
                },
            }
        );
        alert(`Thanh toán đặt bàn ID: ${booking.value.id} thành công!`);
        router.push({ name: 'booking-history' });
    } catch (error) {
        console.error('Lỗi khi thanh toán:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('customer_id');
            router.push({ name: 'login' });
        } else {
            alert('Lỗi khi thanh toán. Vui lòng thử lại sau.');
        }
    }
};

const cancelOrder = async () => {
    if (!confirm('Bạn có chắc muốn hủy đặt bàn này không?')) return;
    try {
        await axios.delete(`http://127.0.0.1:8000/api/client/bookings/${booking.value.id}`, {
            headers: {
                Authorization: `Bearer ${auth_token.value}`,
            },
        });
        alert(`Đã hủy đặt bàn ID: ${booking.value.id} thành công!`);
        router.push({ name: 'booking-history' });
    } catch (error) {
        console.error('Lỗi khi hủy đặt bàn:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
            localStorage.removeItem('auth_token');
            localStorage.removeItem('customer_id');
            router.push({ name: 'login' });
        } else {
            alert('Lỗi khi hủy đặt bàn!');
        }
    }
};

const goBack = () => {
    router.push({ name: 'booking-history' });
};

onMounted(() => {
    loadBookingDetail();
});
</script>

<style scoped>
.container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: center;
}

.history-table {
    width: 100%;
    height: auto;
    background: #143b36;
    border-radius: 60px;
    display: flex;
    align-items: center;
    padding: 30px;
    gap: 40px;
}

.col-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.col-right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.col-right img {
    width: 100%;
    max-width: 400px;
    object-fit: contain;
    margin-top: 100px;
}

.title-history {
    font-family: 'Dancing Script', cursive;
    text-align: center;
    color: white;
    margin-bottom: 20px;
    font-size: 2rem;
}

.booking-detail {
    color: white;
}

.detail-info p {
    margin-bottom: 10px;
}

.food-list table {
    width: 100%;
    border-collapse: collapse;
    color: white;
}

.food-list th,
.food-list td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ccc;
}

.food-list th {
    font-weight: bold;
}

.actions {
    display: flex;
    justify-content: center;
}

.action-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    transition: background-color 0.3s;
}

.pay-btn {
    background: #28a745;
    color: white;
}

.pay-btn:hover {
    background: #218838;
}

.cancel-btn {
    background: #dc3545;
    color: white;
}

.cancel-btn:hover {
    background: #c82333;
}

.oder-btn {
    background: white;
    color: #143b36;
}

.oder-btn:hover {
    background: #f0f0f0;
}
</style>