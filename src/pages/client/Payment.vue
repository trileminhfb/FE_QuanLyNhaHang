<template>
  <div class="payment-page">
    <div class="container-payment">
      <div class="row">
        <!-- Cột trái: Thông tin đơn hàng -->
        <div class="col-left">
          <h3>Thông tin đơn hàng</h3>
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
            <h3>Hoá đơn</h3>
            <div class="form-group">
              <label><strong>Khách hàng:</strong></label>
              <p > <strong style="color: blue; font-size: 20px;">{{ customerFullName }}</strong></p>
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

const customerFullName = ref('');
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
  console.log('Query params:', route.query);
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

        if (!orderItems.value.length || total.value <= 0) {
          alert('Giỏ hàng trống hoặc dữ liệu không hợp lệ. Vui lòng kiểm tra.');
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
    const customerId = localStorage.getItem('customer_id');
    if (!customerId) {
      alert('Không tìm thấy thông tin khách hàng. Vui lòng đăng nhập lại.');
      return;
    }

    const userId = localStorage.getItem('userId');
    const invoiceData = {
      id_customer: Number(customerId),
      id_table: tableId.value,
      total: finalTotal.value,
      items: orderItems.value,
      note: note.value,
      sale_id: selectedSale.value ? selectedSale.value.id : null,
      user_id: userId || null
    };

    console.log('Sending invoice data:', invoiceData);

    const res1 = await api.post('/client/invoices', invoiceData);
    const invoiceId = res1.data.data?.id;

    if (!invoiceId) {
      alert('Không thể tạo hóa đơn.');
      return;
    }

    const res2 = await api.get(`/client/invoices/payByTransfer/${invoiceId}`);
    const paymentUrl = `${res2.data.payment_url}`;
    localStorage.removeItem('paymentCart');
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
  // Giữ nguyên logic hiển thị tên khách hàng
  customerFullName.value = localStorage.getItem('customer_fullName') ;
  loadCartData();
});
</script>
<style scoped>
.payment-page {
  background-color: #143b36;
  min-height: 100vh;
  padding: 1rem;
  color: white;
  display: flex;
  flex-direction: column;
}

.container-payment {
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  flex-grow: 1;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
}

.col-left, .col-right {
  flex: 1;
  min-width: 0;
}

.col-left {
  width: 100%;
}

.order-details {
  margin-top: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 0.5rem;
}

.header-cart {
  display: flex;
  font-weight: bold;
  border-bottom: 2px solid white;
  padding-bottom: 0.5rem;
  font-size: 0.9rem;
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
  padding: 0.75rem 0;
  border-bottom: 1px solid #ccc;
  font-size: 0.9rem;
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
  gap: 0.5rem;
}

.item-col.price,
.item-col.quantity,
.item-col.total {
  flex: 1 1 20%;
}

.item-col.info img {
  width: 3rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.25rem;
}

.order-btn-wrapper {
  margin-top: 1rem;
  text-align: right;
}

.order-btn-wrapper p {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.col-right {
  width: 100%;
}

.invoice-form {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  color: #143b36;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.3rem;
  font-size: 0.9rem;
}

.form-group p {
  margin: 0;
  font-size: 0.85rem;
}

.customer-img img {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ccc;
}

.invoice-details p {
  margin: 0.3rem 0;
  font-size: 0.85rem;
}

.form-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 1rem;
}

.btn-pay,
.btn-back {
  color: #fff;
  background-color: #d69c52;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 0.3rem;
  box-shadow: 0 0.2rem 0.4rem #a37b44;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  flex: 1;
  text-align: center;
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
  box-shadow: 0 0.3rem 0.6rem #a37b44;
}

.btn-back:hover {
  background-color: #5a6268;
  box-shadow: 0 0.3rem 0.6rem #4a4e52;
}

/* Responsive Design */
@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .col-left, .col-right {
    width: 100%;
  }

  .header-cart {
    display: none; /* Ẩn header trên mobile, sử dụng nhãn thay thế */
  }

  .order-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .item-col {
    width: 100%;
    justify-content: flex-start;
  }

  .item-col.info {
    flex-direction: row;
    align-items: center;
  }

  .item-col.price::before {
    content: "Đơn giá: ";
    font-weight: bold;
  }

  .item-col.quantity::before {
    content: "Số lượng: ";
    font-weight: bold;
  }

  .item-col.total::before {
    content: "Thành tiền: ";
    font-weight: bold;
  }

  .item-col.info img {
    width: 2.5rem;
    height: 2.5rem;
  }

  .form-actions {
    flex-direction: column;
  }

  .btn-pay, .btn-back {
    width: 100%;
  }

  h3 {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .payment-page {
    padding: 0.5rem;
  }

  .container-payment {
    padding: 0 0.5rem;
  }

  .order-details, .invoice-form {
    padding: 0.75rem;
  }

  .item-col.info img {
    width: 2rem;
    height: 2rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  .btn-pay, .btn-back {
    font-size: 0.8rem;
    padding: 0.4rem;
  }
}
</style>