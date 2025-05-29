<template>
  <div class="shopping-cart">
    <div class="container-shoppingCart">
      <!-- Cột trái: Giỏ hàng -->
      <div class="col-left">
        <h3>Giỏ hàng của bạn 🛒</h3>
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
// The script remains unchanged as it handles functionality, not layout
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
const selectedSaleId = ref("");

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
    const response = await axios.get('http://192.168.1.53:8888/api/client/foods?status=1&bestSeller=1');
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
  const customerId = localStorage.getItem("customer_id");
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

    await api.delete(`/client/carts/by-table/${tableId}`);
    cartItems.value = [];
    localStorage.removeItem('shoppingCart');

    if (!customerId) {
      toast.success('Bạn đã đặt món thành công!');
    } else {
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
  min-height: 100vh;
  padding: 1.5rem;
}

.container-shoppingCart {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.col-left {
  flex: 1;
  min-width: 300px;
  color: white;
  box-sizing: border-box;
}

.col-left h3 {
  font-size: clamp(1.5rem, 5vw, 1.8rem);
  margin-bottom: 1rem;
}

.order-cart {
  margin-top: 1rem;
  border: 1px solid white;
  padding: 1rem;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.1);
}

.header-cart {
  display: flex;
  color: white;
  font-weight: bold;
  border-bottom: 2px solid white;
  padding-bottom: 0.5rem;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.header-cart li {
  list-style: none;
  text-align: center;
  flex: 1;
  min-width: 100px;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.item-col {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex: 1;
  min-width: 100px;
}

.item-col.info {
  justify-content: flex-start;
  gap: 0.5rem;
}

.item-col.info img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.btn-quantity {
  background-color: #d69c52;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 0.3rem;
  transition: background-color 0.3s ease;
}

.btn-quantity:hover {
  background-color: #c58a3c;
}

.btn-delete {
  margin-left: 0.5rem;
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
  margin-top: 1rem;
}

.sale-dropdown {
  margin-top: 0.5rem;
}

.sale-select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 8px;
  border: 2px solid #ffffff;
  background-color: rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  background-image: url('data:image/svg+xml;utf8,<svg fill="white" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 1.2rem;
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

.order-btn-wrapper {
  display: flex;
  margin-top: 1rem;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.order-btn-wrapper p {
  color: white;
  font-size: 1.1rem;
}

.btn-orderItem {
  color: #fff;
  background-color: #d69c52;
  padding: 0.6rem 1rem;
  font-size: 1rem;
  border-radius: 5px;
  box-shadow: 0 3px 6px #a37b44;
  width: 100%;
  max-width: 200px;
  transition: box-shadow 0.3s ease, background-color 0.3s ease;
  border: none;
}

.btn-orderItem:hover {
  background-color: #c58a3c;
  box-shadow: 0 5px 10px #a37b44;
}

.col-right {
  flex: 1;
  min-width: 300px;
  padding: 1rem;
  background-color: #f1f5f4;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.suggested-items h4,
.note-section h4 {
  color: #143b36;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.suggested-items ul {
  list-style: none;
  padding: 0;
}

.suggested-items li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #ffffff;
  padding: 0.6rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.suggested-items img {
  width: 50px;
  height: 50px;
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
  font-size: 0.9rem;
}

.suggested-items button {
  margin-top: 0.3rem;
  align-self: flex-start;
  background-color: #143b36;
  color: #fff;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}

.note-section textarea {
  width: 100%;
  height: 80px;
  padding: 0.6rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;
  font-size: 0.9rem;
  font-family: inherit;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
  .container-shoppingCart {
    flex-direction: column;
  }

  .col-left,
  .col-right {
    width: 100%;
    min-width: unset;
  }

  .header-cart li,
  .item-col {
    font-size: 0.9rem;
    min-width: 80px;
  }

  .item-col.info img {
    width: 40px;
    height: 40px;
  }

  .btn-orderItem {
    max-width: 100%;
  }

  .suggested-items img {
    width: 40px;
    height: 40px;
  }

  .sale-select {
    font-size: 0.9rem;
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .shopping-cart {
    padding: 1rem;
  }

  .col-left h3 {
    font-size: 1.2rem;
  }

  .header-cart {
    display: none; /* Hide headers on very small screens */
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

  .item-col.total {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .btn-quantity {
    padding: 0.2rem 0.5rem;
  }

  .btn-delete {
    font-size: 0.85rem;
  }

  .suggested-items h4,
  .note-section h4 {
    font-size: 1rem;
  }

  .suggested-items li {
    flex-direction: column;
    align-items: flex-start;
  }

  .suggested-items img {
    width: 100%;
    height: auto;
    max-width: 100px;
  }

  .note-section textarea {
    height: 60px;
    font-size: 0.85rem;
  }
}
</style>