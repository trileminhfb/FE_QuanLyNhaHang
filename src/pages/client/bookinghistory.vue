<template>
    <div class="container">
      <div class="history-table">
        <div class="col-left">
          <p class="title-history">
            <i class="fas fa-history"></i>
            Lịch Sử Đặt Bàn
            <i class="fas fa-history"></i>
          </p>
  
          <!-- Danh sách hóa đơn -->
          <div class="booking-list">
            <table>
              <thead>
                <tr>
                  <th>Họ và Tên</th>
                  <th>Số Điện Thoại</th>
                  <th>Số Lượng</th>
                  <th>Thời Gian</th>
                  <th>Thao Tác</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="booking in bookingHistory" :key="booking.id">
                  <td>{{ booking.FullName }}</td>
                  <td>{{ booking.phoneNumber }}</td>
                  <td>{{ booking.quantity }}</td>
                  <td>{{ formatDateTimeDisplay(booking.timeBooking) }}</td>
                  <td>
                    <button class="action-btn edit-btn" @click="editBooking(booking.id)">Sửa</button>
                    <button class="action-btn delete-btn" @click="deleteBooking(booking.id)">Xóa</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
  
          <!-- Form chỉnh sửa (hiển thị khi nhấn nút Sửa) -->
          <div v-if="isEditing" class="edit-form">
            <p class="edit-title">Chỉnh Sửa Đặt Bàn</p>
            <div class="input-text">
              <div class="form-row">
                <div class="form-group">
                  <label>Họ và tên</label>
                  <input type="text" v-model="editForm.FullName" placeholder="Nhập họ và tên..." maxlength="255" required />
                </div>
                <div class="form-group">
                  <label>Số điện thoại</label>
                  <input type="text" v-model="editForm.phoneNumber" placeholder="Nhập số điện thoại..." maxlength="20" required />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label>Số lượng</label>
                  <input type="number" v-model="editForm.quantity" placeholder="Số lượng..." min="1" required />
                </div>
                <div class="form-group">
                  <label>Thời gian bạn đến?</label>
                  <input type="datetime-local" v-model="editForm.timeBooking" required />
                </div>
              </div>
            </div>
            <div class="edit-actions">
              <button class="oder-btn" @click="updateBooking">Cập Nhật</button>
              <button class="oder-btn cancel-btn" @click="cancelEdit">Hủy</button>
            </div>
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
  
  // Router để điều hướng
  const router = useRouter();
  
  // Danh sách đặt bàn
  const bookingHistory = ref([]);
  
  // Trạng thái chỉnh sửa
  const isEditing = ref(false);
  const editForm = reactive({
    id: null,
    FullName: '',
    phoneNumber: '',
    quantity: '',
    timeBooking: '',
  });
  
  // Lấy danh sách đặt bàn
  const fetchBookings = async () => {
    try {
      const user_id = 1; // Giả sử user_id lấy từ trạng thái đăng nhập
      const response = await api.get(`/admin/bookings?user_id=${user_id}`);
      bookingHistory.value = response.data;
    } catch (error) {
      console.error('Lỗi khi lấy lịch sử đặt bàn:', error);
    }
  };
  
  // Format thời gian để hiển thị
  const formatDateTimeDisplay = (datetime) => {
    const date = new Date(datetime);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  // Format thời gian để gửi API
  const formatDateTime = (datetime) => {
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = '00';
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };
  
  // Khởi tạo dữ liệu
  fetchBookings();
  
  // Xử lý chỉnh sửa
  const editBooking = async (id) => {
    try {
      const response = await api.get(`/admin/bookings/${id}`);
      const booking = response.data;
      editForm.id = booking.id;
      editForm.FullName = booking.FullName;
      editForm.phoneNumber = booking.phoneNumber;
      editForm.quantity = booking.quantity;
      // Convert timeBooking sang định dạng datetime-local
      editForm.timeBooking = booking.timeBooking.slice(0, 16); // Cắt bỏ giây
      isEditing.value = true;
    } catch (error) {
      console.error('Lỗi khi lấy thông tin đặt bàn:', error);
      alert('Không thể tải thông tin đặt bàn.');
    }
  };
  
  // Cập nhật đặt bàn
  const updateBooking = async () => {
    const payload = {
      ...editForm,
      timeBooking: formatDateTime(editForm.timeBooking),
    };
  
    try {
      await api.put(`/admin/bookings/${editForm.id}`, payload);
      alert('Cập nhật đặt bàn thành công!');
      isEditing.value = false;
      await fetchBookings(); // Cập nhật danh sách
    } catch (error) {
      console.error('Lỗi khi cập nhật đặt bàn:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    }
  };
  
  // Hủy chỉnh sửa
  const cancelEdit = () => {
    isEditing.value = false;
  };
  
  // Xóa đặt bàn
  const deleteBooking = async (id) => {
    if (confirm('Bạn có chắc muốn xóa đặt bàn này?')) {
      try {
        await api.delete(`/admin/bookings/${id}`);
        alert('Xóa đặt bàn thành công!');
        await fetchBookings(); // Cập nhật danh sách
      } catch (error) {
        console.error('Lỗi khi xóa đặt bàn:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại.');
      }
    }
  };
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