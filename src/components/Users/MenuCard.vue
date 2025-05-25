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
              <div class="food-name font-bold text-lg">{{ category.name }}</div>
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
    const response = await axios.get('http://127.0.0.1:8000/api/client/sales')
    allItems.value = response.data.data || []
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu khuyến mãi:', error)
  }
}

const fetchFoodBestSeller = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/client/foods?status=1&bestSeller=1')
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
    const response = await axios.get('http://127.0.0.1:8000/api/client/rates')
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
    const response = await axios.get('http://127.0.0.1:8000/api/client/categories')
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
  addToCart(mon)
  soLuonggiohang.value++
  router.push('/shoppingCart')
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

<style>
/* Custom class to hide scrollbar across browsers for promo section */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  /* IE and Edge */
  scrollbar-width: none;
  /* Firefox */
}

/* Style the scrollbar for tab-links */
.tab-links::-webkit-scrollbar {
  height: 8px;
}

.tab-links::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.tab-links::-webkit-scrollbar-thumb {
  background: #ff6f61;
  border-radius: 4px;
}

.tab-links::-webkit-scrollbar-thumb:hover {
  background: #e65b50;
}

/* Style the scrollbar for menu-grid-wrapper */
.menu-grid-wrapper::-webkit-scrollbar {
  height: 8px;
}

.menu-grid-wrapper::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.menu-grid-wrapper::-webkit-scrollbar-thumb {
  background: #ff6f61;
  border-radius: 4px;
}

.menu-grid-wrapper::-webkit-scrollbar-thumb:hover {
  background: #e65b50;
}
</style>
