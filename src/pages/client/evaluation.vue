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
                  <button v-for="star in 5" :key="star" type="button" :class="{ active: rating >= star }" @click="rating = star" aria-label="Chọn số sao đánh giá">
                    ★
                  </button>
                </div>
              </div>
              <!-- Dropdown chọn món ăn -->
              <div class="form-group">
                <label for="id_food">Món ăn</label>
                <div class="custom-select" @click="toggleDropdown">
                  <div class="selected-item">
                    <img v-if="selectedFood" :src="selectedFood.image" alt="Món ăn được chọn" class="food-icon" />
                    <span>{{ selectedFood ? selectedFood.name : 'Chọn món ăn đánh giá' }}</span>
                  </div>
                  <ul v-if="isDropdownOpen" class="dropdown-list">
                    <li v-for="food in foodList" :key="food.id" class="dropdown-item" @click.stop="selectFood(food)">
                      <img :src="food.image" alt="Hình món ăn" class="food-icon" />
                      <p>{{ food.name }}</p>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- Customer ID -->
              <div class="form-group">
                <label for="id_customer">Mã khách hàng</label>
                <input type="text" id="id_customer" v-model="formEvaluation.id_customer" placeholder="Nhập mã khách hàng của bạn" required />
              </div>
              <!-- Review Comment -->
              <div class="form-group">
                <label for="detail">Nhận xét</label>
                <textarea id="detail" v-model="formEvaluation.detail" placeholder="Viết nhận xét của bạn tại đây..." required rows="4"></textarea>
              </div>
              <!-- Upload Photos -->
              <div class="form-group">
                <label for="photos">Tải ảnh lên</label>
                <input type="file" id="photos" multiple accept="image/*" @change="handleFileChange" />
                <div class="photo-previews" v-if="photoPreviews.length">
                  <div v-for="(photo, index) in photoPreviews" :key="index" class="photo-preview">
                    <img :src="photo" alt="Xem trước ảnh" />
                    <button type="button" class="remove-photo" @click="removePhoto(index)" aria-label="Xóa ảnh">×</button>
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
                <div class="review-header">
                  <div class="review-rating">
                    <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }">★</span>
                  </div>
                  <time :datetime="review.date">{{ formattedDate(review.date) }}</time>
                </div>
                <div class="review-food">
                  <img :src="foodList.find(f => f.id === review.id_food)?.image" alt="Món ăn" class="food-icon" />
                  <span>{{ foodList.find(f => f.id === review.id_food)?.name }}</span>
                </div>
                <p class="review-comment">{{ review.detail }}</p>
                <div class="review-photos" v-if="review.photos.length">
                  <img v-for="(photo, i) in review.photos" :key="i" :src="photo" alt="Ảnh đánh giá" class="review-photo" />
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
          <small>© 2025 Nhà hàng Phố Ẩm Thực | 52 Giáp Văn Cương, Đà Nẵng | Liên hệ: info@phoamthuc.vn</small>
        </footer>
      </div>
      <div class="col-right">
        <div class="map">
          <h3>Thăm chúng tôi</h3>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.663132104762!2d108.15967391020955!3d16.082961439006894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218c30c993543%3A0xec01cc42d8352cff!2zNTIgR2nDoXAgVsSDbiBDxrDGoW5nLCBIb8OgIE1pbmgsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1747078025558!5m2!1svi!2s" width="100%" height="600px" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import api from "../../services/api";
const formEvaluation = reactive({
  id_food: "",
  detail: "",
  id_customer: "", 
});
const userEmail = ref(null);

const rating = ref(0);
const photoFiles = ref([]);
const photoPreviews = ref([]);
const reviews = ref([]);
const editingReview = ref(null);
const isDropdownOpen = ref(false);

// Danh sách món ăn mẫu
const foodList = [
  { id: 1, name: 'Cơm Gà', image: 'imageicon/phefood.png' },
  { id: 2, name: 'Bánh Mì', image: 'imageicon/phefood.png' },
  { id: 3, name: 'Phở', image: 'imageicon/phefood.png' },
];
// Computed
const canSubmit = computed(() => {
  return rating.value > 0 && formEvaluation.detail.trim().length > 0;
});
const isEditing = computed(() => editingReview.value !== null);
const selectedFood = computed(() => {
  return foodList.find((f) => f.id === formEvaluation.id_food) || null;
});
// Methods
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
    if (!file.type.startsWith("image/")) continue;
    photoFiles.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => {
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
  formData.append("id_food", formEvaluation.id_food);
  formData.append("star", rating.value);
  formData.append("detail", formEvaluation.detail);
  formData.append("id_customer", formEvaluation.id_customer);
  photoFiles.value.forEach((file) => {
    formData.append("photos[]", file);
  });
  if (isEditing.value) {
    formData.append("_method", "PUT");
    api
      .post(`/client/rates/update/${editingReview.value.id}`, formData)
      .then((response) => {
        const updatedReview = {
          id: editingReview.value.id,
          rating: rating.value,
          detail: formEvaluation.detail,
          photos: photoPreviews.value,
          date: new Date().toISOString(),
          id_food: formEvaluation.id_food,
          id_customer: formEvaluation.id_customer,
        };
        const index = reviews.value.findIndex((r) => r.id === editingReview.value.id);
        reviews.value.splice(index, 1, updatedReview);
        saveReviewsToLocalStorage();
        resetForm();
      })
      .catch((error) => {
        console.error("Lỗi khi cập nhật đánh giá:", error);
      });
  } else {
    api
      .post("/client/rates/create", formData)
      .then((response) => {
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
      })
      .catch((error) => {
        console.error("Lỗi khi gửi đánh giá:", error);
      });
  }
}
function editReview(review) {
  editingReview.value = review;
  formEvaluation.id_food = review.id_food;
  formEvaluation.detail = review.detail;
  formEvaluation.id_customer = review.id_customer;
  rating.value = review.rating;
  photoPreviews.value = review.photos || [];
  photoFiles.value = [];
}
function deleteReview(index) {
  const review = reviews.value[index];
  if (confirm("Bạn có chắc muốn xóa đánh giá này?")) {
    api
      .delete(`/client/rates/delete/${review.id}`)
      .then(() => {
        reviews.value.splice(index, 1);
        saveReviewsToLocalStorage();
        alert("Đánh giá đã được xóa.");
      })
      .catch((error) => {
        console.error("Lỗi khi xóa đánh giá:", error);
        alert("Không thể xóa đánh giá. Vui lòng thử lại sau.");
      });
  }
}
function formattedDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function resetForm() {
  rating.value = 0;
  formEvaluation.id_food = "";
  formEvaluation.detail = "";
  formEvaluation.id_customer = "1";
  photoFiles.value = [];
  photoPreviews.value = [];
  editingReview.value = null;
}
function saveReviewsToLocalStorage() {
  localStorage.setItem("restaurant_reviews", JSON.stringify(reviews.value));
}
function loadReviewsFromLocalStorage() {
  const saved = localStorage.getItem("restaurant_reviews");
  if (saved) {
    reviews.value = JSON.parse(saved);
  }
}
onMounted(() => {
  loadReviewsFromLocalStorage();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=Roboto:wght@400;500&display=swap");

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
  background: #f5f5f5;
  height: 100vh;
}

.app-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8e1d9 10%, #fff3e0 100%);
}

.app-container {
  display: flex;
  width: 100%;
  max-width: 1400px;
  height: 100vh;
  background: #fff;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  overflow: hidden;
}

.col-left {
  width: 40%;
  display: flex;
  flex-direction: column;
}

.col-right {
  width: 60%;
  background: url('/images/restaurant-bg.jpg') no-repeat center/cover;
  padding: 1.5rem;
}

header {
  background: #a82424;
  color: #fff;
  padding: 1.5rem;
  text-align: center;
}

.restaurant-branding {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.restaurant-logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

header h1 {
  font-family: "Playfair Display", serif;
  font-size: 2.2rem;
  margin: 0.5rem 0;
}

header p {
  font-size: 1rem;
  opacity: 0.9;
}

main {
  padding: 1.5rem;
  flex-grow: 1;
  overflow-y: auto;
}

.form-section h2 {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 500;
  color: #333;
}

.stars button {
  font-size: 1.8rem;
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
  transition: color 0.2s;
}

.stars button.active,
.stars button:hover,
.stars button:hover~button {
  color: #f4b400;
}

.custom-select {
  position: relative;
  cursor: pointer;
}

.selected-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
}

.dropdown-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  transition: background 0.2s;
}

.dropdown-item:hover {
  background: #f8f8f8;
}

.food-icon {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
}

input,
textarea {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #a82424;
  box-shadow: 0 0 4px rgba(168, 36, 36, 0.3);
}

textarea {
  resize: vertical;
}

.photo-previews {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.8rem;
}

.photo-preview {
  position: relative;
  width: 80px;
  height: 80px;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.remove-photo {
  position: absolute;
  top: 4px;
  right: 4px;
  background: #fff;
  border: none;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  color: #a82424;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.remove-photo:hover {
  background: #f8f8f8;
}

.submit-btn {
  background: #a82424;
  color: #fff;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.submit-btn:hover:not(:disabled) {
  background: #8b1e1e;
}

.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.reviews-section h2 {
  font-family: "Playfair Display", serif;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1rem;
}

.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.review-item {
  background: #fff;
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s;
}

.review-item:hover {
  transform: translateY(-4px);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.review-rating {
  color: #f4b400;
}

.star.filled {
  color: #f4b400;
}

.review-food {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.review-comment {
  color: #333;
  font-size: 0.95rem;
  margin-bottom: 0.5rem;
}

.review-photos {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.review-photo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.review-actions {
  display: flex;
  gap: 0.5rem;
}

.review-actions button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;
}

.review-actions button:first-child {
  background: #a82424;
  color: #fff;
}

.review-actions button:last-child {
  background: #555;
  color: #fff;
}

.review-actions button:hover {
  opacity: 0.9;
}

.no-reviews {
  text-align: center;
  color: #666;
  padding: 1rem;
  font-style: italic;
}

footer {
  background: #a82424;
  color: #fff;
  padding: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.map {
  background: #fff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.map h3 {
  font-family: "Playfair Display", serif;
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
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
    height: 400px;
    background: none;
  }

  .map iframe {
    height: 300px;
  }
}
</style>