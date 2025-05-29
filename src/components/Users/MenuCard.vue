<template>
  <div class="container mx-auto px-4">
    <!-- Phần Banner Lớn (Hero Section) -->
    <div
      class="relative bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center h-[350px] flex items-center justify-center text-white text-center">
      <div>
        <h1 class="text-4xl md:text-5xl font-bold text-shadow-lg mb-4">Khám Phá Hương Vị Ẩm Thực Đỉnh Cao</h1>
        <router-link :to="{ name: 'users-booking' }">
          <button class="bg-red-500 text-white px-6 py-3 text-lg rounded-md shadow-md hover:bg-red-600 transition">Đặt
            Bàn Ngay</button>
        </router-link>
      </div>
    </div>

    <!-- Phần Ưu Đãi / Khuyến Mãi -->
    <div class="my-10 p-6 bg-orange-50 rounded-xl shadow-md relative">
      <h2 class="text-center text-2xl md:text-3xl font-bold text-red-500 mb-6">Ưu Đãi Đặc Biệt Trong Tháng</h2>
      <div class="promo-container flex overflow-x-auto scroll-smooth gap-6 pb-4 snap-x no-scrollbar justify-center"
        ref="promoContainer">
        <div v-for="(sale, index) in filteredSales" :key="sale.id || index"
          class="promo-item bg-white p-6 rounded-xl shadow-sm min-w-[280px] text-center snap-center">
          <h3 class="text-red-500 text-lg font-semibold mb-2">{{ sale.nameSale }} - Giảm {{ sale.percent }}%</h3>
          <p class="text-gray-600">Áp dụng từ {{ formatDate(sale.startTime) }} đến {{ formatDate(sale.endTime) }}.</p>
        </div>
        <div v-if="!filteredSales.length" class="no-promo w-full text-center">
          <p class="text-gray-600">Không có ưu đãi nào hiện tại.</p>
        </div>
      </div>
      <!-- Navigation Buttons -->
      <button v-if="showNavButtons"
        class="nav-button absolute top-1/2 -translate-y-1/2 left-2 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-red-600 transition"
        @click="scrollLeft">
        <i class="fa fa-chevron-left"></i>
      </button>
      <button v-if="showNavButtons"
        class="nav-button absolute top-1/2 -translate-y-1/2 right-2 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:bg-red-600 transition"
        @click="scrollRight">
        <i class="fa fa-chevron-right"></i>
      </button>
    </div>

    <!-- Phần Thể loại nổi bật -->
    <div class="title text-center my-8">
      <p class="font-bold text-xl md:text-2xl">
        <i class="fa-solid fa-utensils mr-2"></i> Thể loại nổi bật
        <i class="fa-solid fa-utensils ml-2"></i>
      </p>
    </div>
    <div class="container-fluid">
      <Swiper v-if="danhSachDanhMucNoiBat.length >= 3" class="food-grid" :modules="[Pagination, Autoplay]"
        :slides-per-view="3" :space-between="30" :pagination="{ clickable: true }" :loop="true"
        :autoplay="{ delay: 2000, disableOnInteraction: false }">
        <SwiperSlide v-for="(category, index) in danhSachDanhMucNoiBat" :key="'category-' + index">
          <div class="food-card bg-white rounded-lg shadow-md p-4 text-center">
            <div class="info-food">
              <router-link 
              :to="{name: 'users-category'}">
              <div class="food-name font-bold text-lg">{{ category.name }}</div>

            </router-link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div v-else class="text-center py-16">
        <p class="text-gray-600">Không có thể loại nổi bật nào hiện tại.</p>
      </div>
    </div>

    <!-- Phần Danh Sách Menu Nổi Bật -->
    <div class="title text-center my-8">
      <p class="font-bold text-xl md:text-2xl">
        <i class="fa-solid fa-utensils mr-2"></i> Danh Sách Menu Nổi Bật
        <i class="fa-solid fa-utensils ml-2"></i>
      </p>
    </div>
    <div class="tab-wrapper">
      <ul class="tab-links flex overflow-x-auto flex-nowrap gap-4 mb-6 px-4 snap-x">
        <li v-for="(tab, index) in tabs" :key="index"
          :class="['tab-link cursor-pointer px-4 py-2 rounded-md min-w-fit', { 'bg-gradient-to-r from-red-500 to-red-700 text-white': currentTab === index, 'bg-gray-200 text-gray-800 hover:bg-gray-300': currentTab !== index }]"
          @click="currentTab = index">
          {{ tab.ten }}
        </li>
      </ul>
      <div class="tab-contents">
        <div v-for="(tab, index) in tabs" :key="'content-' + index" v-show="currentTab === index" class="tab-content">
          <p class="text-gray-600 mb-4">{{ tab.noiDung }}</p>
          <div class="menu-grid-wrapper max-h-[900px] mx-auto overflow-y-auto snap-x">
            <div class="menu-grid grid grid-cols-3 gap-6" v-if="tab.dsMon && tab.dsMon.length">
              <div class="card-menu bg-white rounded-lg shadow-md overflow-hidden" v-for="(mon, monIndex) in tab.dsMon"
                :key="monIndex">
                <img :src="mon.hinh" alt="" class="w-full h-40 object-cover" />
                <div class="info-card p-4">
                  <div class="card-name font-bold text-lg">{{ mon.ten }}</div>
                  <div class="card-price text-red-500 font-semibold">{{ mon.cost.toLocaleString() }} đ</div>
                  <div class="card-title text-gray-600 text-sm">{{ mon.moTa }}</div>
                  <div class="btn-wrapper flex items-center justify-center mt-4">
                    <button class="btn-add bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                      @click="handleAddToCart(mon)">
                      Thêm vào giỏ <i class="fas fa-shopping-cart ml-2"></i>
                    </button>
                    <div class="gio-hang-icon relative">
                      <span
                        class="so-luong absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                        v-if="soLuong > 0">{{ soLuong }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8">
              <p class="text-gray-600">Không có món ăn nào trong danh mục này.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Phần Món ăn nổi bật -->
    <div class="title text-center my-8">
      <p class="font-bold text-xl md:text-2xl">
        <i class="fa-solid fa-utensils mr-2"></i> Món ăn nổi bật
        <i class="fa-solid fa-utensils ml-2"></i>
      </p>
    </div>
    <div v-if="bestSellerFoods.length === 0" class="text-center py-16">
      <p class="text-gray-600">Không có món ăn nổi bật nào hiện tại.</p>
    </div>
    <div v-else class="menu-list flex gap-2 pb-4 snap-x">
      <div v-for="(item, index) in bestSellerFoods.slice(0, soMonHienTai)" :key="index"
        class="menu-card w-56 bg-white rounded-lg shadow-md p-2 snap-center">
        <router-link to="" class="menu-card-link flex flex-col h-full">
          <div class="overflow-hidden rounded-lg">
            <!-- Sửa width và height của hình ảnh -->
            <img :src="item.image || 'https://via.placeholder.com/150'" :alt="item.name" class=" h-32 object-cover" />
          </div>
          <h1 class="menu-title font-bold text-lg text-center">{{ item.name }}</h1>
          <p class="menu-detail text-gray-600 text-sm text-center px-2">{{ item.detail }}</p>
          <p class="menu-price font-semibold text-center text-red-500">{{ item.cost.toLocaleString() }} đ</p>
        </router-link>
      </div>
    </div>
    <div class="view-more text-center mt-6">
      <button v-if="bestSellerFoods.length > 3" @click="xemThemMon"
        class="xemthem-btn bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition">
        {{ daXemThem ? 'Ẩn bớt' : 'Xem thêm' }}
      </button>
    </div>

    <!-- Phần Top Bảng Xếp Hạng Đánh Giá Trong Tuần -->
    <div class="title text-center my-8">
      <p class="font-bold text-xl md:text-2xl">
        <i class="fa-solid fa-star mr-2"></i> Top Bảng Xếp Hạng Đánh Giá Trong Tuần
        <i class="fa-solid fa-star ml-2"></i>
      </p>
    </div>
    <Swiper v-if="danhSachDanhGia.length >= 3" class="review-section" :modules="[Autoplay]" :slides-per-view="3"
      :space-between="30" :autoplay="{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }" :loop="true"
      :speed="3000">
      <SwiperSlide v-for="(review, index) in danhSachDanhGia" :key="'review-' + index">
        <div class="review-card bg-white rounded-lg shadow-md p-4 flex flex-row">
          <div class="review-content">
            <h3 class="text-lg font-semibold">{{ review.ten }}</h3>
            <div class="sao-danh-gia flex my-2">
              <span v-for="i in 5" :key="i">
                <i class="fa text-yellow-400" :class="i <= review.soSao ? 'fa-star' : 'fa-star-o'"></i>
              </span>
            </div>
            <p class="text-gray-600">{{ review.noiDung }}</p>
          </div>
          <div class="overflow-hidden border h-full rounded-full">
            <img :src="review.hinh" alt="Ảnh người dùng" class="w-full h-full object-cover" />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
    <div v-else class="text-center py-16">
      <p class="text-gray-600">Không có đánh giá nào hiện tại.</p>
    </div>
  </div>
</template>

<script setup>
import Aos from 'aos'
import { onMounted, ref, computed } from 'vue'
import { addToCart } from '../../stores/cartStore'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'
import { Pagination, Autoplay } from 'swiper/modules'
import 'aos/dist/aos.css'
import 'swiper/css'
import 'swiper/css/pagination'
import '../../assets/css/MenuCard.css'
import { useToast } from 'vue-toastification'
const toast =useToast();
const allItems = ref([]) // For sales
const categories = ref([]) // For categories
const bestSellerFoods = ref([])
const danhSachDanhMucNoiBat = ref([]) // For featured categories
const danhSachDanhGia = ref([]) // For reviews
const tabs = ref([]) // For menu tabs
const promoContainer = ref(null) // Reference to the promo container
const router = useRouter()
const route = useRoute()
const soSao = ref(4)
const currentTab = ref(0)
const soLuonggiohang = ref(0)
const soMonHienTai = ref(3)
const daXemThem = ref(false)
const soLuong = ref(0) // Cart quantity

onMounted(async () => {
  try {
    await Promise.all([
      fetchSale(),
      fetchFoodBestSeller(),
      fetchCategory(),
      fetchReviews(),
    ])
    Aos.init()
  } catch (error) {
    console.error('Error during onMounted:', error)
  }
})

const fetchSale = async () => {
  try {
    const response = await axios.get('http://192.168.1.53:8888/api/client/sales')
    allItems.value = response.data.data || []
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu khuyến mãi:', error)
  }
}

const fetchFoodBestSeller = async () => {
  try {
    const response = await axios.get('http://192.168.1.53:8888/api/client/foods?status=1&bestSeller=1')
    console.log('Best seller foods response:', response.data)
    bestSellerFoods.value = response.data || []
    console.log('abc', bestSellerFoods.value);

  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu món ăn nổi bật:', error)
    bestSellerFoods.value = []
  }
}

const fetchReviews = async () => {
  try {
    const response = await axios.get('http://192.168.1.53:8888/api/client/rates')
    danhSachDanhGia.value = response.data.data.map(review => ({
      ten: review.customer.FullName,
      soSao: review.star,
      noiDung: review.detail,
      hinh: review.customer.image || 'https://via.placeholder.com/150',
      thoiGian: review.time
    }))
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu đánh giá:', error)
    danhSachDanhGia.value = []
  }
}

const fetchCategory = async () => {
  try {
    const response = await axios.get('http://192.168.1.53:8888/api/client/categories')
    categories.value = response.data || []
    danhSachDanhMucNoiBat.value = response.data || []
    // Initialize tabs with category data and their foods
    tabs.value = categories.value.map(category => ({
      id: category.id,
      ten: category.name,
      dsMon: (category.category_foods || [])
        .filter(categoryFood => categoryFood.food && categoryFood.food.status === 1)
        .map(categoryFood => ({
          id: categoryFood.food.id,
          ten: categoryFood.food.name,
          hinh: categoryFood.food.image || 'https://via.placeholder.com/150',
          cost: categoryFood.food.cost || 0,
          moTa: categoryFood.food.detail || 'Món ăn ngon, hấp dẫn.'
        }))
    }))
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu thể loại:', error)
    categories.value = []
    danhSachDanhMucNoiBat.value = []
    tabs.value = []
  }
}

const filteredSales = computed(() => {
  const currentDate = new Date()
  return allItems.value
    .filter(sale => {
      const start = new Date(sale.startTime)
      const end = new Date(sale.endTime)
      return start <= currentDate && end >= currentDate
    })
    .slice(0, 6)
})

const showNavButtons = computed(() => {
  return filteredSales.value.length > 3
})

const scrollLeft = () => {
  if (promoContainer.value) {
    promoContainer.value.scrollLeft -= 310
  }
}

const scrollRight = () => {
  if (promoContainer.value) {
    promoContainer.value.scrollLeft += 310
  }
}

function handleAddToCart(mon) {
  try {
    addToCart(mon)
    soLuonggiohang.value++
    toast.success('Đã thêm vào giỏ')
  } catch (error) {
    toastError('Không thể thêm vào giỏ hàng!')
    console.error(error)
  }
}


const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function datMon() {
  soLuonggiohang.value++
}

const xemThemMon = () => {
  if (!daXemThem.value) {
    soMonHienTai.value = bestSellerFoods.value.length
    daXemThem.value = true
  } else {
    soMonHienTai.value = 3
    daXemThem.value = false
  }
}
</script>

<style scoped>
/* Custom class to hide scrollbar across browsers for promo section */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Style the scrollbar for tab-links */
.tab-links::-webkit-scrollbar {
  height: 6px; /* Giảm chiều cao thanh cuộn cho thanh lịch */
}

.tab-links::-webkit-scrollbar-track {
  background: #f5f5f5; /* Màu nền nhẹ, phù hợp cả dark/light theme */
  border-radius: 6px; /* Bo tròn nhẹ */
  margin: 4px; /* Khoảng cách hai bên */
}

.tab-links::-webkit-scrollbar-thumb {
  background: #ff4500; /* Màu đỏ chủ đạo của theme */
  border-radius: 6px;
}

.tab-links::-webkit-scrollbar-thumb:hover {
  background: #e03e00; /* Hiệu ứng hover đậm hơn */
}

/* Style the scrollbar for menu-grid-wrapper */
.menu-grid-wrapper::-webkit-scrollbar {
  width: 8px; /* Thanh cuộn dọc mảnh hơn */
}

.menu-grid-wrapper::-webkit-scrollbar-track {
  background: #f5f5f5;
  border-radius: 4px;
}

.menu-grid-wrapper::-webkit-scrollbar-thumb {
  background: #ff4500;
  border-radius: 4px;
}

.menu-grid-wrapper::-webkit-scrollbar-thumb:hover {
  background: #e03e00;
}

/* Title section */
.title {
  margin-top: 30px;
  margin-bottom: 20px;
}

.title p {
  font-family: "Dancing Script", cursive;
  font-size: 1.75rem; /* Tăng nhẹ kích thước chữ */
  color: #333; /* Màu tối hơn cho dễ đọc */
}

/* Swiper pagination */
.swiper-pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

.swiper-pagination-bullet {
  width: 10px;
  height: 10px;
  background: #666; /* Màu xám nhẹ cho trạng thái không active */
  opacity: 0.7;
  border-radius: 50%; /* Hình tròn thay vì vuông */
  transition: background 0.3s, transform 0.3s;
}

.swiper-pagination-bullet-active {
  background: #ff4500;
  opacity: 1;
  transform: scale(1.2); /* Phóng to nhẹ khi active */
}

/* Container */
.container,
.container-fluid {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
}

/* Food card */
.card-food {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.name-food {
  white-space: nowrap;
  font-weight: 600;
  color: #333;
}

.list-food {
  display: flex;
  gap: 30px; /* Giảm gap để responsive tốt hơn */
  flex-wrap: wrap;
  justify-content: center;
}

.food-item {
  border: 1px solid #ddd; /* Viền nhẹ hơn */
  width: 280px; /* Giảm kích thước để phù hợp mobile */
  height: 320px;
  text-align: center;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.food-item:hover {
  transform: translateY(-5px); /* Hiệu ứng nâng nhẹ khi hover */
}

.food-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.food-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.4));
  z-index: 1;
}

.detail {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  font-size: 1.25rem;
  padding: 12px;
  opacity: 0;
  transform: translateY(20px);
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  z-index: 2;
}

.food-item:hover .detail {
  opacity: 1;
  transform: translateY(0);
}

.food-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.25rem;
  max-width: 90%;
  padding: 0 10px;
  word-wrap: break-word;
  z-index: 2;
}

.food-info p {
  margin: 0;
  font-weight: 500;
}

/* Food grid */
.food-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 30px;
  margin-top: 20px;
  gap: 20px; /* Thêm khoảng cách giữa các card */
}

.food-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px; /* Giảm nhẹ kích thước */
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s, box-shadow 0.3s;
  background: #fff;
}

.food-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.food-card img {
  height: 180px; /* Giảm chiều cao ảnh để cân đối */
  width: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Tab wrapper */
.tab-wrapper {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 10px;
}

.tab-links {
  display: flex;
  list-style: none;
  justify-content: center; /* Căn giữa các tab */
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  overflow-x: auto;
  gap: 10px;
}

.tab-link {
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 600;
  border: none;
  background-color: transparent;
  transition: color 0.3s, border-bottom 0.3s;
  color: #333;
  white-space: nowrap;
}

.tab-link.current {
  color: #ff4500;
  border-bottom: 3px solid #ff4500;
}

.tab-content {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  background: #fafafa; /* Nền nhạt hơn */
}

/* Menu list */
.menu-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px 0;
}

/* Menu grid */
.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Responsive grid */
  gap: 20px;
  padding: 10px;
}

.card-menu {
  border: 1px solid #f0f0f0;
  width: 260px;
  padding: 12px;
  margin: 10px auto;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card-menu:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card-menu img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
}

.info-card {
  text-align: center;
  padding: 10px 0;
}

/* Menu card */
.menu-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s;
}

.menu-card:hover {
  transform: translateY(-5px);
}

.menu-card img {
  width: 100%;
  height: 160px; /* Giảm chiều cao để cân đối */
  object-fit: cover;
}

.menu-info {
  padding: 12px;
  text-align: center;
  word-wrap: break-word;
}

/* View more button */
.xemthem-btn {
  padding: 10px 24px;
  font-weight: 600;
  background-color: #ff4500;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s;
}

.xemthem-btn:hover {
  background-color: #e03e00;
}

/* Review section */
.review-section {
  width: 100%;
  padding: 20px 10px;
}

.review-card {
  background: #fafafa;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 140px; /* Tăng nhẹ chiều cao */
}

.review-content {
  flex: 0 0 65%;
  padding-right: 10px;
}

.review-image {
  flex: 0 0 35%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.review-image img {
  width: 80px; /* Kích thước ảnh tròn nhỏ hơn */
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

h3 {
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 1.1rem;
  color: #333;
}

p {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}

/* Buttons */
.btn-oder,
.btn-add {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.3s;
}

.btn-oder {
  background-color: #ff5a5f;
  color: white;
}

.btn-add {
  background-color: #00b894; /* Màu xanh lá tương phản */
  color: white;
}

.btn-oder:hover,
.btn-add:hover {
  filter: brightness(90%);
}

.btn-wrapper {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .container,
  .container-fluid {
    padding: 0 10px;
  }

  .food-item {
    width: 100%;
    max-width: 300px;
    height: 280px;
  }

  .food-card {
    width: 100%;
    max-width: 280px;
  }

  .card-menu {
    width: 100%;
    max-width: 240px;
  }

  .menu-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }

  .tab-links {
    justify-content: flex-start;
  }

  .tab-link {
    padding: 8px 12px;
    font-size: 0.9rem;
  }

  .review-card {
    flex-direction: column;
    height: auto;
    padding: 10px;
  }

  .review-content {
    flex: 1;
    padding-right: 0;
    text-align: center;
  }

  .review-image {
    margin-top: 10px;
  }
}

@media (max-width: 480px) {
  .title p {
    font-size: 1.5rem;
  }

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
  }

  .food-card img,
  .card-menu img {
    height: 140px;
  }

  .menu-card img {
    height: 120px;
  }

  .xemthem-btn {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>