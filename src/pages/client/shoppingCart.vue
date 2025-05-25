```vue
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
                  <button class="btn-quantity" @click="decreaseQuantity(item)">-</button>
                  {{ item.quantity || 0 }}
                  <button class="btn-quantity" @click="increaseQuantity(item)">+</button>
                </div>
                <div class="item-col total">
                  {{ ((item.price || 0) * (item.quantity || 0)).toLocaleString() }}₫
                  <button class="btn-delete" @click="xoaHang(item.id)">Xóa</button>
                </div>
              </li>
            </ul>
            <div class="sale-section">
              <h4>Mã giảm giá</h4>
              <div v-if="filteredSales.length === 0">Không có mã giảm giá nào còn hiệu lực.</div>
              <div v-else class="sale-dropdown">
                <select v-model="selectedSaleId" @change="selectSale" class="sale-select">
                  <option value="" selected>Chọn mã giảm giá</option>
                  <option v-for="sale in filteredSales" :key="sale.id" :value="sale.id">
                    {{ sale.nameSale }} (Giảm {{ sale.percent }}%, {{ formatDate(sale.startTime) }} - {{ formatDate(sale.endTime) }})
                  </option>
                </select>
              </div>
            </div>
            <div class="order-btn-wrapper">
              <p style="color: white;"> Tổng tiền: <strong>{{ tongTien.toLocaleString() }}₫</strong></p>
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
            <div class="w-full max-h-[500px] overflow-hidden overflow-y-auto">
              <li v-for="(mon, i) in bestSellerItems" :key="i">
                <img :src="mon.image" alt="popular" />
                <div class="info">
                  <p>{{ mon.name }}</p>
                  <span>{{ mon.price.toLocaleString() }}₫</span>
                  <button @click="themMon(mon)">Thêm</button>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <div class="note-section">
          <h4>Ghi chú</h4>
          <textarea v-model="note" placeholder="Nhập ghi chú (nếu có)"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { cartItems, clearCart, addToCart } from '../../stores/cartStore';
import api from '../../services/api';
import { computed, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { fetchCart } from '../../stores/cartStore';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const toast = useToast();
const route = useRoute();
const router = useRouter();
const note = ref("");
const bestSellerItems = ref([]);
const sales = ref([]);
const selectedSale = ref(null);
const selectedSaleId = ref(""); // Lưu ID của mã giảm giá được chọn trong dropdown

// Lọc mã giảm giá còn hiệu lực
const filteredSales = computed(() => {
  const currentDate = new Date();
  return sales.value.filter(sale => {
    const start = new Date(sale.startTime);
    const end = new Date(sale.endTime);
    return start <= currentDate && end >= currentDate;
  });
});

const fetchFoodBestSeller = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/client/foods?status=1&bestSeller=1');
    bestSellerItems.value = response.data.map(item => ({
      id: item.id,
      name: item.name,
      price: item.cost,
      image: item.image
    }));
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu món ăn nổi bật:', error);
    bestSellerItems.value = [];
  }
};

const fetchSales = async () => {
  try {
    const response = await api.get('client/sales');
    sales.value = response.data.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách mã giảm giá:', error);
    sales.value = [];
  }
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('vi-VN');
};

const selectSale = () => {
  const sale = filteredSales.value.find(s => s.id === selectedSaleId.value);
  selectedSale.value = sale || null;
};

const themMon = (mon) => {
  addToCart({ ...mon, quantity: 1 });
  localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
  toast.success('Đã thêm món vào giỏ hàng!');
};

const xoaHang = (id) => {
  api.delete(`/client/carts/${id}`)
    .then(() => {
      const index = cartItems.value.findIndex(item => item.id === id);
      if (index !== -1) {
        cartItems.value.splice(index, 1);
      }
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
      toast.success('Đã xóa món khỏi giỏ hàng!');
    })
    .catch(error => {
      console.error("Lỗi xóa món:", error);
      toast.error("Không thể xóa món khỏi giỏ hàng.");
    });
};

function increaseQuantity(item) {
  if (!item.quantity) item.quantity = 1;
  item.quantity += 1;
  localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
  api.put(`/client/carts/${item.id}`, { quantity: item.quantity })
    .then(() => {
      toast.success('Cập nhật số lượng thành công!');
    })
    .catch(error => {
      console.error("Lỗi cập nhật số lượng:", error);
      toast.error("Không thể cập nhật số lượng.");
      item.quantity -= 1;
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
    });
}

function decreaseQuantity(item) {
  if (!item.quantity || item.quantity <= 1) return;
  item.quantity -= 1;
  localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
  api.put(`/client/carts/${item.id}`, { quantity: item.quantity })
    .then(() => {
      toast.success('Cập nhật số lượng thành công!');
    })
    .catch(error => {
      console.error("Lỗi cập nhật số lượng:", error);
      toast.error("Không thể cập nhật số lượng.");
      item.quantity += 1;
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
    });
}

const tongTien = computed(() =>
  cartItems.value.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0)
);

const xoaToanBo = async () => {
  try {
    await clearCart();
    localStorage.removeItem('shoppingCart');
    cartItems.value = [];
    toast.success('Đã xóa toàn bộ giỏ hàng!');
  } catch (error) {
    console.error("Lỗi xóa toàn bộ giỏ hàng:", error);
    toast.error("Không thể xóa giỏ hàng.");
  }
};

const datHang = async () => {
  if (cartItems.value.length === 0) {
    toast.error("Bạn chưa chọn món nào.");
    return;
  }

  const tableId = Number(localStorage.getItem("table_id"));
  const customerId = localStorage.getItem("customer_id"); // Lấy customer_id từ localStorage
  if (!tableId || isNaN(tableId)) {
    toast.error("Không tìm thấy thông tin bàn.");
    return;
  }

  const tongTien = cartItems.value.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
  if (tongTien <= 0) {
    toast.error("Tổng tiền không hợp lệ. Vui lòng kiểm tra giỏ hàng.");
    return;
  }

  try {
    const orderDetails = cartItems.value.map(item => ({
      id_food: item.id_food,
      quantity: item.quantity,
      price: item.price,
      name: item.name,
      image: item.image
    }));

    // Gửi hóa đơn lên backend
    const res = await api.post('/client/invoices', {
      id_table: tableId,
      id_customer: customerId ? Number(customerId) : null,
      total: tongTien,
      items: orderDetails,
      note: note.value,
      id_sale: selectedSale.value ? selectedSale.value.id : null
    });

    const invoiceId = res.data.data?.id;
    if (!invoiceId) {
      toast.error('Không thể tạo hóa đơn.');
      return;
    }

    // Xóa giỏ hàng backend theo bàn
    await api.delete(`/client/carts/by-table/${tableId}`);

    // Xóa giỏ hàng phía frontend
    cartItems.value = [];
    localStorage.removeItem('shoppingCart');

    // Kiểm tra xem có customer_id hay không
    if (!customerId) {
      // Khách vãng lai: Hiển thị thông báo thành công
      toast.success('Bạn đã đặt món thành công!');
    } else {
      // Người dùng đăng nhập: Điều hướng sang trang thanh toán
      router.push({
        path: '/payment',
        query: {
          invoiceId: invoiceId,
          total: tongTien,
          items: JSON.stringify(orderDetails),
          tableId: tableId,
          note: note.value,
          sale: selectedSale.value ? JSON.stringify(selectedSale.value) : null,
          customerId: customerId || null
        }
      });
    }
  } catch (error) {
    console.error("Lỗi khi đặt hàng:", error);
    toast.error("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.");
  }
};

onMounted(() => {
  fetchCart();
  fetchFoodBestSeller();
  fetchSales();
  const status = route.query.status;
  if (status === 'success') {
    toast.success('Thanh toán thành công! Giỏ hàng đã được làm mới.');
    router.push('/');
  } else if (status === 'error') {
    toast.error('Thanh toán thất bại. Vui lòng thử lại.');
  }
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
  gap: 20px;
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

.btn-quantity {
  background-color: #d69c52;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 5px;
  transition: background-color 0.3s ease;
}

.btn-quantity:hover {
  background-color: #c58a3c;
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

.sale-section {
  margin-top: 20px;
}

.sale-dropdown {
  margin-top: 10px;
}

.sale-select {
  width: 100%;
  max-width: 400px;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #ffffff;
  background-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 16px center;
  background-size: 20px;
}

.sale-select:hover {
  background-color: rgba(255, 255, 255, 0.25);
  border-color: #d69c52;
}

.sale-select:focus {
  outline: none;
  border-color: #d69c52;
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0 8px rgba(214, 156, 82, 0.3);
}

.sale-select option {
  background-color: #143b36;
  color: #ffffff;
  font-size: 14px;
  padding: 10px;
}

.order-btn-wrapper {
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  align-items: flex-end;
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

.suggested-items h4,
.note-section h4 {
  color: #143b36;
  font-size: 18px;
  margin-bottom: 8px;
}

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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
```