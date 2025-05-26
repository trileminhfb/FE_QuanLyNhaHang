<template>
  <div class="container-personalinformation">
    <div class="rank-box">
      <div class="member-info">
        <img :src="informationpersonal.image" class="avatar" alt="Avatar" />
        <div class="member-details">
          <h3>{{ informationpersonal.name }}</h3>
          <p>{{ informationpersonal.point }} Stars</p>
        </div>
        <div class="rank-image-container">
          <img class="rank-image" :src="informationpersonal.imageRank" alt="Rank">
        </div>
      </div>

      <div class="total-spending">
        <p class="label">
          <span>Total Spending <strong style="color: aqua;">2025</strong></span>
          <span class="amount">5.787.000 đ</span>
        </p>

        <div class="progress-bar">
          <div class="milestone">
            <span>0 đ</span>
            <div class="icon start"></div>
          </div>
          <div class="milestone">
            <span>2.000.000 đ</span>
            <div class="icon mid"></div>
          </div>
          <div class="milestone">
            <span>4.000.000 đ</span>
            <div class="icon current"></div>
          </div>
        </div>
      </div>
      <div class="support-footer">
        <div class="support-info">
          <h4>Hotline Hỗ Trợ: <strong style="color: blue;">1900 1234</strong></h4>
          <p>
            <span class="icon email"></span>
            <a href="mailto:support@nhahang.com">Email: <strong
                style="color: blue;">phefoodRestaurant@gmail.com</strong></a>
          </p>
        </div>
      </div>
    </div>

    <div class="info-box">
      <div class="category-container">
        <div class="tab-wrapper">
          <ul class="tab-links">
            <li v-for="(tab, index) in tabs" :key="index" :class="['tab-link', { current: currentTab === index }]"
              @click="currentTab = index">
              {{ tab.ten }}
            </li>
          </ul>

          <div class="tab-contents">
            <div v-for="(tab, index) in tabs" :key="'content-' + index" v-show="currentTab === index"
              class="tab-content">
              <div v-if="tab.ten === 'Lịch sử tích điểm'">
                <div v-if="historyPoints.length === 0">
                  <p>Bạn chưa có giao dịch tích điểm nào.</p>
                </div>
                <div v-else>
                  <table class="points-table">
                    <thead>
                      <tr>
                        <th>Số Điểm</th>
                        <th>Ngày Nhận</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="history in historyPoints" :key="history.id" class="transaction-item">
                        <td>{{ history.points || '0' }}</td>
                        <td>{{ formatDate(history.created_at) || 'N/A' }}</td>
                        <td :class="history.status === 'received' ? 'status-received' : 'status-canceled'">
                          {{ history.status === 'received' ? 'Đã Nhận' : 'Bị Hủy' }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div v-else-if="tab.ten === 'Thông báo'">
                <ul class="notification-list">
                  <li class="notification-item">
                    <strong>🎉 Chúc mừng!</strong> Bạn vừa đạt
                    <strong>69 sao</strong> trong hệ thống tích điểm của chúng
                    tôi. Hãy tiếp tục mua sắm để đạt các mốc quà tặng hấp dẫn
                    tiếp theo như phiếu giảm giá, thẻ thành viên VIP và nhiều ưu
                    đãi độc quyền khác.
                  </li>
                  <li class="notification-item">
                    <strong>🔥 Ưu đãi tháng 5:</strong> Giảm ngay
                    <strong>20%</strong> cho đơn hàng từ <strong>500.000đ</strong>
                    trở lên, chỉ áp dụng trong tháng này. Nhanh tay kẻo lỡ vì số
                    lượng có hạn!
                  </li>
                  <li class="notification-item">
                    <strong>📢 Lời nhắc:</strong> Vui lòng cập nhật đầy đủ
                    <strong>thông tin cá nhân</strong> để đảm bảo quyền lợi thành
                    viên, nhận ưu đãi sinh nhật và các thông báo quan trọng từ
                    chúng tôi. Cập nhật ngay trong mục "Thông tin cá nhân".
                  </li>
                </ul>
              </div>

              <div v-else-if="tab.ten === 'Thông tin cá nhân'">
                <div class="information-personal">
                  <div v-if="!showChangePasswordForm" class="input-information">
                    <div class="row-information">
                      <div class="group-information">
                        Họ và tên
                        <i class="fa fa-user"></i>
                        <input type="text" v-model="informationpersonal.name" />
                      </div>
                      <div class="group-information">
                        Ngày sinh
                        <input type="date" v-model="informationpersonal.birth" />
                      </div>
                    </div>

                    <div class="row-information">
                      <div class="group-information">
                        Số điện thoại
                        <i class="fa fa-phone"></i>
                        <input type="number" v-model="informationpersonal.phoneNumber" />
                      </div>
                      <div class="group-information">
                        Email
                        <i class="fa fa-envelope"></i>
                        <input type="email" :value="informationpersonal.mail" disabled />
                      </div>
                    </div>

                    <div class="row-information">
                      <div class="group-information">
                        Mật khẩu
                        <i class="fa fa-lock"></i>
                        <input type="password" v-model="informationpersonal.password" disabled />
                      </div>
                      <div class="group-information">
                        Ảnh đại diện
                        <input type="file" @change="handleImageUpload" accept="image/*" />
                        <img v-if="imagePreview" :src="imagePreview" alt="Ảnh preview"
                          style="width: 80px; margin-top: 5px;" />
                      </div>
                    </div>

                    <div class="row-information">
                      <div class="group-information">
                        Điểm
                        <input type="number" v-model="informationpersonal.point" disabled />
                      </div>
                      <div class="group-information">
                        Hạng
                        <input type="text" v-model="informationpersonal.nameRank" disabled />
                      </div>
                    </div>
                  </div>

                  <div v-else class="change-password-form">
                    <h3>Đổi mật khẩu</h3>
                    <div class="row-information">
                      <div class="group-information">
                        Email
                        <i class="fa fa-envelope"></i>
                        <input type="email" v-model="changePasswordData.email" placeholder="Nhập email" />
                      </div>
                    </div>
                    <div v-if="otpSent" class="row-information">
                      <div class="group-information">
                        OTP
                        <i class="fa fa-key"></i>
                        <input type="text" v-model="changePasswordData.otp" placeholder="Nhập mã OTP" />
                      </div>
                      <div class="group-information">
                        Mật khẩu cũ
                        <i class="fa fa-lock"></i>
                        <input type="password" v-model="changePasswordData.oldPassword"
                          placeholder="Nhập mật khẩu cũ" />
                      </div>
                    </div>
                    <div v-if="otpSent" class="row-information">
                      <div class="group-information">
                        Mật khẩu mới
                        <i class="fa fa-lock"></i>
                        <input type="password" v-model="changePasswordData.newPassword"
                          placeholder="Nhập mật khẩu mới" />
                      </div>
                      <div class="group-information">
Xác nhận mật khẩu mới
                        <i class="fa fa-lock"></i>
                        <input type="password" v-model="changePasswordData.confirmNewPassword"
                          placeholder="Xác nhận mật khẩu mới" />
                      </div>
                    </div>
                    <div class="row-information">
                      <button v-if="!otpSent" @click="sendOTP" class="btn-update">Gửi OTP</button>
                      <button v-else @click="changePassword" class="btn-update">Xác nhận đổi mật khẩu</button>
                      <button @click="cancelChangePassword" class="btn-cancel" style="margin-left: 10px;">Hủy</button>
                    </div>
                  </div>
                </div>
                <div v-if="!showChangePasswordForm" style="margin-top: 20px; text-align: right;">
                  <button @click="showChangePasswordForm = true" class="btn-update">Đổi mật khẩu</button>
                  <button @click="updatePersonalInfo" class="btn-update" style="margin-left: 10px;">
                    Cập nhật thông tin</button>
                  <button @click="deletePersonalInfo" class="btn-delete" style="margin-left: 10px;">Xóa tài
                    khoản</button>
                </div>
              </div>

              <div v-else-if="tab.ten === 'Quà tặng'">
                <div v-if="tab.danhSachQuaTang.length === 0">
                  <p>Hiện tại bạn chưa có quà tặng nào.</p>
                </div>
                <div v-else>
                  <ul class="gift-list">
                    <li v-for="(gift, index) in tab.danhSachQuaTang" :key="index" class="gift-item">
                      <div class="gift-header">
                        <strong>{{ gift.nameSale }}</strong>
                        <span class="gift-description">Giảm {{ gift.percent }}% từ {{ gift.startTime }} đến {{
                          gift.endTime }}</span>
                      </div>
                      <button class="claim-gift-btn">Nhận quà</button>
                    </li>
                  </ul>
                </div>
              </div>
              <div v-else>
                <p>{{ tab.noiDung }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();

const informationpersonal = ref({
  FullName: '',
  phoneNumber: '',
  mail: '',
  birth: '',
  image: '',
  password: '',
  imageRank: '',
  nameRank: '',
  point: 0,
  id_rank: 1,
  isActive: false,
});

const currentTab = ref(0);
const imagePreview = ref(null);
const historyPoints = ref([]);
const showChangePasswordForm = ref(false);
const otpSent = ref(false);
const changePasswordData = ref({
  email: '',
  otp: '',
  oldPassword: '',
  newPassword: '',
  confirmNewPassword: '',
});

const tabs = ref([
  { ten: 'Thông tin cá nhân', noiDung: '' },
  { ten: 'Lịch sử tích điểm', noiDung: '' },
  { ten: 'Thông báo', noiDung: '' },
  { ten: 'Quà tặng', noiDung: '', danhSachQuaTang: [] },
  { ten: 'Chính sách', noiDung: 'Đây là nội dung về chính sách thành viên.' },
]);

onMounted(async () => {
  const id = localStorage.getItem('customer_id');
  if (id) {
    try {
      const res = await api.get(`/client/customers/${id}`);
      informationpersonal.value = {
        ...res.data.customer,
        password: localStorage.getItem('customer_password') || '',
      };
    } catch (err) {
      console.error('Lỗi khi lấy thông tin người dùng:', err);
    }
  }

  // Lấy danh sách hóa đơn (lịch sử tích điểm)
  try {
    const customerId = localStorage.getItem('customer_id');
    if (!customerId) {
      console.error('Không tìm thấy customer_id trong localStorage');
      historyPoints.value = [];
      return;
    }
    const historyResponse = await api.get(`/client/invoices/${customerId}`);
    console.log('Dữ liệu hóa đơn:', historyResponse.data); // Log để kiểm tra dữ liệu
    historyPoints.value = (historyResponse.data.data || []).map(invoice => ({
      id: invoice.id,
      points: invoice.reward_points || 0, // Số điểm
      created_at: invoice.created_at, // Ngày nhận
      status: invoice.status === 2 ? 'received' : 'canceled', // Ánh xạ trạng thái
    }));
  } catch (error) {
    console.error('Lỗi khi lấy danh sách hóa đơn:', error.response || error);
    historyPoints.value = [];
  }

  // Lấy danh sách quà tặng
  try {
    const salesResponse = await api.get('/client/sales');
    tabs.value.find(tab => tab.ten === 'Quà tặng').danhSachQuaTang = salesResponse.data.data || [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khuyến mãi:', error.response || error);
    tabs.value.find(tab => tab.ten === 'Quà tặng').danhSachQuaTang = [];
  }

  // Cập nhật thông tin từ localStorage
  informationpersonal.value.image = localStorage.getItem('customer_image') || '';
  informationpersonal.value.name = localStorage.getItem('customer_fullName') || '';
  informationpersonal.value.mail = localStorage.getItem('customer_email') || '';
  informationpersonal.value.password = localStorage.getItem('customer_password') || '';
  informationpersonal.value.point = localStorage.getItem('customer_point') || '';
  informationpersonal.value.imageRank = localStorage.getItem('customer_imageRank') || '';
  informationpersonal.value.nameRank = localStorage.getItem('customer_nameRank') || '';
  informationpersonal.value.birth = localStorage.getItem('customer_birth') || '';
  informationpersonal.value.phoneNumber = localStorage.getItem('customer_phoneNumber') || '';
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    imagePreview.value = e.target.result;
    informationpersonal.value.image = e.target.result;
  };
  reader.readAsDataURL(file);
};

const sendOTP = async () => {
  const storedEmail = localStorage.getItem('customer_email');
  if (changePasswordData.value.email !== storedEmail) {
    alert('Email không khớp với thông tin tài khoản.');
    return;
  }

  try {
    await api.post('/client/forgot-password', { email: changePasswordData.value.email });
    otpSent.value = true;
    alert('Mã OTP đã được gửi đến email của bạn.');
  } catch (err) {
    console.error('Lỗi khi gửi OTP:', err);
    alert('Có lỗi xảy ra khi gửi OTP.');
  }
};

const changePassword = async () => {
  if (!changePasswordData.value.otp || !changePasswordData.value.oldPassword || !changePasswordData.value.newPassword || !changePasswordData.value.confirmNewPassword) {
    alert('Vui lòng nhập đầy đủ thông tin.');
    return;
  }

  if (changePasswordData.value.oldPassword !== localStorage.getItem('customer_password')) {
    alert('Mật khẩu cũ không đúng.');
    return;
  }

  if (changePasswordData.value.newPassword !== changePasswordData.value.confirmNewPassword) {
    alert('Mật khẩu mới và xác nhận mật khẩu không khớp.');
    return;
  }

  try {
    const response = await api.post('/client/reset-password', {
      email: changePasswordData.value.email,
      otp: changePasswordData.value.otp,
      old_password: changePasswordData.value.oldPassword,
      password: changePasswordData.value.newPassword,
      password_confirmation: changePasswordData.value.confirmNewPassword,
    });
    localStorage.setItem('customer_password', changePasswordData.value.newPassword);
    informationpersonal.value.password = changePasswordData.value.newPassword;
    alert('Đổi mật khẩu thành công.');
    cancelChangePassword();
  } catch (err) {
    console.error('Lỗi khi đổi mật khẩu:', err);
    alert('Có lỗi xảy ra khi đổi mật khẩu. Vui lòng kiểm tra mã OTP.');
  }
};

const cancelChangePassword = () => {
  showChangePasswordForm.value = false;
  otpSent.value = false;
  changePasswordData.value = {
    email: '',
    otp: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };
};

const updatePersonalInfo = async () => {
  const id = localStorage.getItem('customer_id');
  if (!id) return alert('Không tìm thấy ID người dùng');

  const payload = {
    FullName: informationpersonal.value.name,
    phoneNumber: informationpersonal.value.phoneNumber,
    birth: informationpersonal.value.birth,
    image_base64: informationpersonal.value.image,
  };

  try {
    const response = await api.put(`/client/customers/${id}`, payload);
    alert('Cập nhật thông tin thành công');
    informationpersonal.value = {
      ...response.data.customer,
      name: response.data.customer.FullName,
      password: localStorage.getItem('customer_password') || '',
    };
    localStorage.setItem('customer_fullName', response.data.customer.FullName);
  } catch (err) {
    console.error('Lỗi khi cập nhật thông tin:', err.response?.data?.message || err.message);
    alert(`Có lỗi xảy ra khi cập nhật: ${err.response?.data?.message || err.message}`);
  }
};

const deletePersonalInfo = async () => {
  if (!confirm('Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.')) return;

  const id = localStorage.getItem('customer_id');
  if (!id) return alert('Không tìm thấy ID người dùng');

  try {
    await api.delete(`/client/customers/${id}`);
    alert('Xóa tài khoản thành công');
    localStorage.clear();
    router.push({ name: 'users-home' });
  } catch (err) {
    console.error('Lỗi khi xóa tài khoản:', err);
    alert('Có lỗi xảy ra khi xóa tài khoản');
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};
</script>

<style scoped>
/* Base styles */
.gift-list {
  list-style: none;
  padding: 0;
}

.gift-item {
  background-color: #f9f9f9;
  padding: 10px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.gift-item .gift-header {
  font-size: 1.1em;
  margin-bottom: 8px;
}

.gift-item .gift-description {
  font-size: 0.9em;
  color: #666;
}

.claim-gift-btn {
  padding: 6px 12px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.claim-gift-btn:hover {
  background-color: #45a049;
}

.input-information,
.change-password-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 8px;
}

.row-information {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
}

.group-information {
  display: flex;
  flex-direction: column;
  position: relative;
  flex: 1 1 100%;
  min-width: 200px;
}

.group-information input {
  border: 1px solid #ccc;
  background-color: white;
  padding: 8px 12px 8px 35px;
  border-radius: 4px;
  font-size: 14px;
  width: 100%;
  box-sizing: border-box;
}

.group-information i {
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(20%);
  color: #888;
}

.container-personalinformation {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 15px;
  font-family: sans-serif;
  background-color: #f5f5f5;
  min-height: 100vh;
}

.rank-box {
  width: 100%;
  background: white;
  padding: 15px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}

.member-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  flex-wrap: wrap;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
}

.rank-image-container {
  width: 60px;
  height: 60px;
  overflow: hidden;
}

.rank-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-details h3 {
  font-size: 16px;
  margin-bottom: 2px;
}

.total-spending .label {
  font-size: 13px;
  color: gray;
  margin-top: 12px;
}

.label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

.amount {
  font-size: 18px;
  color: #f37021;
  font-weight: bold;
  margin-bottom: 8px;
}

.progress-bar {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: relative;
  height: 60px;
  margin-top: 8px;
  border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
  padding-top: 15px;
}

.milestone {
  text-align: center;
  position: relative;
  flex: 1;
}

.milestone .icon {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin: 5px auto 0;
  background: #ccc;
}

.milestone .start {
  background: #aaa;
}

.milestone .mid {
  background: gold;
}

.milestone .current {
  background: orange;
  border: 2px solid white;
  box-shadow: 0 0 4px orange;
}

.info-box {
  width: 100%;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
}

.category-container {
  width: 100%;
}

.tab-links {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
}

.tab-link {
  padding: 8px 15px;
  cursor: pointer;
  font-weight: bold;
  border: none;
  background-color: transparent;
  transition: 0.3s;
  color: #333;
  font-size: 14px;
}

.tab-link.current {
  color: #ff4500;
  border-bottom: 3px solid #ff4500;
}

.tab-content {
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
}

.transaction-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.transaction-item {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.transaction-image {
  width: 40px;
  height: 40px;
  object-fit: cover;
}

.transaction-details strong {
  font-size: 14px;
  color: #143b36;
}

.transaction-details p {
  margin: 4px 0 0;
  font-size: 13px;
  color: #666;
}

.notification-list {
  list-style: none;
  padding: 0;
}

.notification-item {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
}

.btn-update {
  padding: 6px 12px;
  background-color: #00b894;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-delete {
  padding: 6px 12px;
  background-color: rgb(179, 10, 10);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-cancel {
  padding: 6px 12px;
  background-color: #ff4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-update:hover {
  background-color: #019875;
}

.btn-cancel:hover {
  background-color: #cc0000;
}

.change-password-form h3 {
  font-size: 1.3em;
  margin-bottom: 15px;
  color: #333;
}

.support-footer {
  margin-top: 15px;
  text-align: center;
}

.support-info h4 {
  font-size: 14px;
}

.support-info p {
  font-size: 13px;
  margin: 5px 0;
}

/* Responsive adjustments */
@media (min-width: 768px) {
  .container-personalinformation {
    flex-direction: row;
    padding: 20px;
  }

  .rank-box {
    width: 35%;
    padding: 20px;
  }

  .info-box {
    width: 65%;
    padding: 20px;
  }

  .member-info {
    flex-wrap: nowrap;
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .rank-image-container {
    width: 80px;
    height: 80px;
  }

  .member-details h3 {
    font-size: 18px;
  }

  .total-spending .label {
    font-size: 14px;
  }

  .amount {
    font-size: 20px;
  }

  .progress-bar {
    height: 70px;
    margin-top: 10px;
    padding-top: 20px;
  }

  .milestone .icon {
    width: 20px;
    height: 20px;
  }

  .group-information input {
    font-size: 14px;
    width: 100%;
    max-width: 400px;
  }

  .row-information {
    flex-wrap: nowrap;
  }

  .tab-link {
    font-size: 16px;
    padding: 10px 20px;
  }

  .transaction-details strong {
    font-size: 16px;
  }

  .transaction-details p {
    font-size: 14px;
  }

  .notification-item {
    font-size: 15px;
  }

  .btn-update,
  .btn-delete,
  .btn-cancel {
    padding: 8px 16px;
  }

  .change-password-form h3 {
    font-size: 1.5em;
  }

  .support-info h4 {
    font-size: 16px;
  }

  .support-info p {
    font-size: 14px;
  }
}

@media (max-width: 767px) {
  .group-information input {
    font-size: 13px;
    padding: 6px 10px 6px 30px;
  }

  .group-information i {
    top: 45%;
    left: 8px;
  }

  .tab-links {
    gap: 5px;
  }

  .tab-link {
    font-size: 13px;
    padding: 6px 10px;
  }

  .tab-content {
    padding: 10px;
  }

  .transaction-image {
    width: 30px;
    height: 30px;
  }

  .progress-bar {
    height: 50px;
  }

  .milestone .icon {
    width: 14px;
    height: 14px;
  }

  .milestone span {
    font-size: 12px;
  }
}

@media (max-width: 480px) {
  .avatar {
    width: 40px;
    height: 40px;
  }

  .rank-image-container {
    width: 50px;
    height: 50px;
  }

  .member-details h3 {
    font-size: 14px;
  }

  .total-spending .label {
    font-size: 12px;
  }

  .amount {
    font-size: 16px;
  }

  .tab-link {
    font-size: 12px;
    padding: 5px 8px;
  }

  .btn-update,
  .btn-delete,
  .btn-cancel {
    padding: 5px 10px;
    font-size: 12px;
  }

  .change-password-form h3 {
    font-size: 1.2em;
  }

  .support-info h4 {
    font-size: 13px;
  }

  .support-info p {
    font-size: 12px;
  }
}

/* Animation for progress bar milestones */
.progress-bar .milestone .mid,
.progress-bar .milestone .current,
.progress-bar .milestone .start {
  animation: khanh 1s infinite;
}

@keyframes khanh {
  0% {
    box-shadow: 0 0 0 0 rgba(250, 229, 113, 0.7);
  }

  50% {
    box-shadow: 0 0 0 8px rgba(250, 229, 113, 0.7);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(250, 229, 113, 0);
  }
}

.points-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  font-size: 14px;
  table-layout: fixed; /* ép các cột đều nhau */
}

.points-table th,
.points-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: center;
  vertical-align: middle;
  word-wrap: break-word;
  white-space: nowrap; /* không xuống dòng */
  overflow: hidden;
  text-overflow: ellipsis;
}

.points-table th {
  background-color: #28a745;
  color: white;
  font-weight: bold;
}

.points-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.points-table tr:hover {
  background-color: #e6f7e6;
}

.status-received {
  color: #28a745;
  font-weight: bold;
}

.status-canceled {
  color: #dc3545;
  font-weight: bold;
}

</style>