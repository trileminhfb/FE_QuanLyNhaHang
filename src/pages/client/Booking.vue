<template>
  <div class="container">
    <div class="order-table">
      <div v-if="!bookingSuccess">
        <!-- FORM ĐẶT BÀN -->
        <div class="col-left">
          <p class="title-oder">
            <i class="fas fa-utensils"></i> Liên Hệ Đặt Bàn <i class="fas fa-utensils"></i>
          </p>
          <div class="form-row">
            <label>Thời gian bạn đến?</label>
            <input type="datetime-local" v-model="form.timeBooking" required />
          </div>
          <button class="oder-btn" @click="createBooking">
            <strong style="color: black;">Đặt Bàn Ngay</strong>
          </button>
          <p v-if="errors.message" class="error-message">{{ errors.message }}</p>
        </div>
      </div>
      <div v-else>
        <!-- BƯỚC CHỌN HÀNH ĐỘNG -->
        <div class="col-left" v-if="formStage === 'choose'">
          <h3 class="success-title">🎉 Bạn Đặt bàn thành công 🎉</h3>
          <p class="action-text">Bạn muốn làm gì tiếp theo?</p>
          <button @click="formStage = 'deposit'" class="btn-oder">💵 Đặt tiền cọc</button>
          <button @click="startOrder" class="btn-oder">🍽️ Đặt món</button>
        </div>
        <!-- FORM ĐẶT TIỀN CỌC -->
        <div class="col-left" v-if="formStage === 'deposit'">
          <h3 class="section-title">💵 Đặt tiền cọc</h3>
          <div class="form-row" v-if="foodForm.length">
            <label>Gợi ý tổng tiền cọc:</label>
            <p class="deposit-info">
              {{ calculateTotalDeposit(foodForm).toLocaleString() }} VNĐ
              <br />
              <small>(bao gồm 30% giá món + 50.000 tiền bàn)</small>
            </p>
          </div>
          <button @click="submitDeposit" class="btn-oder">Xác nhận đặt cọc</button>
          <button @click="formStage = 'choose'" class="btn-back">⬅️ Quay lại</button>
        </div>
        <!-- FORM ĐẶT MÓN ĂN -->
        <div class="col-left" v-if="formStage === 'order'">
          <h3 class="section-title">🍽️ Chọn món ăn</h3>
          <p class="greeting">Chào, <strong class="highlight">{{ userName }}</strong></p>
          <div v-for="(item, index) in foodForm" :key="index" class="form-row">
            <label>Món ăn {{ index + 1 }}:</label>
            <select v-model="item.id_foods">
              <option disabled value="">-- Chọn món --</option>
              <option v-for="food in foodList" :key="food.id" :value="food.id">
                {{ food.name }} - {{ food.cost.toLocaleString() }} VNĐ
              </option>
            </select>
            <label>Số lượng:</label>
            <input type="number" v-model="item.quantity" min="1" class="quantity-input" />
            <button @click="removeFoodItem(index)" v-if="foodForm.length > 1" class="remove-btn">❌</button>
          </div>
          <button @click="addFoodItem" class="btn-oder">➕ Thêm món</button>
          <button @click="submitFoodOrder" class="btn-oder">💵 Xác nhận đặt món</button>
          <button @click="formStage = 'choose'" class="btn-back">⬅️ Quay lại</button>
        </div>
        <!-- THÔNG TIN XÁC NHẬN & MÃ QR -->
        <div v-if="formStage === 'confirmation'" class="col-left card-info">
          <button @click="formStage = 'choose'" class="btn-back">⬅️ Quay lại</button>
          <h3 class="section-title">Thông tin đặt bàn của bạn</h3>
          <div class="user-info">
            <img :src="userInfo.avatar" alt="Ảnh đại diện" class="avatar" />
            <p><strong>Tên người dùng:</strong> {{ userInfo.name }}</p>
            <p><strong>Email:</strong> {{ userInfo.email }}</p>
            <p><strong>ID Booking:</strong> {{ bookingId }}</p>
            <div v-if="qrCode">
              <p class="qr-label"><strong>Mã QR:</strong></p>
              <img :src="qrCode" alt="QR Code" class="qr-code" />
            </div>
          </div>
        </div>
      </div>
      <div class="col-right">
        <img src="/imageicon/phefood.png" alt="Hình ảnh" class="right-image" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import api from '../../services/api';
import Swal from 'sweetalert2';
import QRCode from 'qrcode';
import { useBookingHistoryStore } from '../../stores/bookingHistoryStore';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const toast = useToast();
const bookingStore = useBookingHistoryStore();
const bookingSuccess = ref(false);
const formStage = ref('choose');
const errors = ref({});
const router = useRouter();
const bookingId = ref(null);
const userName = ref('');
const form = reactive({
  timeBooking: '',
});
const depositAmount = ref(0);
const foodForm = ref([{ id_foods: '', quantity: 1 }]);
const foodList = ref([]);
const userInfo = reactive({
  name: '',
  email: '',
  avatar: '/imageicon/phefood.png',
});
const qrCode = ref('');

const generateQRCode = () => {
  const data = `Tên: ${userInfo.name}, Email: ${userInfo.email}`;
  QRCode.toDataURL(data, (err, url) => {
    if (err) return;
    qrCode.value = url;
  });
};

onMounted(() => {
  generateQRCode();
  userName.value = localStorage.getItem('FullName') || '';
  getFoods();
});

const addFoodItem = () => {
  foodForm.value.push({ id_foods: '', quantity: 1 });
};

const removeFoodItem = (index) => {
  if (foodForm.value.length > 1) {
    foodForm.value.splice(index, 1);
  }
};

const calculateFoodDeposit = (foods) => {
  if (!Array.isArray(foods) || !foods.length || !foodList.value.length) return 0;
  return foods.reduce((total, item) => {
    const food = foodList.value.find((f) => f.id === item.id_foods);
    return food ? total + item.quantity * food.cost : total;
  }, 0) * 0.3;
};

const calculateTotalDeposit = (foods) => {
  return Math.floor(calculateFoodDeposit(foods) + 50000);
};

const formatDateTime = (datetime) => {
  const date = new Date(datetime);
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const h = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  return `${y}-${m}-${d} ${h}:${min}:00`;
};

const createBooking = () => {
  const token = localStorage.getItem('auth_token');
  errors.value = {};

  if (!form.timeBooking) {
    errors.value = { message: 'Vui lòng chọn thời gian đến.' };
    return;
  }

  const payload = {
    timeBooking: formatDateTime(form.timeBooking),
  };

  api
    .post('/client/bookings/create', payload)
    .then((res) => {
      if (res.status === 201) {
        toast.success('Bạn đã đặt bàn thành công', {
          toastClassName: 'vue-toastification__toast',
        });

        bookingSuccess.value = true;
        formStage.value = 'choose';
        bookingStore.addBooking(res.data.booking);
        bookingId.value = res.data.booking.id;
        localStorage.setItem('booking_id', res.data.booking.id);
        localStorage.setItem('bookingHistory', JSON.stringify(bookingStore.bookings.value));
        getFoods();
      }
    })
    .catch((err) => {
      const res = err.response;
      if (res?.status === 401) {
        Swal.fire({ title: 'Vui lòng đăng nhập trước!', icon: 'error', confirmButtonText: 'Thử lại' });
      } else if (res?.data?.errors) {
        errors.value = res.data.errors;
      } else {
        errors.value = { message: res?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.' };
      }
    });
};

const submitFoodOrder = () => {
  localStorage.setItem('bookingHistory', JSON.stringify(bookingStore.bookings.value));
  const invalid = foodForm.value.some((item) => !item.id_foods || item.quantity < 1);
  if (invalid) {
    alert('Vui lòng chọn món và số lượng hợp lệ cho tất cả các món.');
    return;
  }

  const payload = {
    id_booking: bookingId.value,
    foods: foodForm.value.map((item) => ({
      id_foods: item.id_foods,
      quantity: item.quantity,
    })),
  };

  api
    .post('/client/booking-food', payload)
    .then(() => {
      toast.success('Đặt món thành công!');
      localStorage.setItem('bookingHistory', JSON.stringify(bookingStore.bookings.value));

      const updatedBooking = {
        id: bookingId.value,
        foods: foodForm.value.map((item) => ({
          id_foods: item.id_foods,
          quantity: item.quantity,
        })),
      };

      bookingStore.updateBookingFoods(updatedBooking);
      localStorage.setItem('bookingHistory', JSON.stringify(bookingStore.bookings.value));
      router.push({ name: 'users-home' });
    })
    .catch((err) => {
      console.log('Lỗi đặt món:', err.response?.data || err.message);
    });
};

const submitDeposit = () => {
  userInfo.name = localStorage.getItem('customer_name') || 'Chưa có tên';
  userInfo.email = localStorage.getItem('customer_email') || 'Chưa có email';
  userInfo.avatar = localStorage.getItem('customer_avatar') || '/images/avatar.png';
  generateQRCode();
  formStage.value = 'confirmation';
};

const getFoods = () => {
  api.get('/client/foods').then((res) => {
    foodList.value = res.data;
  });
};

const startOrder = () => {
  if (!bookingId.value) {
    console.error('Chưa có ID đặt bàn');
    toast.error('Chưa có ID đặt bàn!');
    return;
  }

  formStage.value = 'order';
};


</script>

<style scoped>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  max-width: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: center;
}

.order-table {
  width: 100%;
  max-width: 1200px;
  background: #143b36;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.5rem;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

.col-right img.right-image {
  width: 100%;
  max-width: 400px;
  object-fit: contain;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
}

.col-right img.right-image:hover {
  transform: scale(1.05);
}

.title-oder {
  font-family: 'Dancing Script', cursive;
  text-align: center;
  color: white;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.success-title {
  color: white;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
}

.action-text {
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-bottom: 1rem;
}

.section-title {
  color: white;
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 1rem;
}

.greeting {
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
}

.greeting .highlight {
  color: red;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

label {
  color: white;
  font-size: 1rem;
  font-weight: 500;
  text-align: left;
}

input,
select {
  background: #fff;
  border: 2px solid #ccc;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  width: 100%;
}

input[type='datetime-local'] {
  background: #f0f0f0;
}

input:focus,
select:focus {
  border-color: #ffcc00;
}

.quantity-input {
  width: 80px;
}

.remove-btn {
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  cursor: pointer;
}

.remove-btn:hover {
  background: #cc0000;
}

button {
  background: #ffcc00;
  color: #fff;
  padding: 0.5rem;
  width: 100%;
  max-width: 200px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0.5rem auto;
}

button:hover {
  background-color: #e6b800;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

.btn-oder {
  background: green;
}

.btn-back {
  background: #555;
}

.deposit-info {
  color: yellow;
  font-weight: bold;
  text-align: center;
}

.deposit-info small {
  color: white;
  font-size: 0.8rem;
}

.user-info {
  background: white;
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  padding: 1rem;
}

.user-info .avatar {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.qr-label {
  color: black;
  font-weight: bold;
  margin-top: 1rem;
  text-align: center;
}

.qr-code {
  width: 150px;
  height: 150px;
  margin-top: 0.5rem;
}

.error-message {
  color: red;
  font-size: 0.9rem;
  text-align: center;
  margin-top: 0.5rem;
}

.vue-toastification__toast {
  font-size: 0.75rem;
  padding: 0.5em 1em;
  border-radius: 6px;
  min-height: unset;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .order-table {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }

  .col-left,
  .col-right {
    width: 100%;
  }

  .col-right img.right-image {
    max-width: 250px;
    margin-top: 1rem;
  }

  .title-oder,
  .section-title {
    font-size: 1.5rem;
  }

  .success-title {
    font-size: 1.4rem;
  }

  .action-text,
  .greeting {
    font-size: 1rem;
  }

  button {
    max-width: 100%;
    font-size: 0.9rem;
  }

  .form-row {
    flex-direction: column;
    gap: 0.5rem;
  }

  .quantity-input {
    width: 100%;
  }

  .user-info .avatar {
    width: 80px;
    height: 80px;
  }

  .qr-code {
    width: 120px;
    height: 120px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0.5rem;
  }

  .order-table {
    border-radius: 10px;
    padding: 0.75rem;
  }

  .title-oder,
  .section-title {
    font-size: 1.2rem;
  }

  .success-title {
    font-size: 1.1rem;
  }

  .action-text,
  .greeting {
    font-size: 0.9rem;
  }

  label {
    font-size: 0.9rem;
  }

  input,
  select {
    font-size: 0.9rem;
    padding: 0.4rem;
  }

  button {
    font-size: 0.8rem;
    padding: 0.4rem;
  }

  .col-right img.right-image {
    max-width: 200px;
  }

  .user-info .avatar {
    width: 60px;
    height: 60px;
  }

  .qr-code {
    width: 100px;
    height: 100px;
  }
}
</style>