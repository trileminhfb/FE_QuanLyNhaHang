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
          <!-- FORM ĐẶT MÓN -->
          <div class="col-left">
            <h3 style="color: white; font-size: 30px;">🎉Bạn Đặt bàn thành công🎉</h3>
            <p style="color: white; font-size: 20px; margin-bottom: 10px;">
              Bây giờ bạn có muốn đặt món luôn không?
              <a href="/"><strong style="color: yellow;">👉Không</strong></a>
            </p>
  
            <div class="form-row">
              <label>Booking ID:</label>
              <input type="text" v-model="id_booking" placeholder="Nhập ID Đặt Bàn" />
            </div>
  
            <div v-for="(item, index) in foodForm" :key="index" class="food-item">
              <div class="form-row">
                <label>Chọn món:</label>
                <select v-model="item.id_foods" >
                  <option v-for="food in foodList" :key="food.id" :value="food.id">
                    {{ food.name }}
                  </option>
                </select>
              </div>
  
              <div class="form-row">
                <label>Số lượng:</label>
                <input type="number" v-model="item.quantity" min="1" />
              </div>
  
              <button  @click="removeFoodItem(index)" v-if="foodForm.length > 1" style="margin-bottom: 10px; background-color: red;">
                ❌ Xóa món này
              </button>
            </div>
  
            <button @click="addFoodItem" style="margin: 10px 0;">➕ Thêm món</button>
            <br />
            <button @click="submitFoodOrder" class="btn-oder">Xác nhận đặt món</button>
          </div>
        </div>
  
        <div class="col-right">
          <img style="border-radius: 50%; margin-bottom: 50px;" src="/imageicon/phefood.png" alt="Hình ảnh" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import api from '../../services/api';
  import { useBookingHistoryStore } from '../../stores/bookingHistoryStore';
  import Swal from 'sweetalert2';
  
  const router = useRouter();
  const bookingStore = useBookingHistoryStore();
  
  const bookingSuccess = ref(false);
  const errors = ref({});
  
  const form = reactive({
    timeBooking: ''
  });
  
  const id_booking = ref('');
  const foodForm = ref([
    { id_foods: '', quantity: 1 }
  ]);
  
  const foodList = ref([]);
  
  const addFoodItem = () => {
    foodForm.value.push({ id_foods: '', quantity: 1 });
  };
  
  const removeFoodItem = (index) => {
    if (foodForm.value.length > 1) {
      foodForm.value.splice(index, 1);
    }
  };
  
  const saveBookingToLocal = (id_food, quantity, id_table) => {
    const newBooking = {
      timeBooking: new Date().toISOString(),
      booking_food: {
        id_food,
        quantity,
        id_table,
      }
    };
  
    const oldData = JSON.parse(localStorage.getItem('bookings')) || [];
    oldData.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(oldData));
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
    const token = localStorage.getItem('token');
    errors.value = {};
  
    if (!form.timeBooking) {
      errors.value = { message: 'Vui lòng chọn thời gian đến.' };
      return;
    }
  
    const payload = {
      timeBooking: formatDateTime(form.timeBooking)
    };
  
    api.post('/client/bookings/create', payload)
      .then((res) => {
        if (res.status === 201) {
          alert('Bạn đã đặt bàn thành công');
          bookingStore.addBooking(res.data);
          localStorage.setItem('bookingHistory', JSON.stringify(bookingStore.bookings));
          bookingSuccess.value = true;
          getFoods();
        }
      })
      .catch((err) => {
        const res = err.response;
        if (res?.status === 401) {
            Swal.fire({
        title: 'Vui lòng đăng nhập trước!',
        icon: 'error',
        confirmButtonText: 'Thử lại'
      });
        } else if (res?.data?.errors) {
          errors.value = res.data.errors;
        } else if (res?.data?.message) {
          errors.value = { message: res.data.message };
        } else {
          errors.value = { message: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' };
        }
      });
  };
  
  const submitFoodOrder = () => {
    if (!id_booking.value) {
      alert('Vui lòng nhập ID đặt bàn.');
      return;
    }
  
    const invalid = foodForm.value.some(item => !item.id_foods || item.quantity < 1);
    if (invalid) {
      alert('Vui lòng chọn món và số lượng hợp lệ cho tất cả các món.');
      return;
    }
  
    const requests = foodForm.value.map(item => {
      const data = {
        id_foods: item.id_foods,
        quantity: item.quantity,
        id_booking: id_booking.value
      };
      return api.post('/client/booking-food', data)
        .then(() => saveBookingToLocal(data.id_foods, data.quantity, data.id_booking));
    });
  
    Promise.all(requests)
      .then(() => {
        alert('Đặt tất cả món thành công!');
        router.push({ name: 'users-home' });
      })
      .catch((err) => {
        console.log('Lỗi đặt món:', err.response?.data || err.message);
      });
  };
  
  const getFoods = () => {
    api.get('/client/foods').then((res) => {
      foodList.value = res.data;
    });
  };
  </script>
<style scoped>
.error-message {
    color: red;
    font-size: 14px;
}
.container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: center;
}

.order-table {
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
    max-width: 500px;
    object-fit: contain;
    margin-top: 100px;
}

.title-oder {
    font-family: "Dancing Script", cursive;
    text-align: center;
    color: white;
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

.oder-introduce {
    margin-top: 15px;
    text-align: center;
}

.oder-introduce p {

    font-size: 16px;
    color: white;
}

.number-phone {
    color: yellow;
}

.oder-btn {
    background: white;
    width: 200px;
    display: flex;
    justify-content: center;
    margin: 20px auto 0;
    border-radius: 10px;
    font-size: 25px;
}

.oder-btn:hover {
    background: yellow;
}
.error-message {
    color: red;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
}

.container {
    max-width: 1200px;
    display: flex;
    justify-content: center;
}

.order-table {
    width: 100%;
    background: #143b36;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 30px 40px;
    padding-right: 120px;
    gap: 50px;
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

.col-right img {
    width: 100%;
    max-width: 400px;
    object-fit: contain;
    margin-top: 50px;
    transition: transform 0.3s ease-in-out;
}

.col-right img:hover {
    transform: scale(1.05);
}

.title-oder {
    font-family: "Dancing Script", cursive;
    text-align: center;
    color: white;
    margin-bottom: 30px;
    font-size: 32px;
}

.form-row {
    display: flex;
    gap: 20px;
    justify-content: space-between;
    margin-bottom: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

label {
    color: white;
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: 500;
    text-align: left;
}

input,
select {
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 8px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
    width: 100%;
}

input[type="datetime-local"] {
    background: #f0f0f0;
}

input:focus,
select:focus {
    border-color: #ffcc00;
}

button {
    background: #ffcc00;
    color: #fff;
    padding: 5px;
    width: 100%;
    max-width: 200px;
    font-size: 18px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #e6b800;
}

button:disabled {
    background-color: #ddd;
    cursor: not-allowed;
}

p a {
    color: #ffcc00;
    text-decoration: none;
}

p a:hover {
    text-decoration: underline;
}
.btn-oder{
    background: green;
}
</style>