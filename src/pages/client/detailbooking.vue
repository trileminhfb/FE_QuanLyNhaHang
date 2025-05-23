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
                                'bg-green-100 text-green-800': booking.status === 1,
                                'bg-yellow-100 text-yellow-800': booking.status === 0,
                                'bg-red-100 text-red-800': booking.status === 2,
                                'bg-gray-100 text-gray-800': booking.status === 3
                            }">
                                {{ getStatusText(booking.status) }}
                            </span>
                        </p>
                    </div>

                    <div class="food-list mt-6">
                        <h3 class="text-lg font-semibold text-white mb-4">Danh Sách Món Ăn</h3>
                        <table v-if="booking.foods.length > 0">
                            <thead>
                                <tr>
                                    <th>Tên Món</th>
                                    <th>Số Lượng</th>
                                    <th>Giá</th>
                                    <th>Tổng Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="food in booking.foods" :key="food.id_foods">
                                    <td>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div class="h-16 w-12 border overflow-hidden">
                                                <img class="object-cover w-full h-full" src="/picture/food/food 1.png"
                                                    alt="Món ăn">
                                            </div>
                                            <p class="text-white">{{ food.name }}</p>
                                        </div>
                                    </td>
                                    <td>{{ food.quantity }}</td>
                                    <td>{{ formatPrice(food.quantity) }}</td>
                                    <td>{{ formatPrice(food.quantity * food.quantity) }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p v-else>Không có món ăn nào trong đặt bàn này.</p>
                    </div>

                    <h3 class="text-lg font-bold text-white mb-4">Thanh toán</h3>
                    <div class="flex flex-row gap-2">
                        <p class="text-md font-semibold text-white mb-4">Tiền cọc món (30%):</p>
                        <p class="text-md text-white mb-4"> {{ (500000).toLocaleString() }} VNĐ</p>
                    </div>
                    <div class="flex flex-row gap-2">
                        <p class="text-md font-semibold text-white mb-4">Tiền cọc bàn:</p>
                        <p class="text-md text-white mb-4"> {{ (500000).toLocaleString() }} VNĐ</p>
                    </div>
                    <div class="flex flex-row gap-2">
                        <p class="text-lg font-bold text-white mb-4">Tổng thanh toán:</p>
                        <p class="text-md text-white mb-4"> {{ (500000).toLocaleString() }} VNĐ</p>
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
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Giả lập dữ liệu JSON với giá món ăn (thêm trường price)
const jsonData = {
    "data": [
        {
            "id": 1,
            "timeBooking": "2025-05-23 21:31:18",
            "status": 1,
            "foods": [
                {
                    "id_foods": 1,
                    "name": "Phở bò",
                    "quantity": 10,
                    "price": 50000 // Giả định giá mỗi món
                },
                {
                    "id_foods": 2,
                    "name": "Phở gà",
                    "quantity": 10,
                    "price": 45000
                },
                {
                    "id_foods": 3,
                    "name": "Bún bò Huế",
                    "quantity": 10,
                    "price": 60000
                }
            ]
        },
        {
            "id": 11,
            "timeBooking": "2025-05-23 21:31:18",
            "status": 1,
            "foods": []
        },
        {
            "id": 12,
            "timeBooking": "2025-05-23 21:31:18",
            "status": 1,
            "foods": []
        }
    ]
};

const route = useRoute();
const router = useRouter();
const booking = ref(null);
const isLoading = ref(true);
const historyBookingData = route.query.data ? JSON.parse(route.query.data) : null;

// Format ngày giờ theo định dạng VN
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

// Format giá tiền theo định dạng VN
const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

// Chuyển đổi trạng thái thành văn bản
const getStatusText = (status) => {
    switch (status) {
        case 2: return 'Đã thanh toán';
        case 1: return 'Đang chờ thanh toán';
        case 4: return 'Bị hủy';
        case 3: return 'Bị từ chối';
        default: return 'Không xác định';
    }
};

const loadBookingDetail = async () => {
    const bookingId = route.params.id; // Lấy ID từ route
    try {
        if (historyBookingData && historyBookingData.id === parseInt(bookingId)) {
            booking.value = historyBookingData;
        } else {
            const selectedBooking = jsonData.data.find(item => item.id === parseInt(bookingId));
            if (selectedBooking) {
                booking.value = selectedBooking;
            } else {
                booking.value = null;
            }
        }
        isLoading.value = false;
    } catch (err) {
        console.error('Lỗi khi lấy chi tiết đặt bàn:', err);
        alert('Không thể tải chi tiết đặt bàn. Vui lòng thử lại sau.');
        isLoading.value = false;
    }
};

const payOrder = () => {
    if (!confirm('Bạn có chắc muốn thanh toán đặt bàn này không?')) return;
    alert(`Thanh toán đặt bàn ID: ${booking.value.id}`);
};

const cancelOrder = () => {
    if (!confirm('Bạn có chắc muốn hủy đặt bàn này không?')) return;
    alert(`Đã hủy đặt bàn ID: ${booking.value.id}`);
    router.push('/history');
};

const goBack = () => {
    router.push({ name: 'booking-history' })
};

onMounted(async () => {
    await loadBookingDetail();
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
    font-family: "Dancing Script", cursive;
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