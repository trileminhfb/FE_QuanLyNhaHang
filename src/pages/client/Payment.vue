<template>
  <div class="payment-page">
    <div class="container-payment">
      <div class="row">
        <!-- Cột trái: Thông tin đơn hàng -->
        <div class="col-left">
          <h3 style="font-size: 30px;">Thông tin đơn hàng</h3>
          <div class="order-details">
            <div v-if="!orderItems || orderItems.length === 0">Không có món nào.</div>
            <div v-else>
              <ul class="header-cart">
                <li>Thông tin sản phẩm</li>
                <li>Đơn giá</li>
                <li>Số lượng</li>
                <li>Thành tiền</li>
              </ul>
              <ul>
                <li class="order-item" v-for="(item, index) in orderItems" :key="item.id || index">
                  <div class="item-col info">
                    <img :src="item.image" alt="Hình ảnh món" />
                    <span>{{ item.name || 'Không có tên' }}</span>
                  </div>
                  <div class="item-col price">
                    {{ (item.price || 0).toLocaleString() }}₫
                  </div>
                  <div class="item-col quantity">
                    {{ item.quantity || 0 }}
                  </div>
                  <div class="item-col total">
                    {{ ((item.price || 0) * (item.quantity || 0)).toLocaleString() }}₫
                  </div>
                </li>
              </ul>
              <div class="order-btn-wrapper">
                <p style="color: white;">Tổng tiền: <strong>{{ total.toLocaleString() }}₫</strong></p>
                <p v-if="note">Ghi chú: {{ note }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Cột phải: Form hóa đơn -->
        <div class="col-right">
          <div class="invoice-form">
            <h3 style="font-size: 24px;">Hoá đơn</h3>
            <div class="form-group">
              <label><strong>Khách hàng:</strong></label>
              <p>Khách vãng lai</p>
            </div>
            <div class="form-group">
              <label><strong>Ảnh khách hàng:</strong></label>
              <div class="customer-img">
                <img src="https://via.placeholder.com/60" alt="Ảnh khách hàng" />
              </div>
            </div>
            <div class="form-group">
              <label><strong>Chi tiết hóa đơn:</strong></label>
              <div class="invoice-details">
                <p><strong>Số bàn:</strong> {{ tableId }}</p>
                <p><strong>Tên chương trình giảm giá:</strong> {{ selectedSale ? selectedSale.nameSale : 'Không có' }}</p>
                <p><strong>Trạng thái:</strong> Đang sử dụng</p>
                <p><strong>Thời gian đặt:</strong> {{ orderTime }}</p>
                <p><strong>Tổng tiền món:</strong> {{ total.toLocaleString() }}₫</p>
                <p><strong>VAT (10%):</strong> {{ vat.toLocaleString() }}₫</p>
                <p><strong>Giảm giá ({{ selectedSale ? selectedSale.percent : 0 }}%):</strong> {{ discount.toLocaleString() }}₫</p>
                <p><strong>Giảm giá Rank (0%):</strong> 0₫</p>
                <p><strong>Điểm nhận được (5%):</strong> {{ points.toLocaleString() }}</p>
                <p><strong>Tổng thanh toán:</strong> {{ finalTotal.toLocaleString() }}₫</p>
              </div>
            </div>
            <div class="form-actions">
              <button class="btn-pay" :disabled="total === 0" @click="thanhToan">Thanh toán</button>
              <button class="btn-back" @click="goBack">Trở về</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../services/api';
import { fetchCart, cartItems } from '../../stores/cartStore';

const route = useRoute();
const router = useRouter();
const orderItems = ref([]);
const total = ref(0);
const tableId = ref(0);
const note = ref('');
const orderTime = ref('2025-05-25 11:21:09');
const vat = ref(0);
const discount = ref(0);
const points = ref(0);
const finalTotal = ref(0);
const selectedSale = ref(null);

const calculateTotals = () => {
  vat.value = total.value * 0.1; // VAT 10%
  const discountPercent = selectedSale.value ? selectedSale.value.percent / 100 : 0;
  discount.value = total.value * discountPercent; // Giảm giá theo phần trăm
  points.value = total.value * 0.05; // Điểm 5%
  finalTotal.value = total.value + vat.value - discount.value; // Tổng thanh toán
};

const loadCartData = async () => {
  console.log('Query params:', route.query); // Debug query params
  const items = route.query.items;
  const totalQuery = route.query.total;
  const tableIdQuery = route.query.tableId;
  const noteQuery = route.query.note;
  const saleQuery = route.query.sale;

  if (items && totalQuery && tableIdQuery) {
    try {
      orderItems.value = JSON.parse(items);
      total.value = Number(totalQuery);
      tableId.value = Number(tableIdQuery);
      note.value = noteQuery || '';
      selectedSale.value = saleQuery ? JSON.parse(saleQuery) : null;

      console.log('Parsed data:', { orderItems: orderItems.value, total: total.value, selectedSale: selectedSale.value }); // Debug parsed data

      if (!orderItems.value.length || total.value <= 0) {
        alert('Dữ liệu đơn hàng không hợp lệ. Vui lòng kiểm tra giỏ hàng.');
        router.push({ name: 'users-shoppingCart' });
        return;
      }

      localStorage.setItem('paymentCart', JSON.stringify({
        items: orderItems.value,
        total: total.value,
        tableId: tableId.value,
        note: note.value,
        sale: selectedSale.value
      }));
    } catch (error) {
      console.error('Lỗi khi parse query params:', error);
      alert('Lỗi xử lý dữ liệu đơn hàng. Vui lòng thử lại.');
      router.push({ name: 'users-shoppingCart' });
      return;
    }
  } else {
    const savedCart = localStorage.getItem('paymentCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        orderItems.value = parsedCart.items || [];
        total.value = parsedCart.total || 0;
        tableId.value = parsedCart.tableId || 0;
        note.value = parsedCart.note || '';
        selectedSale.value = parsedCart.sale || null;

        console.log('Loaded from localStorage:', parsedCart); // Debug localStorage data

        if (!orderItems.value.length || total.value <= 0) {
          alert('Dữ liệu đơn hàng từ bộ nhớ không hợp lệ. Vui lòng kiểm tra giỏ hàng.');
          router.push({ name: 'users-shoppingCart' });
          return;
        }
      } catch (error) {
        console.error('Lỗi khi parse localStorage:', error);
      }
    } else {
      try {
        await fetchCart();
        orderItems.value = cartItems.value.map(item => ({
          id_food: item.id_food,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
          image: item.image
        }));
        total.value = orderItems.value.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
        tableId.value = Number(localStorage.getItem("table_id")) || 0;
        note.value = '';
        selectedSale.value = null;

        console.log('Loaded from API:', { orderItems: orderItems.value, total: total.value }); // Debug API data

        if (!orderItems.value.length || total.value <= 0) {
          alert('Hóa đơn Giỏ hàng của bạn đang trống . Vui lòng kiểm tra giỏ hàng của bạn.');
          return;
        }

        localStorage.setItem('paymentCart', JSON.stringify({
          items: orderItems.value,
          total: total.value,
          tableId: tableId.value,
          note: note.value,
          sale: selectedSale.value
        }));
      } catch (error) {
        console.error('Lỗi khi fetch giỏ hàng:', error);
        alert('Không thể tải dữ liệu giỏ hàng.');
        router.push({ name: 'users-shoppingCart' });
        return;
      }
    }
  }
  calculateTotals();
};

const thanhToan = async () => {
  if (total.value <= 0) {
    alert('Không thể thanh toán vì tổng tiền bằng 0.');
    return;
  }
  try {
    // 1. Gửi yêu cầu tạo hóa đơn
    const res1 = await api.post('/client/invoices', {
      id_table: tableId.value,
      total: finalTotal.value,
      items: orderItems.value,
      note: note.value,
      sale_id: selectedSale.value ? selectedSale.value.id : null
    });

    const invoiceId = res1.data.data?.id;
    if (!invoiceId) {
      alert('Không thể tạo hóa đơn.');
      return;
    }

    // 2. Xoá giỏ hàng theo id bàn
    await api.delete(`/client/carts/by-table/${tableId.value}`);

    // 3. Gọi API lấy URL thanh toán chuyển khoản
    const res2 = await api.get(`/client/invoices/payByTransfer/${invoiceId}`);
    const paymentUrl = res2.data.payment_url;

    // 4. Xoá localStorage cache
    localStorage.removeItem('paymentCart');

    // 5. Điều hướng người dùng tới trang thanh toán
    window.location.href = paymentUrl;

  } catch (error) {
    console.error("Lỗi thanh toán:", error);
    alert("Có lỗi xảy ra khi thanh toán. Vui lòng thử lại.");
  }
};


const goBack = () => {
  router.push({ name: 'users-shoppingCart' });
};

onMounted(() => {
  loadCartData();
});
</script>

<style scoped>
.payment-page {
  background-color: #143b36;
  height: 100vh;
  padding: 20px;
  color: white;
}

.container-payment {
  margin: 0 auto;
  width: 1300px;
}

.row {
  display: flex;
  gap: 20px;
}

.col-left {
  width: 65%;
}

.order-details {
  margin-top: 20px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 10px;
}

.header-cart {
  display: flex;
  color: white;
  font-weight: bold;
  border-bottom: 2px solid white;
  padding-bottom: 10px;
}

.header-cart li {
  list-style: none;
  text-align: center;
  flex: 2 1 40%;
}

.header-cart li:nth-child(2),
.header-cart li:nth-child(3),
.header-cart li:nth-child(4) {
  flex: 1 1 20%;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}

.item-col {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.item-col.info {
  flex: 2 1 40%;
  justify-content: flex-start;
  gap: 10px;
}

.item-col.price,
.item-col.quantity,
.item-col.total {
  flex: 1 1 20%;
}

.item-col.info img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-left: 10px;
}

.order-btn-wrapper {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-end;
}

.col-right {
  width: 35%;
}

.invoice-form {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  color: #143b36;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group p {
  margin: 0;
  font-size: 14px;
}

.customer-img img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ccc;
}

.invoice-details p {
  margin: 5px 0;
  font-size: 14px;
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-pay,
.btn-back {
  color: #fff;
  background-color: #d69c52;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 3px 6px #a37b44;
  height: 40px;
  width: 120px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
}

.btn-pay:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.btn-back {
  background-color: #6c757d;
}

.btn-pay:hover:not(:disabled) {
  background-color: #c58a3c;
  box-shadow: 0 5px 10px #a37b44;
}

.btn-back:hover {
  background-color: #5a6268;
  box-shadow: 0 5px 10px #4a4e52;
}
</style>