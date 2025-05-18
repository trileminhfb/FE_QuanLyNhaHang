<template>
  <div class="shopping-cart">
    <div class="container-shoppingCart">
      <!-- Cột trái: Giỏ hàng -->
      <div class="col-left">
        <h3 style="font-size: 30px;">Giỏ hàng của bạn 🛒</h3>
        <div class="order-cart">
          <div v-if="cartItems.length === 0">Chưa có mặt hàng nào</div>
          <div v-else>
            <ul class="header-cart">
              <li>Thông tin sản phẩm</li>
              <li>Đơn giá</li>
              <li>Số lượng</li>
              <li>Thành tiền</li>
            </ul>
            <ul>
              <li class="order-item" v-for="(item, index) in cartItems" :key="item.id || index">
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
                  <button class="btn-delete" @click="xoaHang(item.id)">Xóa</button>
                </div>
              </li>
            </ul>
            <div class="order-btn-wrapper">
              <p>Tổng tiền: <strong>{{ tongTien.toLocaleString() }}₫</strong></p>
              <button class="btn-orderItem" @click="datHang">Đặt Món</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Cột phải: Gợi ý món và ghi chú -->
      <div class="col-right">
        <div class="suggested-items">
          <h4>Món phổ biến</h4>
          <ul>
            <li v-for="(mon, i) in popularItems" :key="i">
              <img :src="mon.image" alt="popular" />
              <div class="info">
                <p>{{ mon.name }}</p>
                <span>{{ mon.price.toLocaleString() }}₫</span>
                <button @click="themMon(mon)">Thêm</button>
              </div>
            </li>
          </ul>
        </div>

        <div class="note-section">
          <h4>Ghi chú đơn hàng</h4>
          <textarea v-model="note" placeholder="Ví dụ: Ít cay, không đá..."></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cartItems, clearCart, addToCart } from '../../stores/cartStore';
import api from '../../services/api';
import { computed, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchCart } from '../../stores/cartStore';

const route = useRoute();
const note = ref("");

const popularItems = [
  {
    name: 'Trà sữa trân châu',
    price: 25000,
    image: 'https://via.placeholder.com/60'
  },
  {
    name: 'Mì cay Hàn Quốc',
    price: 45000,
    image: 'https://via.placeholder.com/60'
  },
];

function themMon(mon) {
  addToCart(mon);
  // Cập nhật localStorage sau khi thêm món
  localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
}

function xoaHang(id) {
  api.delete(`/client/carts/${id}`)
    .then(() => {
      const index = cartItems.value.findIndex(item => item.id === id);
      if (index !== -1) {
        cartItems.value.splice(index, 1);
      }
      // Cập nhật localStorage sau khi xóa
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
    })
    .catch(error => {
      console.error("Lỗi xóa món:", error);
      alert("Không thể xóa món khỏi giỏ hàng.");
    });
}

const tongTien = computed(() =>
  cartItems.value.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)
);

async function xoaToanBo() {
  try {
    await clearCart(); // xóa server và store
    localStorage.removeItem('shoppingCart'); // xóa localStorage
  } catch (error) {
    console.error("Lỗi xóa toàn bộ giỏ hàng:", error);
  }
}

async function datHang() {
  if (cartItems.value.length === 0) {
    alert("Bạn chưa chọn món nào.");
    return;
  }
  try {
    const res1 = await api.get('/client/invoices');
    const invoiceId = res1.data.data?.[0]?.id;

    if (!invoiceId) {
      alert('Không có hóa đơn để thanh toán');
      return;
    }

    const res2 = await api.get(`/client/invoices/payByTransfer/${invoiceId}`);
    const paymentUrl = res2.data.payment_url;

    window.location.href = paymentUrl;
  } catch (error) {
    console.error("Lỗi đặt món:", error);
    alert("Có lỗi xảy ra khi đặt món. Vui lòng thử lại.");
  }
}

onMounted(async () => {
  const status = route.query.status;
  console.log("Trạng thái thanh toán:", status); // để debug

  if (status === 'success') {
    await xoaToanBo(); // gọi hàm xóa toàn bộ
    alert('Thanh toán thành công! Giỏ hàng đã được làm mới.');

    // Optionally: remove `status=success` khỏi URL để tránh xóa lại khi reload
    const url = new URL(window.location.href);
    url.searchParams.delete("status");
    window.history.replaceState({}, document.title, url.toString());
  }
});
onMounted(() => {
  fetchCart();
});
</script>
<style scoped>
.shopping-cart {
  background-color: #143b36;
  height: auto;
  padding: 20px;
}

.container-shoppingCart {
  margin: 0 auto;
  width: 1300px;
  display: flex;
  justify-content: space-between;
  gap: 20px; /* tạo khoảng cách giữa 2 cột */
}


.col-left {
  width: 65%;
  color: white;
  box-sizing: border-box;
}


.order-cart {
  margin-top: 20px;
  border: 1px solid white;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
}

/* Header: chia cột cố định */
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
}

/* Đảm bảo width giống nhau */
.header-cart li:nth-child(1),
.item-col.info {
  width: 40%;
}
.header-cart li:nth-child(2),
.item-col.price {
  width: 20%;
}
.header-cart li:nth-child(3),
.item-col.quantity {
  width: 20%;
}
.header-cart li:nth-child(4),
.item-col.total {
  width: 20%;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #ccc;
}

.item-col {
  text-align: center;
}
.item-col.info {
  display: flex;
  align-items: center;
  gap: 10px;
}
.item-col.info img {
  margin-left: 10px;
}

.btn-delete {
  margin-left: 10px;
  color: red;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.btn-delete:hover {
  color: darkred;
}


.order-btn-wrapper {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: flex-end;
}

.btn-orderItem {
  color: #fff;
  background-color: #d69c52;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 3px 6px #a37b44;
  height: 40px;
  width: 200px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}

.btn-orderItem:hover {
  background-color: #c58a3c;
  box-shadow: 0 5px 10px #a37b44;
}
.col-right {
  width: 35%;
  padding: 20px;
  background-color: #f1f5f4;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-sizing: border-box;
}
/* Tiêu đề */
.suggested-items h4,
.note-section h4 {
  color: #143b36;
  font-size: 18px;
  margin-bottom: 8px;
}

/* Món phổ biến */
.suggested-items ul {
  list-style: none;
  padding: 0;
}

.suggested-items li {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.suggested-items img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #ccc;
}

.suggested-items .info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.suggested-items p {
  margin: 0;
  font-weight: 500;
}

.suggested-items span {
  color: #666;
  font-size: 14px;
}

.suggested-items button {
  margin-top: 4px;
  align-self: flex-start;
  background-color: #143b36;
  color: #fff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

/* Ghi chú */
.note-section textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 14px;
  font-family: inherit;
}

</style>