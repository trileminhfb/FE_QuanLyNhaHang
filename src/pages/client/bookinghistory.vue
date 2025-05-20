<template>
  <div class="container">
    <div class="history-table">
      <div class="col-left">
        <p class="title-history">
          <i class="fas fa-history"></i>
          Lịch Sử Đặt Món
          <i class="fas fa-history"></i>
        </p>

        <div class="booking-list">
          <table>
            <thead>
              <tr>
                <th>Thời Gian</th>
                <th>Món Ăn</th>
                <th>Số Lượng</th>
                <th>Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="isLoading">
                <td colspan="4">Đang tải dữ liệu...</td>
              </tr>
              <tr v-else-if="orders.length === 0">
                <td colspan="4">Không có dữ liệu đặt món.</td>
              </tr>
              <tr v-else v-for="item in orders" :key="item.bookingId + '-' + item.id_foods">
                <td>{{ formatDate(item.timeBooking) }}</td>
                <td>{{ item.foodName }}</td>
                <td>{{ item.quantity }}</td>
                <td>
                  <button class="action-btn delete-btn" @click="deleteOrder(item.bookingId, item.id_foods)">Xoá</button>
                  <button class="action-btn update-btn" @click="increaseQuantity(item)">Tăng SL</button>
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
import api from '../../services/api';

const orders = ref([]);
const isLoading = ref(true);
const foodsList = ref([]);

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

// Lấy danh sách món ăn từ API
const fetchFoods = async () => {
  try {
    const res = await api.get('/client/foods');
    foodsList.value = res.data;
  } catch (err) {
    console.error('Lỗi khi lấy món ăn:', err);
    alert('Không thể tải danh sách món ăn. Vui lòng thử lại sau.');
  }
};

// Gộp lịch sử đặt món từ localStorage
const loadOrders = () => {
  api.get('client/bookings/history')
    .then((res) => {
      // res.data.data là mảng booking
      const data = res.data.data;
      const flattenedOrders = [];

      data.forEach(booking => {
        booking.foods.forEach(food => {
          flattenedOrders.push({
            bookingId: booking.id,
            timeBooking: booking.timeBooking,
            id_foods: food.id_foods,
            foodName: food.name,
            quantity: food.quantity
          });
        });
      });

      orders.value = flattenedOrders;
      isLoading.value = false;
    })
    .catch(err => {
      console.error(err);
      isLoading.value = false;
    });
};


const deleteOrder = (bookingId, foodId) => {
  console.log('bookingId:', bookingId, 'foodId:', foodId);

  if (!confirm('Bạn có chắc muốn xoá món này không?')) return;

  api.delete(`/client/bookings/${bookingId}/foods/${foodId}`)
    .then((res) => {
      console.log('Đã xoá:', res.data);
      alert('Đã xoá món thành công!');
      loadOrders();
    })
    .catch((error) => {
      console.error('Lỗi khi xoá hàng:', error.response?.data || error.message);
      alert('Lỗi khi xoá hàng!');
    });
};

// Tăng số lượng món ăn
const increaseQuantity = (item) => {
  const history = JSON.parse(localStorage.getItem('bookingHistory')) || [];

  const updatedHistory = history.map(booking => {
    if (booking.id === item.bookingId) {
      return {
        ...booking,
        foods: booking.foods.map(f => {
          if (f.id_foods === item.id_foods) {
            return { ...f, quantity: f.quantity + 1 };
          }
          return f;
        })
      };
    }
    return booking;
  });

  localStorage.setItem('bookingHistory', JSON.stringify(updatedHistory));
  loadOrders();
  alert('Tăng số lượng thành công!');
};

// Khởi tạo dữ liệu khi vào trang
onMounted(async () => {
  await fetchFoods();
  loadOrders();
  isLoading.value = false;
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

.action-btn {
  padding: 8px 12px;
  margin-right: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
}

.edit-btn {
  background: #28a745;
  color: white;
}

.edit-btn:hover {
  background: #218838;
}

.delete-btn {
  background: #dc3545;
  color: white;
}

.update-btn {
  background: green;
  color: white;
}

.delete-btn:hover {
  background: #c82333;
}

.edit-form {
  margin-top: 20px;
}

.edit-title {
  font-family: "Dancing Script", cursive;
  color: white;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.input-text {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: flex;
  gap: 20px;
  justify-content: space-between;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

label {
  color: white;
  margin-bottom: 6px;
  font-size: 20px;
  font-weight: 500;
  text-align: left;
}

input {
  background: #fff;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 10px 16px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
}

.edit-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.oder-btn {
  background: white;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
}

.oder-btn:hover {
  background: yellow;
}

.cancel-btn {
  background: #dc3545;
  color: white;
}

.cancel-btn:hover {
  background: #c82333;
}
</style>