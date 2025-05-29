<template>
  <div class="container">
    <div class="history-table">
      <div class="col-left">
        <p class="title-history">
          <i class="fas fa-history"></i>
          Lịch Sử Đặt Bàn
          <i class="fas fa-history"></i>
        </p>

        <div class="booking-list">
          <table>
            <thead>
              <tr>
                <th>Thời Gian Đặt</th>
                <th>Trạng Thái</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="3">Đang tải dữ liệu...</td>
              </tr>
              <tr v-else-if="orders.length === 0">
                <td colspan="3">Không có dữ liệu đặt bàn.</td>
              </tr>
              <tr v-else v-for="item in orders" :key="item.id">
                <td>{{ formatDate(item.timeBooking) }}</td>
                <td>
                  <span :class="{
                    'px-2 py-1 rounded-full text-xs font-medium': true,
                    'bg-green-100 text-green-800': item.status === 2,
                    'bg-yellow-100 text-yellow-800': item.status === 1,
                    'bg-red-100 text-red-800': item.status === 4,
                    'bg-gray-100 text-gray-800': item.status === 3
                  }">
                    {{ getStatusText(item.status) }}
                  </span>
                </td>
                <td>
                  <div class="flex justify-center items-center h-full">
                    <div class="w-10 h-10 text-white hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                          d="M6 12h.01m6 0h.01m5.99 0h.01" />
                      </svg>
                      <div
                        class="absolute hidden text-black font-semibold group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                        <p class="hover:bg-gray-500 hover:text-white text-start w-full p-1 rounded text-sm cursor-pointer"
                          @click="goDetail(item)">
                          Chi Tiết
                        </p>
                        <p v-if="item.status === 1"
                          class="hover:bg-gray-500 hover:text-white text-start w-full p-1 rounded text-sm cursor-pointer"
                          @click="payOrder(item)">
                          Thanh Toán
                        </p>
                        <p v-if="item.status === 1"
                          class="hover:bg-gray-500 hover:text-white text-start w-full p-1 rounded text-sm cursor-pointer"
                          @click="cancelOrder(item)">
                          Hủy
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
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
import { useRouter } from 'vue-router';
import axios from 'axios';
import api from '../../services/api';

const router = useRouter();
const orders = ref([]);
const isLoading = ref(true);

// Lấy customer_id và token từ localStorage
const customer_id = ref(localStorage.getItem('customer_id') || '');
const auth_token = ref(localStorage.getItem('auth_token') || '');

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

// Chuyển đổi trạng thái thành văn bản
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

// Lấy danh sách đặt bàn
const fetchBooking = async () => {
  if (!customer_id.value || !auth_token.value) {
    isLoading.value = false;
    orders.value = [];
    alert('Vui lòng đăng nhập để xem lịch sử đặt bàn.');
    router.push({ name: 'login' }); // Điều hướng đến trang đăng nhập
    return;
  }

  isLoading.value = true;
  try {
    const response = await axios.get(`http:// 192.168.1.53:8888/api/client/bookings/${customer_id.value}`, {
      headers: {
        Authorization: `Bearer ${auth_token.value}`,
      },
    });
    orders.value = response.data.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách đặt bàn:', error);
    orders.value = [];
    if (error.response?.status === 401) {
      alert('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('customer_id');
      router.push({ name: 'login' });
    } else {
      alert('Không thể tải danh sách đặt bàn. Vui lòng thử lại sau.');
    }
  } finally {
    isLoading.value = false;
  }
};

const goDetail = (item) => {
  router.push({
    name: 'detail-booking-history',
    params: { id: item.id },
    query: { data: JSON.stringify(item) },
  });
};

// Thanh toán đặt bàn
// Thanh toán đặt bàn
// Thanh toán đặt bàn

async function payOrder() {
  if (cartItems.value.length === 0) {
    alert("Bạn chưa chọn món nào.");
    return;
  }
  try {
    // Tạo payload chứa chi tiết đơn hàng
    const orderDetails = cartItems.value.map(item => ({
      id_food: item.id_food,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      image: item.image
    }));

    // Lấy tableId từ localStorage
    const tableId = Number(localStorage.getItem("table_id"));
    if (!tableId || isNaN(tableId)) {
      alert("Không tìm thấy thông tin bàn.");
      return;
    }

    // Lấy id_booking từ localStorage hoặc logic khác (nếu có)
    const bookingId = localStorage.getItem("booking_id") || null;

    // Gửi yêu cầu tạo hóa đơn với chi tiết đơn hàng, ghi chú và id_booking
    const res1 = await api.post('/client/invoices', {
      id_table: tableId,
      id_booking: bookingId, // Thêm id_booking
      total: tongTien.value,
      items: orderDetails,
      note: note.value || ''
    });
    const invoiceId = res1.data.data?.id;

    if (!invoiceId) {
      alert('Không thể tạo hóa đơn.');
      return;
    }

    // Gửi yêu cầu thanh toán
    const res2 = await api.get(`/client/invoices/payByTransfer/${invoiceId}`);
    const paymentUrl = res2.data.payment_url;

    window.location.href = paymentUrl; // Chuyển hướng đến trang thanh toán
  } catch (error) {
    console.error("Lỗi đặt món:", error.response?.data || error.message);
    alert("Có lỗi xảy ra khi đặt món: " + (error.response?.data?.message || 'Vui lòng thử lại.'));
  }
}
// Hủy đặt bàn
const cancelOrder = async (item) => {
  if (!confirm('Bạn có chắc muốn hủy đặt bàn ID ' + item.id + ' không?')) return;

  try {
    await api.delete(`/client/bookings/${item.id}`, {
      headers: {
        Authorization: `Bearer ${auth_token.value}`,
      },
    });
    toast.success('Đã hủy đặt bàn ID ' + item.id + ' thành công!');
    fetchBooking(); // Cập nhật danh sách
  } catch (error) {
    console.error('Lỗi khi hủy đặt bàn:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      toast.error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('customer_id');
      router.push({ name: 'login' });
    } else if (error.response?.status === 404) {
      toast.error('Không tìm thấy đặt bàn hoặc bạn không có quyền hủy.');
    } else if (error.response?.status === 400) {
      toast.error('Chỉ có thể hủy đặt bàn đang chờ thanh toán.');
    } else if (error.response?.status === 500) {
      toast.error('Lỗi server khi hủy đặt bàn. Vui lòng kiểm tra backend.');
    } else {
      toast.error('Lỗi khi hủy đặt bàn: ' + (error.response?.data?.message || 'Vui lòng thử lại sau.'));
    }
  }
}
onMounted(() => {
  fetchBooking();
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

.booking-list {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  color: white;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  font-weight: bold;
}
</style>