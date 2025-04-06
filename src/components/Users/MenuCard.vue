<template>
  <div class="container">
    <div class="title">
            <p>
                <strong>
                    <i class="fa-solid fa-utensils"></i>Thực Đơn Của Chúng Tôi <i class="fa-solid fa-utensils"></i>

                </strong>
            </p>
        </div>
    <div class="card-food">
      <ul class="list-food">
        <li v-for="(item, index) in danhSachDanhMuc" :key="index">
          <a href="">
            <div class="food-item">
              <img :src="item.hinh" :alt="item.ten" />
              <div class="food-info">
                <div class="name-food"><strong>{{ item.ten }}</strong></div>
                <p class="detail">Bảng giá chi tiết cho từng món</p>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <div class="title">
      <p>
        <strong>
          <i class="fa-solid fa-utensils"></i>  Danh Mục Nổi Bật
          <i class="fa-solid fa-utensils"></i>
        </strong>
      </p>
    </div>
    <div class="container-fluid">
  <Swiper
    class="food-grid"
    :modules="[Pagination, Autoplay]"
    :slides-per-view="3"
    :space-between="30"
    :pagination="{ clickable: true }"
    :loop="true"
    :autoplay="{ delay: 2000, disableOnInteraction: false }"
  >
    <SwiperSlide
      v-for="(mon, index) in danhSachMonAn"
      :key="'mon-' + index"
    >
      <div class="food-card">
        <img :src="mon.hinh"  />
        <div class="info-food">
          <div class="food-name"><strong>{{ mon.ten }}</strong></div>
          <div class="food-title">{{ mon.noidung }}</div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>
</div>
<!-- // Phần Thực đơn -->
<div class="title">
      <p>
        <strong>
          <i class="fa-solid fa-utensils"></i>  Thực Đơn Của Chúng Tôi
          <i class="fa-solid fa-utensils"></i>
        </strong>
      </p>
    </div>
    <div class="tab-wrapper">
    <ul class="tab-links">
      <li
        v-for="(tab, index) in tabs"
        :key="index"
        :class="['tab-link', 'has-content', { current: currentTab === index }]"
        @click="currentTab = index"
      >
        {{ tab.ten }}
      </li>
    </ul>
    <div class="tab-contents">
      <div
        v-for="(tab, index) in tabs"
        :key="'content-' + index"
        v-show="currentTab === index"
        
        class="tab-content" >
       <p> {{ tab.noiDung }}
      </p>
      <div class="menu-grid" v-if="tab.dsMon && tab.dsMon.length">
    <div class="card-menu" v-for="(mon, monIndex) in tab.dsMon" :key="monIndex">
      <img :src="mon.hinh" alt="" />
      <div class="info-card">
        <div class="card-name"><strong>{{ mon.ten }}</strong></div>
        <div class="card-title">{{ mon.moTa }}</div>
      </div>
    </div>
  </div>
      </div>
    </div>
  </div>

 <div class="title">
      <p>
        <strong>
          <i class="fa-solid fa-utensils"></i>  Tin Tức
          <i class="fa-solid fa-utensils"></i>
        </strong>
      </p>
    </div>
  <!-- Phần tin tức  -->
 <div class="menu-list">
  <div v-for="(mon, index) in danhSachMonHienTai" :key="index" class="menu-card">
    <img :src="mon.hinh" alt="" />
    <div class="menu-info">
      <h3>{{ mon.ten }}</h3>
      <p>{{ mon.noiDung }}</p>
    </div>
  </div>
</div>
<div style="text-align: center; ">
  <button @click="xemThemMon" class="xemthem-btn">
  {{ daXemThem ? 'Ẩn bớt' : 'Xem thêm' }}
</button>


</div>

  </div>
  <div class="title">
  <p>
    <strong>
      <i class="fa-solid fa-star"></i>  Người Dùng Đánh Giá
      <i class="fa-solid fa-star"></i>
    </strong>
  </p>
</div>

<div class="review-section">
  <div class="review-card" v-for="(review, index) in danhSachDanhGia" :key="index">
    <div class="review-content">
      <h3>{{ review.ten }}</h3>
      <p>{{ review.noiDung }}</p>
    </div>
    <div class="review-image">
      <img :src="review.hinh" alt="Ảnh người dùng" />
    </div>
  </div>
</div>

  <router-view></router-view>
</template>

<script setup>
import Aos from 'aos'
import { onMounted, ref, computed } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'

import 'swiper/css'
import 'swiper/css/pagination'
import '../../assets/css/MenuCard.css'

import { Pagination, Autoplay } from 'swiper/modules'

onMounted(() => {
  Aos.init()
})

const currentTab = ref(0)



// Số lượng món hiển thị ban đầu
const soMonHienTai = ref(3)

// Trạng thái đã xem thêm hay chưa
const daXemThem = ref(false)

// Danh sách món hiện tại tuỳ theo số lượng hiển thị
const danhSachMonHienTai = computed(() => {
  return danhSachMonDayDu.value.slice(0, soMonHienTai.value)
})

// Hàm xử lý khi nhấn "Xem thêm" hoặc "Ẩn bớt"
const xemThemMon = () => {
  if (!daXemThem.value) {
    soMonHienTai.value = danhSachMonDayDu.value.length
    daXemThem.value = true
  } else {
    soMonHienTai.value = 3
    daXemThem.value = false
  }
}
const danhSachDanhGia = [
  {
    ten: 'Nguyễn Văn A',
    noiDung: 'Món ăn rất ngon, phục vụ chu đáo, không gian sạch sẽ!',
    hinh: '/imageicon/user1.png',
  },
  {
    ten: 'Trần Thị B',
    noiDung: 'Thực đơn đa dạng, giá cả hợp lý. Sẽ quay lại lần nữa!',
    hinh: '/imageicon/user2.png',
  },
  {
    ten: 'Lê Văn C',
    noiDung: 'Mình rất thích món lẩu ở đây, nước lẩu đậm đà, ngon tuyệt.',
    hinh: '/imageicon/user3.png',
  },
]

const danhSachMonDayDu = ref([
  { ten: 'Cơm Gà Hải Nam',  noiDung: 'Cơm gà thơm ngon chuẩn vị Singapore', hinh: '/imageicon/comga.png' },
  { ten: 'Bún Bò Huế', noiDung: 'Bún bò đậm đà chuẩn vị Huế', hinh: '/imageicon/bunbo.png' },
  { ten: 'Pizza Hải Sản', noiDung: 'Pizza thơm phức với tôm, mực, phô mai', hinh: '/imageicon/bunbo.png' },
  { ten: 'Lẩu Thái', noiDung: 'Lẩu cay chua đúng chất Thái Lan', hinh: '/imageicon/lauthai.png' },
  { ten: 'Mì Ý Bò Bằm', noiDung: 'Mì Ý với sốt bò bằm truyền thống', hinh: '/imageicon/lauthai.png' },
  { ten: 'Súp Cua', noiDung: 'Súp cua bổ dưỡng, phù hợp cho trẻ nhỏ', hinh: '/imageicon/lauthai.png' },
])


const tabs = ref([
  {
    ten: 'Món Khai Vị',
    hinh: '/imageicon/comga.png',
    noiDung: 'Nội dung Món Khai Vị',
    dsMon: [
    { ten: 'Cơm Gà Hải Nam', hinh: '/imageicon/comga.png', moTa: 'Thơm ngon chuẩn vị Singapore' },
      { ten: 'Bún Bò Huế', hinh: '/imageicon/bunbo.png', moTa: 'Đậm đà chuẩn vị Huế' },
      { ten: 'Pizza Hải Sản', hinh: '/imageicon/pizza.png', moTa: 'Hải sản tươi, phô mai béo' },
    ]
  },
  {
    ten: 'Món Chính',
    hinh: '/imageicon/bunbo.png',
    noiDung: 'Nội dung Món Chính',
    dsMon: [
      { ten: 'Cơm Gà Hải Nam', hinh: '/imageicon/comga.png', moTa: 'Thơm ngon chuẩn vị Singapore' },
      { ten: 'Bún Bò Huế', hinh: '/imageicon/bunbo.png', moTa: 'Đậm đà chuẩn vị Huế' },
      { ten: 'Pizza Hải Sản', hinh: '/imageicon/pizza.png', moTa: 'Hải sản tươi, phô mai béo' },
    ]
  },
  {
    ten: 'Món Pizza',
    hinh: '/imageicon/banhngot.png',
    noiDung: 'Nội dung Món Pizza',
    dsMon: [
    { ten: 'Cơm Gà Hải Nam', hinh: '/imageicon/comga.png', moTa: 'Thơm ngon chuẩn vị Singapore' },
      { ten: 'Bún Bò Huế', hinh: '/imageicon/bunbo.png', moTa: 'Đậm đà chuẩn vị Huế' },
      { ten: 'Pizza Hải Sản', hinh: '/imageicon/pizza.png', moTa: 'Hải sản tươi, phô mai béo' },
      { ten: 'Pizza Hải Sản', hinh: '/imageicon/pizza.png', moTa: 'Hải sản tươi, phô mai béo' },
      { ten: 'Pizza Hải Sản', hinh: '/imageicon/pizza.png', moTa: 'Hải sản tươi, phô mai béo' },
      { ten: 'Pizza Hải Sản', hinh: '/imageicon/pizza.png', moTa: 'Hải sản tươi, phô mai béo' },
    ]
  },
  {
    ten: 'Món Tráng Miếng',
    hinh: '/imageicon/banhngot.png',
    noiDung: 'Nội dung Món Tráng Miệng',
    dsMon: [
    { ten: 'Cơm Gà Hải Nam', hinh: '/imageicon/comga.png', moTa: 'Thơm ngon chuẩn vị Singapore' },
      { ten: 'Bún Bò Huế', hinh: '/imageicon/bunbo.png', moTa: 'Đậm đà chuẩn vị Huế' },
      { ten: 'Pizza Hải Sản', hinh: '/imageicon/pizza.png', moTa: 'Hải sản tươi, phô mai béo' },
    ]
  },
  {
    ten: 'Lẩu',
    hinh: '/imageicon/banhngot.png',
    noiDung: 'Nội dung Món Tráng Miệng',
    dsMon: [
    { ten: 'Cơm Gà Hải Nam', hinh: '/imageicon/comga.png', moTa: 'Thơm ngon chuẩn vị Singapore' },
      { ten: 'Bún Bò Huế', hinh: '/imageicon/bunbo.png', moTa: 'Đậm đà chuẩn vị Huế' },
      { ten: 'Pizza Hải Sản', hinh: '/imageicon/pizza.png', moTa: 'Hải sản tươi, phô mai béo' },
    ]
  },
  {
    ten: 'Đồ Uống',
    hinh: '/imageicon/banhngot.png',
    noiDung: 'Nội dung Món Tráng Miệng',
    dsMon: [
    { ten: 'Cơm Gà Hải Nam', hinh: '/imageicon/comga.png', moTa: 'Thơm ngon chuẩn vị Singapore' },
      { ten: 'Bún Bò Huế', hinh: '/imageicon/bunbo.png', moTa: 'Đậm đà chuẩn vị Huế' },
      { ten: 'Pizza Hải Sản', hinh: '/imageicon/pizza.png', moTa: 'Hải sản tươi, phô mai béo' },
    ]
  },
  
])



const danhSachDanhMuc = [
  { ten: 'Món Khai Vị', hinh: '/imageicon/laukimchi.png' },
  { ten: 'Món Chính', hinh: '/imageicon/lauthai.png' },
  { ten: 'Món Tráng Miệng', hinh: '/imageicon/lautuxuyen.png' },
  { ten: 'Các Đồ Uống', hinh: '/imageicon/lautuxuyen.png' },
  { ten: 'Các Món Pizza', hinh: '/imageicon/lautuxuyen.png' },
  { ten: 'Các Món Lẩu', hinh: '/imageicon/lautuxuyen.png' }
]

const danhSachMonAn = [
  { ten: 'Món gà', noidung: 'Các món gà được chế biến độc đáo', hinh: '/imageicon/bunbo.png' },
  { ten: 'Món bò', noidung: 'Các món bò  với hương vị đậm đà', hinh: '/imageicon/comga.png' },
  { ten: 'Món heo', noidung: 'Thịt heo nướng, kho, chiên siêu ngon', hinh: '/imageicon/pizza.png' },
  { ten: 'Món cá', noidung: 'Hải sản tươi sống chế biến ngay tại bếp', hinh: '/imageicon/bunbo.png' },
  { ten: 'Các món khác', noidung: 'Món chay, món đặc biệt theo mùa', hinh: '/imageicon/bunbo.png' },
]
</script>


<style>


</style>