<template>
  <div class="container-cartegoryaooetizer">
    <h1>Danh Sách Menu</h1>

    <div class="search-wrapper" style="text-align:center; margin-bottom: 1rem;">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Tìm kiếm món ăn... 🔎"
        class="search-input"
      />
    </div>

    <div class="categories">
      <button
        v-for="(category, index) in categories"
        :key="category.name"
        @click="selectCategory(index)"
        class="category-button"
        :class="{ active: selectedCategoryIndex === index }"
        type="button"
      >
        {{ category.name }}
      </button>
    </div>

    <div class="food-items" v-if="selectedCategory && filteredDishes.length > 0">
      <h2>{{ selectedCategory.name }}</h2>

      <div class="menu-grid">
        <div class="card-menu" v-for="(dish, dishIndex) in filteredDishes" :key="dishIndex">
          <div class="img-wrapper">
            <img :src="getImageUrl(dish.image)" alt="Ảnh món ăn" />
            <div class="hover-icons">
              <span class="icon eye" @click="handleShowRating(dish)" title="Xem chi tiết">
                <i class="fas fa-eye"></i>
              </span>
              <span class="icon cart" @click="(e) => handleAddToCart(dish, e)" title="Thêm vào giỏ">
                <i class="fas fa-shopping-cart"></i>
              </span>
            </div>
          </div>

          <div class="info-card">
            <div class="card-name" @click="handleShowRating(dish)">
              <strong>{{ dish.name }}</strong>
            </div>
            <div class="card-cost"><strong>{{ dish.cost }}</strong></div>
            <div class="card-title">{{ dish.detail }}</div>
            <div class="card-price">
              <span class="old-price" v-if="dish.oldPrice">{{ dish.oldPrice.toLocaleString() }}đ</span>
              <span class="new-price" v-if="dish.newPrice">{{ dish.newPrice.toLocaleString() }}đ</span>
            </div>

            <button class="btn-view-detail" @click="handleShowRating(dish)">Xem chi tiết</button>

            <div class="gio-hang-icon">
              <span class="so-luong" v-if="soLuong > 0">{{ soLuong }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="food-items" v-else>
      <p>Vui lòng chọn danh mục để xem món ăn hoặc không tìm thấy món ăn phù hợp.</p>
    </div>

    <!-- Component đánh giá món ăn -->
    <DishRating
      v-if="showRating"
      :dish="selectedDish"
      @close="showRating = false"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../../services/api'
import { cartItems, addToCart } from '../../stores/cartStore'
import DishRating from './DishRating.vue'

const categories = ref([])
const selectedCategoryIndex = ref(null)
const selectedDish = ref(null)
const showRating = ref(false)
const searchTerm = ref('')

const gioHangIcon = ref(null)

onMounted(async () => {
  gioHangIcon.value = document.querySelector('.gio-hang-icon')

  // Lấy danh mục trước để có tên category cho món
  const res = await api.get('/client/categories')
  categories.value = res.data

  try {
    const response = await api.get('/client/foods')
    const foods = response.data
    categories.value = categorizeFoods(foods)
  } catch (error) {
    console.error('Lỗi khi tải món ăn:', error)
  }
})

// Gom món ăn theo danh mục
function categorizeFoods(foods) {
  return categories.value.map(cat => ({
    name: cat.name,
    dsMon: foods.filter(food =>
      food.categories.some(c => c.name === cat.name)
    )
  }))
}

function selectCategory(index) {
  selectedCategoryIndex.value = index
}

const selectedCategory = computed(() => {
  return selectedCategoryIndex.value !== null
    ? categories.value[selectedCategoryIndex.value]
    : null
})

const filteredDishes = computed(() => {
  if (!selectedCategory.value) return []
  if (!searchTerm.value.trim()) return selectedCategory.value.dsMon
  const keyword = searchTerm.value.trim().toLowerCase()
  return selectedCategory.value.dsMon.filter(dish =>
    dish.name.toLowerCase().includes(keyword)
  )
})

const soLuong = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.soLuong, 0)
})

function getImageUrl(image) {
  if (!image) return ''
  if (image.startsWith('http')) return image
  return `http://localhost:8000/storage/foods/${image}`
}

function animateAddToCart(imageUrl, event) {
  if (!gioHangIcon.value) {
    console.warn('Chưa tìm thấy icon giỏ hàng')
    return
  }

  const img = document.createElement('img')
  img.src = imageUrl
  img.classList.add('fly-img') // ← THÊM DÒNG NÀY
  img.style.left = `${event.clientX}px`
  img.style.top = `${event.clientY}px`

  document.body.appendChild(img)

  const end = gioHangIcon.value.getBoundingClientRect()

  const animation = img.animate([
    { transform: 'translate(0, 0)', opacity: 1 },
    { transform: `translate(${end.left - event.clientX}px, ${end.top - event.clientY}px) scale(0.1)`, opacity: 0 }
  ], {
    duration: 600,
    easing: 'ease-in-out'
  })

  animation.onfinish = () => {
    img.remove()
  }
}


function handleAddToCart(dish, event) {
  addToCart(dish)
  animateAddToCart(getImageUrl(dish.image), event)
}

function handleShowRating(dish) {
  selectedDish.value = dish
  showRating.value = true
}
</script>

<style scoped>

.container-cartegoryaooetizer {
  background: white;
  width: 100%;
  padding: 1rem;
}

h1 {
  text-align: center;
  color: #4caf50;
  font-size: 50px;
  margin-bottom: 20px;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.category-button {
  background-color: #e0f2f1;
  border: 2px solid #4caf50;
  border-radius: 6px;
  padding: 0.6rem 1.2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.category-button:hover,
.category-button.active {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.food-items {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  min-height: 290px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.card-menu {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: auto;
  height: auto;
  transition: all 0.3s ease;
}

.img-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 8px;
}

.img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.hover-icons {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  display: flex;
  gap: 50px; /* giảm khoảng cách giữa 2 icon */
  justify-content: center; /* Đưa cả 2 icon về giữa và gần nhau */
  padding: 0 1rem;
  transform: translateY(-50%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.icon-view {
  transform: translateX(-100%);
  transition: transform 0.4s ease;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 0.5rem;
  font-size: 18px;
  color: #4caf50;
  cursor: pointer;
}

/* Icon bên phải (giỏ hàng) */
.icon-cart {
  transform: translateX(100%);
  transition: transform 0.4s ease;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 0.5rem;
  font-size: 18px;
  color: #4caf50;
  cursor: pointer;
}
.img-wrapper:hover .hover-icons {
  opacity: 1;
  pointer-events: auto;
}

/* Hover ảnh thì icon trượt vào */
.img-wrapper:hover .icon-view {
  transform: translateX(0);
}

.img-wrapper:hover .icon-cart {
  transform: translateX(0);
}

.hover-icons .icon {
background: white;
border-radius: 50%;
padding: 10px;
font-size: 18px;
cursor: pointer;
color: #4caf50;
transition: background 0.3s;
}

.hover-icons .icon:hover {
background: #4caf50;
color: white;
}

.card-name {
font-size: 18px;
margin-top: 10px;
cursor: pointer;
color: #333;
font-weight: bold;
}

.card-cost,
.card-title,
.card-price {
margin-top: 5px;
color: #666;
}

.card-price {
margin: 10px 0;
}

.old-price {
text-decoration: line-through;
color: #999;
margin-right: 8px;
}

.new-price {
color: #e53935;
font-weight: bold;
}

.btn-view-detail {
margin-top: 10px;
padding: 8px 16px;
background-color: #4caf50;
color: white;
border: none;
border-radius: 6px;
cursor: pointer;
transition: background-color 0.3s;
}

.btn-view-detail:hover {
background-color: #388e3c;
}

.gio-hang-icon {
position: fixed;
top: 20px;
right: 20px;
}

.so-luong {
background-color: red;
color: white;
padding: 2px 6px;
border-radius: 50%;
position: absolute;
top: -10px;
right: -10px;
}
/* Animation cho ảnh bay vào giỏ hàng */
.fly-img {
  position: fixed;
  width: 40px !important;
  height: 40px !important;
  border-radius: 50%;
  z-index: 10000;
  pointer-events: none;
  transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
}
.search-wrapper {
  text-align: center;
  margin-bottom: 1.5rem;
}

.search-input {
  width: 320px;
  max-width: 90vw;
  padding: 0.6rem 1.2rem 0.6rem 2.8rem; 
  font-size: 1.1rem;
  border: 2px solid #ccc;
  border-radius: 30px;
  outline: none;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  background-image: url("data:image/svg+xml,%3csvg fill='gray' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3e%3cpath d='M21 20l-5.6-5.6a7 7 0 1 0-1.4 1.4L20 21zM10 16a6 6 0 1 1 0-12 6 6 0 0 1 0 12z'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: 10px center;
  background-size: 18px 18px;
}

.search-input::placeholder {
  color: #999;
  font-style: italic;
}

.search-input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 8px rgba(76, 175, 80, 0.5);
}

</style>