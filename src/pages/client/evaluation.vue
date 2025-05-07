<template>
  <div class="app-wrapper">
    <div class="app-container">
      <header>
        <h1>Restaurant Reviews</h1>
        <p>Share your experience by submitting a review with photos!</p>
      </header>
      <main>
        <section class="form-section">
          <form @submit.prevent="submitReview" class="review-form" novalidate>
            <div class="form-group rating-group">
              <label>Rating:</label>
              <div class="stars">
                <button v-for="star in 5" :key="star" type="button" :class="{ active: rating >= star }"
                  @click="rating = star" aria-label="Select star rating">
                  ★
                </button>
              </div>
            </div>

            <div class="form-group">
              <label for="id_food">Food ID</label>
              <input id="id_food" v-model="formEvaluation.id_food" placeholder="Enter food ID..." required />
            </div>

            <div class="form-group">
              <label for="detail">Comment</label>
              <textarea id="detail" v-model="formEvaluation.detail" placeholder="Write your review here..." required
                rows="4"></textarea>
            </div>

            <div class="form-group">
              <label for="photos">Upload Photos</label>
              <input type="file" id="photos" multiple accept="image/*" @change="handleFileChange" />
              <div class="photo-previews" v-if="photoPreviews.length">
                <div v-for="(photo, index) in photoPreviews" :key="index" class="photo-preview">
                  <img :src="photo" alt="Photo preview" />
                  <button type="button" class="remove-photo" @click="removePhoto(index)" aria-label="Remove photo">
                    ×
                  </button>
                </div>
              </div>
            </div>

            <button type="submit" :disabled="!canSubmit" class="submit-btn">
              {{ isEditing ? 'Update Review' : 'Submit Review' }}
            </button>
          </form>
        </section>

        <section v-if="reviews.length" class="reviews-section">
          <h2>Previous Reviews</h2>
          <ul class="reviews-list">
            <li v-for="(review, index) in reviews" :key="review.id" class="review-item">
              <div class="review-header">
                <div class="review-rating">
                  <span v-for="n in 5" :key="n" class="star" :class="{ filled: n <= review.rating }">
                    ★
                  </span>
                </div>
                <time :datetime="review.date">
                  {{ formattedDate(review.date) }}
                </time>
              </div>
              <p class="review-comment">{{ review.detail }}</p>
              <div class="review-photos" v-if="review.photos.length">
                <img v-for="(photo, i) in review.photos" :key="i" :src="photo" alt="Review photo"
                  class="review-photo" />
              </div>
              <div class="review-actions">
                <button @click="editReview(review)">Edit</button>
                <button @click="deleteReview(index)">Delete</button>
              </div>
            </li>
          </ul>
        </section>

        <section v-else class="no-reviews">
          <p>Chưa có đánh giá nào</p>
        </section>
      </main>
      <footer>
        <small>© 2025 Restaurant Reviews</small>
      </footer>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import api from "../../services/api";
export default {
  data() {
    return {
      rating: 0,
      photoFiles: [],
      photoPreviews: [],
      reviews: [],
      editingReview: null,  // Đánh giá đang chỉnh sửa
    };
  },
  setup() {
    const formEvaluation = reactive({
      id_food: "",
      star: "",
      detail: "",
    });

    return { formEvaluation };
  },
  computed: {
    canSubmit() {
      return this.rating > 0 && this.formEvaluation.detail.trim().length > 0;
    },
    isEditing() {
      return this.editingReview !== null;
    },
  },
  methods: {
    handleFileChange(event) {
      const files = Array.from(event.target.files);
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        this.photoFiles.push(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          this.photoPreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      event.target.value = null;
    },
    removePhoto(index) {
      this.photoFiles.splice(index, 1);
      this.photoPreviews.splice(index, 1);
    },
    submitReview() {
      if (!this.canSubmit) return;

      const formData = new FormData();
      formData.append("id_food", this.formEvaluation.id_food);
      formData.append("star", this.rating);
      formData.append("detail", this.formEvaluation.detail);

      this.photoFiles.forEach((file) => {
        formData.append("photos[]", file);
      });

      if (this.isEditing) {
        // Cập nhật đánh giá
        api
          .post(`/client/rates/${this.editingReview.id}?_method=PUT`, formData)
          .then((response) => {
            const updatedReview = {
              id: this.editingReview.id,
              rating: this.rating,
              detail: this.formEvaluation.detail,
              photos: this.photoPreviews,
              date: new Date().toISOString(),
            };

            // Cập nhật danh sách đánh giá
            const index = this.reviews.findIndex((r) => r.id === this.editingReview.id);
            this.reviews.splice(index, 1, updatedReview);

            this.resetForm();
          })
          .catch((error) => {
            console.error("Lỗi khi cập nhật đánh giá:", error);
          });
      } else {
        // Gửi đánh giá mới
        api
          .post("/client/rates", formData)
          .then((response) => {
            const newReview = {
              id: response.data.data.id,
              rating: this.rating,
              detail: this.formEvaluation.detail,
              photos: this.photoPreviews,
              date: new Date().toISOString(),
            };
            this.reviews.unshift(newReview);
          })
          .catch((error) => {
            console.error("Lỗi khi gửi đánh giá:", error);
          });
      }
    },
    editReview(review) {
      this.editingReview = review;
      // console.log("this.editingReview", this.editingReview);

      this.formEvaluation.id_food = review.id_food;
      this.formEvaluation.detail = review.detail;
      this.rating = review.rating;
      this.photoPreviews = review.photos || [];
    },
    deleteReview(index) {
      const review = this.reviews[index];
      if (confirm("Bạn có chắc muốn xóa đánh giá này?")) {
        api
          .delete(`/client/rates/${review.id}`)
          .then(() => {
            this.reviews.splice(index, 1);
            alert("Đánh giá đã được xóa.");
          })
          .catch((error) => {
            console.error("Lỗi khi xóa đánh giá:", error);
            alert("Không thể xóa đánh giá. Vui lòng thử lại sau.");
          });
      }
    },
    formattedDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    resetForm() {
      this.rating = 0;
      this.formEvaluation.id_food = "";
      this.formEvaluation.detail = "";
      this.photoFiles = [];
      this.photoPreviews = [];
      this.editingReview = null;
    },
  },
};
</script>


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap");

* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: "Montserrat", sans-serif;
  background: linear-gradient(135deg, #72edf2 10%, #5151e5 100%);
  height: 100vh;
}

.app-wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background: white;
}

.app-container {
  background: white;
  width: 100%;
  max-width: 600px;
  height: 90vh;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

header {
  background: #5151e5;
  color: white;
  padding: 1.2rem 1.5rem;
  text-align: center;
}

main {
  padding: 1rem 1.5rem;
  overflow-y: auto;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

footer {
  background: #5151e5;
  color: white;
  padding: 0.6rem 1rem;
  font-size: 0.85rem;
  text-align: center;
}

.review-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.stars {
  display: flex;
  gap: 0.3rem;
}

.stars button {
  font-size: 2rem;
  background: none;
  border: none;
  color: #ccc;
  cursor: pointer;
}

.stars button.active,
.stars button:hover,
.stars button:hover~button {
  color: #ffb400;
}

textarea {
  resize: vertical;
  padding: 0.5rem;
  border-radius: 6px;
  border: 1px solid #ccc;
}

textarea:focus {
  outline: none;
  border-color: #5151e5;
  box-shadow: 0 0 4px rgba(81, 81, 229, 0.5);
}

.photo-previews {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.6rem;
}

.photo-preview {
  width: 60px;
  height: 60px;
  position: relative;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.remove-photo {
  position: absolute;
  top: 2px;
  right: 2px;
  background: white;
  border: none;
  border-radius: 50%;
  font-weight: bold;
  cursor: pointer;
  color: red;
  width: 20px;
  height: 20px;
}

.submit-btn {
  background: #5151e5;
  color: white;
  padding: 0.7rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.submit-btn:disabled {
  background: #999;
  cursor: not-allowed;
}

.reviews-section {
  flex-grow: 1;
}

.review-item {
  background: #f0f0ff;
  border-radius: 10px;
  padding: 1rem;
}

.review-rating {
  color: #ffb400;
}

.star.filled {
  color: #ffb400;
}

.review-photo {
  width: 70px;
  height: 70px;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 0.5rem;
}

.no-reviews {
  text-align: center;
  color: #555;
  padding: 1rem;
  font-style: italic;
}

.review-actions {
  margin-top: 0.5rem;
  display: flex;
  gap: 0.5rem;
}

.review-actions button {
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background: #5151e5;
  color: white;
  font-size: 0.85rem;
}

.review-actions button:hover {
  background: #3c3cce;
}
</style>
