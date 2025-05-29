<template>
  <div class="restaurant-ranking">
    <h1 class="main-title">🏆 Bảng Xếp Hạng Khách Hàng</h1>

    <!-- Hiển thị thông báo lỗi nếu API thất bại -->
    <div v-if="errorMessage" class="error-message">
      <p>{{ errorMessage }}</p>
      <button class="retry-button" @click="fetchCustomers">Thử Lại</button>
    </div>

    <!-- Hiển thị nội dung chính nếu không có lỗi -->
    <div v-else class="ranking-container">
      <!-- Phần trái: Carousel khách hàng -->
      <div class="featured-dishes">
        <h2 class="section-title">Khách Hàng Nổi Bật</h2>
        <div class="carousel" v-if="featuredDishes.length > 0">
          <div class="carousel-item" v-for="(customer, index) in featuredDishes" :key="index" :class="{ active: currentDishIndex === index }">
            <img :src="customer.image || '/imageicon/default_user.png'" :alt="customer.FullName" />
            <div class="dish-info">
              <h3>{{ customer.FullName }}</h3>
              <p>{{ customer.description || `Khách hàng với ${customer.point} điểm tích lũy.` }}</p>
            </div>
          </div>
          <button class="carousel-control prev" @click="prevDish">❮</button>
          <button class="carousel-control next" @click="nextDish">❯</button>
        </div>
        <p v-else class="no-data">Không có khách hàng nổi bật để hiển thị.</p>
      </div>

      <!-- Phần phải: Bảng xếp hạng -->
      <div class="ranking-list">
        <h2 class="section-title">Top Khách Hàng</h2>
        <div class="danh-sach-rank" v-if="ranks.length > 0">
          <div
            v-for="(customer, index) in ranks"
            :key="customer.id"
            class="rank-card"
            :class="'hang-' + (index + 1)"
          >
            <div class="rank-medal">
              <i :class="['fas', getMedalIcon(index)]"></i>
            </div>
            <img :src="customer.image || '/imageicon/default_user.png'" :alt="customer.FullName" />
            <div class="rank-info">
              <div class="ten-rank">
                #{{ index + 1 }} - {{ customer.FullName }} ({{ customer.rank.nameRank }})
              </div>
              <p class="rank-description">{{ customer.description || `Điểm tích lũy: ${customer.point}` }}</p>
            </div>
          </div>
        </div>
        <p v-else class="no-data">Không có khách hàng nào trong bảng xếp hạng.</p>
      </div>
    </div>

    <!-- Modal chi tiết khách hàng -->
    <div class="modal-overlay" v-if="showModal" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="close-button" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
        <h2>{{ selectedCustomer.FullName }}</h2>
        <img :src="selectedCustomer.image || '/imageicon/default_user.png'" :alt="selectedCustomer.FullName" class="modal-image" />
        <p>{{ selectedCustomer.description || `Khách hàng với ${selectedCustomer.point} điểm tích lũy.` }}</p>
        <p><strong>Số Điểm:</strong> {{ selectedCustomer.point }} điểm</p>
        <p><strong>Hạng:</strong> {{ selectedCustomer.rank.nameRank }}</p>
        <p><strong>Email:</strong> {{ selectedCustomer.mail }}</p>
        <p><strong>Số Điện Thoại:</strong> {{ selectedCustomer.phoneNumber }}</p>
        <button class="add-to-cart" @click="viewProfile(selectedCustomer)">Xem Hồ Sơ</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const ranks = ref([])
const featuredDishes = ref([])
const currentDishIndex = ref(0)
const showModal = ref(false)
const selectedCustomer = ref(null)
const errorMessage = ref(null)

const fetchCustomers = async () => {
  try {
    errorMessage.value = null // Xóa thông báo lỗi trước khi thử lại
    const response = await api.get('/client/customers')
    const customers = response.data.customers
      .filter(customer => customer.isActive)
      .sort((a, b) => b.point - a.point)

    ranks.value = customers.map(customer => ({
      id: customer.id,
      FullName: customer.FullName,
      image: customer.image || '/imageicon/default_user.png',
      description: `Khách hàng với ${customer.point} điểm tích lũy.`,
      point: customer.point,
      rank: customer.rank,
      mail: customer.mail,
      phoneNumber: customer.phoneNumber
    }))

    featuredDishes.value = ranks.value.slice(0, 3).map(customer => ({
      FullName: customer.FullName,
      image: customer.image,
      description: customer.description,
      point: customer.point
    }))
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu khách hàng:', error)
    errorMessage.value = 'Không thể tải danh sách khách hàng. Vui lòng thử lại sau.'
    ranks.value = []
    featuredDishes.value = []
  }
}

onMounted(fetchCustomers)

function getMedalIcon(index) {
  return index === 0 ? 'fa-medal' : index === 1 ? 'fa-trophy' : index === 2 ? 'fa-award' : ''
}

function prevDish() {
  currentDishIndex.value = (currentDishIndex.value - 1 + featuredDishes.value.length) % featuredDishes.value.length
}

function nextDish() {
  currentDishIndex.value = (currentDishIndex.value + 1) % featuredDishes.value.length
}

function viewCustomerDetails(customer) {
  selectedCustomer.value = customer
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedCustomer.value = null
}

function viewProfile(customer) {
  alert(`Đang xem hồ sơ của ${customer.FullName}!`)
  closeModal()
}
</script>

<style scoped>
.restaurant-ranking {
  background: linear-gradient(135deg, #143b36 0%, #1a4b46 100%);
  padding: 2rem 1.5rem;
  border-radius: 1.5rem;
  width: 100%;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  max-width: 1200px;
  margin: 0 auto;
}

.main-title {
  text-align: center;
  font-size: clamp(1.75rem, 5vw, 2.25rem);
  font-weight: 800;
  color: #ffd700;
  margin-bottom: 2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.error-message {
  text-align: center;
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.1);
  padding: 1rem;
  border-radius: 0.75rem;
  margin-bottom: 1.5rem;
}

.error-message p {
  font-size: clamp(0.875rem, 3vw, 1rem);
  margin: 0 0 1rem;
}

.retry-button {
  background: #4caf50;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  transition: background 0.3s ease;
}

.retry-button:hover {
  background: #388e3c;
}

.ranking-container {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.featured-dishes {
  flex: 1;
  min-width: 280px;
}

.section-title {
  font-size: clamp(1.25rem, 4vw, 1.5rem);
  font-weight: 700;
  color: #f0f4f8;
  margin-bottom: 1.25rem;
  text-align: center;
}

.carousel {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.carousel-item {
  display: none;
  text-align: center;
}

.carousel-item.active {
  display: block;
}

.carousel-item img {
  width: 100%;
  height: clamp(180px, 40vw, 300px);
  object-fit: cover;
  border-radius: 1rem;
}

.dish-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(20, 59, 54, 0.8);
  color: #f0f4f8;
  padding: 1rem;
  border-bottom-left-radius: 1rem;
  border-bottom-right-radius: 1rem;
}

.dish-info h3 {
  font-size: clamp(1rem, 3vw, 1.25rem);
  margin: 0 0 0.5rem;
}

.dish-info p {
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  margin: 0;
}

.carousel-control {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: none;
  color: #f0f4f8;
  font-size: clamp(1rem, 3vw, 1.5rem);
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.3s ease;
}

.carousel-control:hover {
  background: rgba(0, 0, 0, 0.8);
}

.prev {
  left: 0.625rem;
}

.next {
  right: 0.625rem;
}

.ranking-list {
  flex: 1;
  min-width: 280px;
}

.danh-sach-rank {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rank-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #ffffff;
  padding: 1rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.rank-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.rank-medal i {
  font-size: clamp(1.25rem, 4vw, 1.75rem);
  color: #ffd700;
}

.rank-medal i.fa-trophy {
  color: #c0c0c0;
}

.rank-medal i.fa-award {
  color: #cd7f32;
}

.rank-card img {
  width: clamp(50px, 15vw, 80px);
  height: clamp(50px, 15vw, 80px);
  object-fit: cover;
  border-radius: 0.75rem;
}

.rank-info {
  flex: 1;
}

.ten-rank {
  font-size: clamp(1rem, 3.5vw, 1.375rem);
  font-weight: 700;
  color: #143b36;
  margin-bottom: 0.5rem;
}

.rank-description {
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  color: #666;
  margin: 0 0 0.5rem;
}

.view-details {
  background: #4caf50;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  transition: background 0.3s ease;
}

.view-details:hover {
  background: #388e3c;
}

.hang-1 {
  border-left: 8px solid #ffd700;
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.15), #ffffff);
}

.hang-2 {
  border-left: 8px solid #c0c0c0;
  background: linear-gradient(90deg, rgba(192, 192, 192, 0.15), #ffffff);
}

.hang-3 {
  border-left: 8px solid #cd7f32;
  background: linear-gradient(90deg, rgba(205, 127, 50, 0.15), #ffffff);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.modal-content {
  background: #ffffff;
  border-radius: 1rem;
  padding: clamp(1rem, 5vw, 1.5rem);
  max-width: clamp(300px, 90vw, 500px);
  width: 100%;
  position: relative;
  text-align: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
}

.close-button {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: clamp(1rem, 3vw, 1.25rem);
  color: #143b36;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #e63946;
}

.modal-image {
  width: 100%;
  height: clamp(150px, 35vw, 200px);
  object-fit: cover;
  border-radius: 0.75rem;
  margin: 1rem 0;
}

.add-to-cart {
  background: #4caf50;
  color: #ffffff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: clamp(0.875rem, 3vw, 1rem);
  transition: background 0.3s ease;
}

.add-to-cart:hover {
  background: #388e3c;
}

.no-data {
  text-align: center;
  font-size: clamp(0.875rem, 3vw, 1rem);
  color: #f0f4f8;
  margin: 1rem 0;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@media (max-width: 768px) {
  .ranking-container {
    flex-direction: column;
  }

  .carousel-item img {
    height: clamp(150px, 35vw, 200px);
  }

  .rank-card img {
    width: clamp(40px, 12vw, 60px);
    height: clamp(40px, 12vw, 60px);
  }

  .ten-rank {
    font-size: clamp(0.875rem, 3vw, 1.125rem);
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: clamp(1.5rem, 4.5vw, 1.75rem);
  }

  .section-title {
    font-size: clamp(1rem, 3.5vw, 1.25rem);
  }

  .modal-content {
    padding: 0.75rem;
  }

  .error-message {
    padding: 0.75rem;
  }

  .retry-button {
    padding: 0.5rem 0.75rem;
    font-size: clamp(0.75rem, 2.5vw, 0.875rem);
  }
}
</style>