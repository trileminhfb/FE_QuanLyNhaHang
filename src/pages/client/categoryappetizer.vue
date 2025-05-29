```vue
<template>
  <div class="container-cartegoryaooetizer">
    <h1>Danh Sách Menu</h1>
    <div class="search-wrapper">
      <input
        type="text"
        v-model="searchTerm"
        placeholder="Tìm kiếm món ăn... 🔎"
        class="search-input"
      />
    </div>

    <!-- Icon giỏ hàng cố định -->
    <!-- <div class="gio-hang-icon">
      <i class="fas fa-shopping-cart"></i>
      <span class="so-luong" v-if="soLuong > 0">{{ soLuong }}</span>
    </div> -->

    <div class="main-content">
      <!-- Cột trái: Lọc theo giá và sắp xếp -->
      <div class="col-left">
        <h3>Lọc theo giá</h3>
        <div class="price-filter">
          <button
            v-for="(range, index) in priceRanges"
            :key="index"
            @click="selectPriceRange(index)"
            class="price-button"
            :class="{ active: selectedPriceRangeIndex === index }"
          >
            {{ range.label }}
          </button>
        </div>

        <h3>Sắp xếp theo giá</h3>
        <div class="sort-filter">
          <select v-model="sortOrder" class="sort-select">
            <option value="asc">Tăng dần (A-Z)</option>
            <option value="desc">Giảm dần (Z-A)</option>
          </select>
        </div>
      </div>

      <!-- Cột phải: Danh mục và món ăn -->
      <div class="col-right">
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

        <div class="food-items">
          <h2>{{ selectedCategory ? selectedCategory.name : 'Tất cả món ăn' }}</h2>
          <div class="menu-grid">
            <div class="card-menu" v-for="(dish, dishIndex) in filteredDishes" :key="dishIndex">
              <img :src="getImageUrl(dish.image)" alt="Ảnh món ăn" class="dish-image" />
              <div class="info-card">
                <div class="card-name" @click="handleShowRating(dish)">
                  <strong>{{ dish.name }}</strong>
                </div>
                <div class="card-cost"><strong>{{ dish.cost.toLocaleString() }} VNĐ</strong></div>
                <div class="card-title">{{ dish.detail }}</div>
                <div class="card-price">
                  <span class="old-price" v-if="dish.oldPrice">{{ dish.oldPrice.toLocaleString() }}đ</span>
                  <span class="new-price" v-if="dish.newPrice">{{ dish.newPrice.toLocaleString() }}đ</span>
                </div>
                <div class="btn-wrapper">
                  <button class="btn-add" @click="(e) => handleAddToCart(dish, e)">
                    Thêm vào giỏ <i class="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import { ref, computed, onMounted } from 'vue';
import api from '../../services/api';
import { cartItems, addToCart } from '../../stores/cartStore';
import DishRating from './DishRating.vue';
import { useToast } from 'vue-toastification';

const toast = useToast();

const categories = ref([]);
const selectedCategoryIndex = ref(null);
const selectedDish = ref(null);
const showRating = ref(false);
const searchTerm = ref('');
const selectedPriceRangeIndex = ref(null);
const sortOrder = ref('asc');
const allDishes = ref([]);

// Định nghĩa các khoảng giá
const priceRanges = ref([
  { label: 'Tất cả', min: 0, max: Infinity },
  { label: 'Dưới 50k', min: 0, max: 50000 },
  { label: '50k - 100k', min: 50000, max: 100000 },
  { label: 'Trên 100k', min: 100000, max: Infinity },
]);

const gioHangIcon = ref(null);

onMounted(async () => {
  gioHangIcon.value = document.querySelector('.gio-hang-icon');

  try {
    // Lấy danh mục
    const res = await api.get('/client/categories');
    categories.value = res.data;

    // Lấy tất cả món ăn
    const response = await api.get('/client/foods');
    allDishes.value = response.data;
    categories.value = categorizeFoods(allDishes.value);
  } catch (error) {
    console.error('Lỗi khi tải dữ liệu:', error);
  }
});

// Gom món ăn theo danh mục
function categorizeFoods(foods) {
  return categories.value.map((cat) => ({
    name: cat.name,
    dsMon: foods.filter((food) => food.categories.some((c) => c.name === cat.name)),
  }));
}

function selectCategory(index) {
  selectedCategoryIndex.value = index;
}

function selectPriceRange(index) {
  selectedPriceRangeIndex.value = index;
}

const selectedCategory = computed(() => {
  return selectedCategoryIndex.value !== null ? categories.value[selectedCategoryIndex.value] : null;
});

const filteredDishes = computed(() => {
  let dishes = selectedCategory.value ? [...selectedCategory.value.dsMon] : [...allDishes.value];

  // Lọc theo từ khóa tìm kiếm
  if (searchTerm.value.trim()) {
    const keyword = searchTerm.value.trim().toLowerCase();
    dishes = dishes.filter((dish) => dish.name.toLowerCase().includes(keyword));
  }

  // Lọc theo khoảng giá
  if (selectedPriceRangeIndex.value !== null) {
    const { min, max } = priceRanges.value[selectedPriceRangeIndex.value];
    dishes = dishes.filter((dish) => {
      const price = dish.newPrice || dish.cost || 0;
      return price >= min && price <= max;
    });
  }

  // Sắp xếp theo giá
  dishes.sort((a, b) => {
    const priceA = a.newPrice || a.cost || 0;
    const priceB = b.newPrice || b.cost || 0;
    return sortOrder.value === 'asc' ? priceA - priceB : priceB - priceA;
  });

  return dishes;
});

const soLuong = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.soLuong, 0);
});

function getImageUrl(image) {
  if (!image) return '';
  if (image.startsWith('http')) return image;
  return `http://localhost:8000/storage/foods/${image}`;
}

function animateAddToCart(imageUrl, event) {
  if (!gioHangIcon.value) {
    console.warn('Chưa tìm thấy icon giỏ hàng');
    return;
  }

  const img = document.createElement('img');
  img.src = imageUrl;
  img.className = 'fly-img';
  img.style.position = 'fixed';
  img.style.width = '40px';
  img.style.height = '40px';
  img.style.borderRadius = '50%';
  img.style.zIndex = '10000';
  img.style.pointerEvents = 'none';

  // Lấy vị trí nút bấm
  const start = event.currentTarget.getBoundingClientRect();
  img.style.left = `${start.left}px`;
  img.style.top = `${start.top}px`;

  document.body.appendChild(img);

  // Lấy vị trí icon giỏ hàng
  const end = gioHangIcon.value.getBoundingClientRect();

  const deltaX = end.left - start.left;
  const deltaY = end.top - start.top;

  const animation = img.animate(
    [
      { transform: 'translate(0, 0)', opacity: 1 },
      { transform: `translate(${deltaX}px, ${deltaY}px) scale(0.1)`, opacity: 0.5 },
    ],
    {
      duration: 600,
      easing: 'ease-in-out',
    }
  );

  animation.onfinish = () => {
    img.remove();
  };
}

function handleAddToCart(dish, event) {
  toast.success('Đã thêm món ăn vào giỏ');
  addToCart(dish);
  animateAddToCart(getImageUrl(dish.image), event);
}

function handleShowRating(dish) {
  selectedDish.value = dish;
  showRating.value = true;
}
</script>

<style scoped>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container-cartegoryaooetizer {
  background: white;
  width: 100%;
  max-width: 100%;
  padding: 1rem;
  margin: 0 auto;
}

h1 {
  text-align: center;
  color: #4caf50;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.search-wrapper {
  text-align: center;
  margin-bottom: 1rem;
}

.search-input {
  padding: 0.5rem 1rem;
  width: 100%;
  max-width: 300px;
  border-radius: 6px;
  border: 1.5px solid #4caf50;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #388e3c;
}

.gio-hang-icon {
  position: fixed;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  z-index: 2000;
  color: #555;
  font-size: 1.5rem;
}

.gio-hang-icon .so-luong {
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  background: red;
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.8rem;
}

.main-content {
  display: flex;
  gap: 1rem;
  flex-direction: row;
}

.col-left {
  flex: 1;
  max-width: 250px;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.col-right {
  flex: 3;
}

.price-filter,
.sort-filter {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.price-button {
  background-color: #e0f2f1;
  border: 2px solid #4caf50;
  border-radius: 6px;
  padding: 0.6rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;
}

.price-button:hover,
.price-button.active {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.sort-select {
  padding: 0.6rem;
  border: 2px solid #4caf50;
  border-radius: 6px;
  font-size: 1rem;
  background-color: #e0f2f1;
  cursor: pointer;
  transition: border-color 0.3s;
}

.sort-select:focus {
  outline: none;
  border-color: #388e3c;
}

.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.category-button {
  background-color: #e0f2f1;
  border: 2px solid #4caf50;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
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
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.food-items h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.card-menu {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 1rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card-menu:hover {
  transform: translateY(-5px);
}

.card-menu img.dish-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.card-menu img.dish-image:hover {
  transform: scale(1.05);
}

.info-card {
  padding: 0.5rem;
}

.card-name {
  cursor: pointer;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  transition: color 0.2s ease;
}

.card-name:hover {
  color: #4caf50;
}

.card-cost {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.card-price {
  margin-top: 0.5rem;
}

.old-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 0.5rem;
  font-size: 0.9rem;
}

.new-price {
  color: red;
  font-weight: bold;
  font-size: 1rem;
}

.btn-wrapper {
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}

.btn-add {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background: #4caf50;
  color: white;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.btn-add:hover {
  background: #388e3c;
}

.fly-img {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  z-index: 10000;
  pointer-events: none;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }

  .col-left {
    max-width: 100%;
    margin-bottom: 1rem;
  }

  .col-right {
    width: 100%;
  }

  .menu-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .card-menu img.dish-image {
    height: 140px;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  .search-input {
    max-width: 250px;
  }

  .gio-hang-icon {
    font-size: 1.2rem;
  }

  .gio-hang-icon .so-luong {
    font-size: 0.7rem;
    padding: 0.15rem 0.4rem;
  }

  .price-button,
  .sort-select,
  .category-button {
    font-size: 0.85rem;
    padding: 0.5rem;
  }

  .food-items h2 {
    font-size: 1.3rem;
  }

  .card-menu {
    padding: 0.75rem;
  }

  .card-menu img.dish-image {
    height: 120px;
  }

  .card-name {
    font-size: 1rem;
  }

  .card-cost,
  .card-title {
    font-size: 0.85rem;
  }

  .old-price,
  .new-price {
    font-size: 0.85rem;
  }

  .btn-add {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
}

@media (max-width: 480px) {
  .container-cartegoryaooetizer {
    padding: 0.5rem;
  }

  h1 {
    font-size: 1.5rem;
  }

  .search-input {
    max-width: 200px;
    font-size: 0.9rem;
  }

  .gio-hang-icon {
    top: 0.5rem;
    right: 0.5rem;
    font-size: 1rem;
  }

  .gio-hang-icon .so-luong {
    font-size: 0.6rem;
    padding: 0.1rem 0.3rem;
  }

  .col-left {
    padding: 0.75rem;
  }

  .price-button,
  .sort-select,
  .category-button {
    font-size: 0.8rem;
    padding: 0.4rem;
  }

  .food-items {
    padding: 0.75rem;
  }

  .food-items h2 {
    font-size: 1.1rem;
  }

  .menu-grid {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  }

  .card-menu {
    padding: 0.5rem;
  }

  .card-menu img.dish-image {
    height: 100px;
  }

  .card-name {
    font-size: 0.9rem;
  }

  .card-cost,
  .card-title {
    font-size: 0.8rem;
  }

  .old-price,
  .new-price {
    font-size: 0.8rem;
  }

  .btn-add {
    font-size: 0.75rem;
    padding: 0.3rem 0.6rem;
  }
}
</style>
```