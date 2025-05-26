<template>
  <div class="app-wrapper">
    <div class="app-container">
      <div class="col-left">
        <header>
          <div class="restaurant-branding">
            <img src="/imageicon/phefood.png" alt="Restaurant Logo" class="restaurant-logo" />
            <h1>Nhà hàng Phố Ẩm Thực</h1>
            <p>Chia sẻ trải nghiệm của bạn với những món ăn tuyệt vời!</p>
          </div>
        </header>
        <main>
          <section class="form-section">
            <h2>Viết đánh giá của bạn</h2>
            <form @submit.prevent="submitReview" class="review-form" novalidate>
              <!-- Rating -->
              <div class="form-group rating-group">
                <label>Đánh giá:</label>
                <div class="stars">
                  <button
                    v-for="star in 5"
                    :key="star"
                    type="button"
                    :class="{ active: rating >= star }"
                    @click="rating = star"
                    aria-label="Chọn số sao đánh giá"
                  >
                    ★
                  </button>
                </div>
              </div>
              <div class="form-group">
                <label for="userName"></label>Xin chào {{ userName }}
              </div>
              <!-- Dropdown chọn món ăn -->
              <div class="form-group">
                <label for="id_food">Món ăn</label>
                <div class="custom-select" @click="toggleDropdown">
                  <div class="selected-item">
                    <span>{{ selectedFood ? selectedFood.name : 'Chọn món ăn đánh giá' }}</span>
                  </div>
                  <ul v-if="isDropdownOpen" class="dropdown-list">
                    <li
                      v-for="food in foodList"
                      :key="food.id"
                      class="dropdown-item"
                      @click.stop="selectFood(food)"
                    >
                      <p>{{ food.name }}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Review Comment -->
              <div class="form-group">
                <label for="detail">Nhận xét</label>
                <textarea
                  id="detail"
                  v-model="formEvaluation.detail"
                  placeholder="Viết nhận xét của bạn tại đây..."
                  required
                  rows="4"
                ></textarea>
              </div>
              <!-- Upload Photos -->
              <div class="form-group">
                <label for="photos">Tải ảnh lên</label>
                <input
                  type="file"
                  id="photos"
                  multiple
                  accept="image/*"
                  @change="handleFileChange"
                />
                <div class="photo-previews" v-if="photoPreviews.length">
                  <div
                    v-for="(photo, index) in photoPreviews"
                    :key="index"
                    class="photo-preview"
                  >
                    <img :src="photo" alt="Xem trước ảnh" />
                    <button
                      type="button"
                      class="remove-photo"
                      @click="removePhoto(index)"
                      aria-label="Xóa ảnh"
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
              <button type="submit" :disabled="!canSubmit" class="submit-btn">
                {{ isEditing ? 'Cập nhật đánh giá' : 'Gửi đánh giá' }}
              </button>
            </form>
          </section>
          <section v-if="reviews.length" class="reviews-section">
            <h2>Đánh giá trước đây</h2>
            <ul class="reviews-list">
              <li v-for="(review, index) in reviews" :key="review.id" class="review-item">
              <p style="font-size: 30px;">{{ userName }}</p>
                <div class="review-header">
                  <div class="review-rating">
                    <span
                      v-for="n in 5"
                      :key="n"
                      class="star"
                      :class="{ filled: n <= review.rating }"
                    >
                      ★
                    </span>
                  </div>
                  <time :datetime="review.date">{{ formattedDate(review.date) }}</time>
                </div>
                <div class="review-food">
                  <span>{{ foodList.find(f => f.id === review.id_food)?.name }}</span>
                </div>
                <p class="review-comment">{{ review.detail }}</p>
                <div class="review-photos" v-if="review.photos.length">
                  <img
                    v-for="(photo, i) in review.photos"
                    :key="i"
                    :src="photo"
                    alt="Ảnh đánh giá"
                    class="review-photo"
                  />
                </div>
                <div class="admin-reply">
                  <span class="admin-name">Admin:</span>
                  {{ adminReplies[index % adminReplies.length] }}
                </div>
                <div class="review-actions">
                  <button @click="editReview(review)">Sửa</button>
                  <button @click="deleteReview(index)">Xóa</button>
                </div>
              </li>
            </ul>
          </section>
          <section v-else class="no-reviews">
            <p>Chưa có đánh giá nào</p>
          </section>
        </main>
        <footer>
          <small
            >© 2025 Nhà hàng Phố Ẩm Thực | 52 Giáp Văn Cương, Đà Nẵng | Liên hệ:
            info@phoamthuc.vn</small
          >
        </footer>
      </div>
      <div class="col-right">
        <div class="map">
          <h3>Thăm chúng tôi</h3>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.663132104762!2d108.15967391020955!3d16.082961439006894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218c30c993543%3A0xec01cc42d8352cff!2zNTIgR2nDoXAgVsSDbiBDxrDGoW5nLCBIb8OgIE1pbmgsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1747078025558!5m2!1svi!2s"
            width="100%"
            height="600px"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import api from '../../services/api';
import { useToast } from 'vue-toastification';

const toast = useToast();
const formEvaluation = reactive({
  id_food: '',
  detail: '',
  id_customer: localStorage.getItem('customer_id') || '1', // Lấy id_customer từ localStorage
});
const userName = ref(localStorage.getItem('customer_fullName') || 'Khách');
const rating = ref(0);
const photoFiles = ref([]);
const photoPreviews = ref([]);
const reviews = ref([]);
const editingReview = ref(null);
const isDropdownOpen = ref(false);
const foodList = ref([]);

const adminReplies = [
  'Cảm ơn bạn đã đánh giá! Chúng tôi rất trân trọng ý kiến của bạn.',
  'Rất vui được phục vụ bạn! Hy vọng bạn sẽ quay lại sớm.',
  'Cảm ơn bạn đã chia sẻ trải nghiệm tuyệt vời này!',
  'Chúng tôi rất biết ơn sự ủng hộ của bạn. Chúc bạn ngon miệng!',
];

const canSubmit = computed(() => {
  return rating.value > 0 && formEvaluation.detail.trim().length > 0 && formEvaluation.id_food;
});

const isEditing = computed(() => editingReview.value !== null);

const selectedFood = computed(() => {
  return foodList.value.find(f => f.id === formEvaluation.id_food) || null;
});

onMounted(async () => {
  try {
    // Lấy danh sách món ăn từ API
    const response = await api.get('/client/foods');
    foodList.value = response.data.map(food => ({
      id: food.id,
      name: food.name,
    }));
  } catch (error) {
    console.error('Lỗi khi tải danh sách món ăn:', error);
    toast.error('Không thể tải danh sách món ăn!');
  }
  loadReviewsFromLocalStorage();
});

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function selectFood(food) {
  formEvaluation.id_food = food.id;
  isDropdownOpen.value = false;
}

function handleFileChange(event) {
  const files = Array.from(event.target.files);
  for (const file of files) {
    if (!file.type.startsWith('image/')) continue;
    photoFiles.value.push(file);
    const reader = new FileReader();
    reader.onload = e => {
      photoPreviews.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
  event.target.value = null;
}

function removePhoto(index) {
  photoFiles.value.splice(index, 1);
  photoPreviews.value.splice(index, 1);
}

function submitReview() {
  if (!canSubmit.value) return;
  const formData = new FormData();
  formData.append('id_food', formEvaluation.id_food);
  formData.append('star', rating.value);
  formData.append('detail', formEvaluation.detail);
  formData.append('id_customer', formEvaluation.id_customer);
  photoFiles.value.forEach(file => {
    formData.append('photos[]', file);
  });

  if (isEditing.value) {
    formData.append('_method', 'PUT');
    api
      .post(`/client/rates/update/${editingReview.value.id}`, formData)
      .then(response => {
        const updatedReview = {
          id: editingReview.value.id,
          rating: rating.value,
          detail: formEvaluation.detail,
          photos: photoPreviews.value,
          date: new Date().toISOString(),
          id_food: formEvaluation.id_food,
          id_customer: formEvaluation.id_customer,
        };
        const index = reviews.value.findIndex(r => r.id === editingReview.value.id);
        reviews.value.splice(index, 1, updatedReview);
        saveReviewsToLocalStorage();
        resetForm();
        toast.success('Cập nhật đánh giá thành công!');
      })
      .catch(error => {
        console.error('Lỗi khi cập nhật đánh giá:', error);
        toast.error('Cập nhật đánh giá thất bại!');
      });
  } else {
    api
      .post('/client/rates/create', formData)
      .then(response => {
        const newReview = {
          id: response.data.data.id,
          rating: rating.value,
          detail: formEvaluation.detail,
          photos: photoPreviews.value,
          date: new Date().toISOString(),
          id_food: formEvaluation.id_food,
          id_customer: formEvaluation.id_customer,
        };
        reviews.value.unshift(newReview);
        saveReviewsToLocalStorage();
        resetForm();
        toast.success('Gửi đánh giá thành công!');
      })
      .catch(error => {
        console.error('Lỗi khi gửi đánh giá:', error);
        toast.error('Gửi đánh giá thất bại!');
      });
  }
}

function editReview(review) {
  editingReview.value = review;
  formEvaluation.id_food = review.id_food;
  formEvaluation.detail = review.detail;
  formEvaluation.id_customer = localStorage.getItem('customer_id') || '1';
  rating.value = review.rating;
  photoPreviews.value = review.photos || [];
  photoFiles.value = [];
}

function deleteReview(index) {
  const review = reviews.value[index];
  if (confirm('Bạn có chắc muốn xóa đánh giá này?')) {
    api
      .delete(`/client/rates/delete/${review.id}`)
      .then(() => {
        reviews.value.splice(index, 1);
        saveReviewsToLocalStorage();
        toast.success('Đánh giá đã được xóa.');
      })
      .catch(error => {
        console.error('Lỗi khi xóa đánh giá:', error);
        toast.error('Không thể xóa đánh giá. Vui lòng thử lại sau.');
      });
  }
}

function formattedDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function resetForm() {
  rating.value = 0;
  formEvaluation.id_food = '';
  formEvaluation.detail = '';
  formEvaluation.id_customer = localStorage.getItem('customer_id') || '1';
  photoFiles.value = [];
  photoPreviews.value = [];
  editingReview.value = null;
}

function saveReviewsToLocalStorage() {
  localStorage.setItem('restaurant_reviews', JSON.stringify(reviews.value));
}

function loadReviewsFromLocalStorage() {
  const saved = localStorage.getItem('restaurant_reviews');
  if (saved) {
    reviews.value = JSON.parse(saved);
  }
}
</script>
<style scoped>
.app-wrapper {
  display: flex;
  justify-content: center;
  background: #f5f5f5;
  min-height: 100vh;
}

.app-container {
  display: flex;
  width: 100%;
  max-width: 1400px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.col-left {
  width: 70%;
  padding: 24px;
}

.col-right {
  width: 30%;
  padding: 24px;
  background: #f9f9f9;
}

.restaurant-branding {
  text-align: center;
  margin-bottom: 24px;
}

.restaurant-logo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
}

.restaurant-branding h1 {
  font-size: 28px;
  font-weight: 700;
  color: #d69c52;
  margin: 12px 0;
}

.restaurant-branding p {
  font-size: 16px;
  color: #666;
}

.form-section h2,
.reviews-section h2 {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.rating-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stars button {
  font-size: 24px;
  color: #ccc;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.stars button.active {
  color: #f4c10f;
}

.custom-select {
  position: relative;
  cursor: pointer;
}

.selected-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
}

.food-icon {
  width: 24px;
  height: 24px;
  object-fit: cover;
  border-radius: 4px;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  transition: background 0.3s ease;
}

.dropdown-item:hover {
  background: #f0f0f0;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

.form-group textarea {
  resize: vertical;
}

.photo-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 12px;
}

.photo-preview {
  position: relative;
  width: 100px;
  height: 100px;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.remove-photo {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e63946;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.submit-btn {
  background: #d69c52;
  color: #fff;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background: #b57c3e;
}

.reviews-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.review-item {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.review-rating .star {
  font-size: 18px;
  color: #ccc;
}

.review-rating .star.filled {
  color: #f4c10f;
}

.review-food {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.review-comment {
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
}

.review-photos {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 12px;
}

.review-photo {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
}

.admin-reply {
  background: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  color: #143b36;
  margin-bottom: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.admin-reply .admin-name {
  font-weight: 600;
  color: #d69c52;
  margin-right: 4px;
}

.review-actions {
  display: flex;
  gap: 12px;
}

.review-actions button {
  background: #d69c52;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.review-actions button:hover {
  background: #b57c3e;
}

.review-actions button:last-child {
  background: #e63946;
}

.review-actions button:last-child:hover {
  background: #c62828;
}

.no-reviews {
  text-align: center;
  padding: 24px;
}

.map h3 {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
}

footer {
  text-align: center;
  margin-top: 24px;
  color: #666;
}

@media (max-width: 768px) {
  .app-container {
    flex-direction: column;
  }

  .col-left,
  .col-right {
    width: 100%;
  }

  .col-right {
    padding: 16px;
  }

  .map iframe {
    height: 400px;
  }
}

@media (max-width: 480px) {
  .restaurant-branding h1 {
    font-size: 24px;
  }

  .form-section h2,
  .reviews-section h2 {
    font-size: 20px;
  }

  .form-group label,
  .form-group input,
  .form-group textarea {
    font-size: 14px;
  }

  .submit-btn {
    font-size: 14px;
    padding: 10px 20px;
  }

  .review-comment {
    font-size: 14px;
  }

  .admin-reply {
    font-size: 13px;
  }
}
</style>