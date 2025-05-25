```vue
<template>
  <div class="payment-history">
    <div class="container-paymentHistory">
      <h3 style="font-size: 30px; color: white;">Lịch sử thanh toán 💳</h3>
      <div class="history-list">
        <div v-if="invoices.length === 0" class="no-history">
          Chưa có lịch sử thanh toán.
        </div>
        <div v-else>
          <div v-for="invoice in invoices" :key="invoice.id" class="invoice-card">
            <div class="invoice-header">
              <h4>Hóa đơn #{{ invoice.id }} - Bàn {{ invoice.table.number }}</h4>
              <span class="time">{{ formatDateTime(invoice.timeEnd) }}</span>
            </div>
            <div class="invoice-body">
              <ul class="food-list">
                <li v-for="food in invoice.invoice_foods" :key="food.id">
                  <img :src="food.food.image" alt="Hình ảnh món" />
                  <div class="food-info">
                    <span>{{ food.food.name }}</span>
                    <span>{{ food.quantity }} x {{ food.food.cost.toLocaleString() }}₫</span>
                  </div>
                </li>
              </ul>
              <div class="invoice-details">
                <p v-if="invoice.sale">
                  Mã giảm giá: {{ invoice.sale.nameSale }} (Giảm {{ invoice.sale.percent }}%)
                </p>
                <p>Tổng tiền: <strong>{{ invoice.total.toLocaleString() }}₫</strong></p>
                <p>Trạng thái: <span :class="statusClass(invoice.status)">{{
                  statusText(invoice.status) }}</span></p>
                <button v-if="invoice.status === 1" class="btn-pay" @click="payInvoice(invoice.id)">
                  Thanh toán
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useToast } from 'vue-toastification';
import { useRoute, useRouter } from 'vue-router';
import api from '../../services/api';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const invoices = ref([]);

// Lấy customer_id từ localStorage
const customerId = localStorage.getItem('customer_id');

// Lấy danh sách hóa đơn
const fetchInvoices = async () => {
  if (!customerId) {
    toast.error('Vui lòng đăng nhập để xem lịch sử thanh toán.');
    router.push('/login');
    return;
  }

  try {
    const response = await api.get(`/client/invoices/${customerId}`);
    invoices.value = response.data.data || [];
    // Sắp xếp theo thời gian giảm dần
    invoices.value.sort((a, b) => new Date(b.timeEnd) - new Date(a.timeEnd));
  } catch (error) {
    console.error('Lỗi khi lấy lịch sử thanh toán:', error);
    toast.error('Không thể tải lịch sử thanh toán. Vui lòng thử lại.');
    invoices.value = [];
  }
};

// Xử lý thanh toán
const payInvoice = async (invoiceId) => {
  try {
    const response = await api.get(`/client/invoices/payByTransfer/${invoiceId}`);
    console.log('PayOS response:', response.data); // Debug response
    const paymentUrl = response.data.payment_url;
    if (paymentUrl) {
      window.location.href = paymentUrl;
    } else {
      throw new Error('Không tìm thấy URL thanh toán');
    }
  } catch (error) {
    console.error('Lỗi khi tạo thanh toán PayOS:', error);
    toast.error('Không thể tạo mã QR thanh toán. Vui lòng thử lại.');
  }
};

// Định dạng ngày giờ
const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleString('vi-VN', {
    dateStyle: 'short',
    timeStyle: 'short'
  });
};

// Chuyển đổi trạng thái thành văn bản
const statusText = (status) => {
  switch (status) {
    case 1:
      return 'Đang sử dụng';
    case 2:
      return 'Đã thanh toán';
    case 3:
      return 'Đã hủy';
    default:
      return 'Không xác định';
  }
};

// Áp dụng class cho trạng thái
const statusClass = (status) => {
  switch (status) {
    case 1:
      return 'status-pending';
    case 2:
      return 'status-paid';
    case 3:
      return 'status-canceled';
    default:
      return '';
  }
};

// Tính tổng tiền trước giảm giá
const originalTotal = computed(() => (invoice) => {
  if (!invoice.sale) return invoice.total;
  const discountPercent = parseFloat(invoice.sale.percent);
  return Math.round(invoice.total / (1 - discountPercent / 100));
});

onMounted(() => {
  fetchInvoices();
  // Kiểm tra query status từ trang thanh toán
  const status = route.query.status;
  if (status === 'success') {
    toast.success('Thanh toán thành công!');
    fetchInvoices(); // Làm mới danh sách hóa đơn
    router.replace({ query: {} });
  } else if (status === 'error') {
    toast.error('Thanh toán thất bại. Vui lòng thử lại.');
    router.replace({ query: {} });
  }
});
</script>

<style scoped>
.payment-history {
  background-color: #143b36;
  min-height: 100vh;
  padding: 20px;
}

.container-paymentHistory {
  margin: 0 auto;
  max-width: 1300px;
}

.history-list {
  margin-top: 20px;
}

.no-history {
  color: white;
  text-align: center;
  font-size: 18px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.invoice-card {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid white;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  color: white;
}

.invoice-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.invoice-header h4 {
  margin: 0;
  font-size: 20px;
}

.invoice-header .time {
  font-size: 14px;
  color: #d69c52;
}

.invoice-body {
  display: flex;
  gap: 20px;
}

.food-list {
  flex: 2;
  list-style: none;
  padding: 0;
}

.food-list li {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.food-list img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
}

.food-info {
  display: flex;
  flex-direction: column;
}

.food-info span:first-child {
  font-weight: 500;
}

.food-info span:last-child {
  color: #ccc;
}

.invoice-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.invoice-details p {
  margin: 0;
}

.status-pending {
  color: #d69c52;
}

.status-paid {
  color: #28a745;
}

.status-canceled {
  color: #dc3545;
}

.btn-pay {
  color: #fff;
  background-color: #d69c52;
  padding: 8px 15px;
  font-size: 14px;
  border-radius: 5px;
  box-shadow: 0 3px 6px #a37b44;
  width: 120px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  border: none;
  cursor: pointer;
  align-self: flex-end;
}

.btn-pay:hover {
  background-color: #c58a3c;
  box-shadow: 0 5px 10px #a37b44;
}
</style>
```