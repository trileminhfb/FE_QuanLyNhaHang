<template>
  <div class="container-news">
    <div class="col-left">
      <div class="card-news">
        <p class="title-news">Các Tin tức liên quan</p>
        <div
          class="info-news"
          v-for="(news, index) in dsNews"
          :key="index"
          @click="chonTinTuc(index)"
          :class="{ active: tinTucChiTietDangXem === chitiet[index].chitiet }"
        >
          <img :src="news.hinh" :alt="news.noiDung" />
          <p class="content-news">{{ news.noiDung }}</p>
        </div>
      </div>
    </div>
    <div class="col-right">
      <div class="title-see" v-if="cardChiTietDangXem">
        <button class="back-button" @click="cardChiTietDangXem = null">
          ← Quay lại
        </button>
        <div class="meta-info">
          <p><i class="fas fa-calendar-alt"></i> Thời gian hiện tại: {{ time }}</p>
          <p>
            <i class="fa-solid fa-user" style="color: #ffd700;"></i> Admin: Khánh
          </p>
        </div>
        <h2>Mách bạn công thức làm canh cá nấu mẻ thơm ngon đậm vị</h2>
        <h3>{{ cardChiTietDangXem.ten }}</h3>
        <img
          :src="cardChiTietDangXem.hinh"
          :alt="cardChiTietDangXem.ten"
          class="detail-image"
        />
        <div class="detail-content">
          <p>{{ cardChiTietDangXem.noiDung }}</p>
          <p>
            Vậy cần chuẩn bị những nguyên liệu gì, cách chế biến canh cá nấu mẻ
            như thế nào để có bát canh thơm ngon, chuẩn vị nhất. Hãy cùng Dola
            theo dõi bài viết dưới đây bạn nhé.
          </p>
          <h4>Công thức làm canh cá nấu mẻ cả nhà đều mê</h4>
          <p>
            Để ra được một món canh thơm ngon, bổ dưỡng thì việc lựa chọn các
            nguyên liệu là điều rất cần thiết nên chị em cần phải lựa chọn thật
            kỹ. Nguyên liệu để nấu món canh này vô cùng đơn giản và dễ tìm.
          </p>
          <h5>Nguyên liệu cần chuẩn bị</h5>
          <ul class="ingredient-list">
            <li>Cá tươi (trắm, basa, hoặc lóc)</li>
            <li>Cà chua (2 quả)</li>
            <li>Cơm mẻ (2 thìa)</li>
            <li>Nghệ tươi (1 củ nhỏ)</li>
            <li>Hành tím, hành lá, thì là, mùi tàu, ớt</li>
            <li>Gia vị: muối, hạt nêm, nước mắm, tiêu xay</li>
          </ul>
          <h5>Cách chế biến</h5>
          <ol class="step-list">
            <li>Sơ chế cá: Rửa sạch, ướp với muối và nghệ trong 15 phút.</li>
            <li>Phi thơm hành tím, thêm cà chua xào chín.</li>
            <li>Cho nước vào nồi, đun sôi, thêm cơm mẻ đã lọc.</li>
            <li>Thả cá vào, nấu khoảng 10 phút, nêm gia vị.</li>
            <li>Thêm hành lá, thì là, mùi tàu trước khi tắt bếp.</li>
          </ol>
          <div class="action-buttons">
            <button
              class="share-button"
              :disabled="!cardChiTietDangXem"
              @click="shareNews(cardChiTietDangXem)"
            >
              <i class="fas fa-share-alt"></i> Share
            </button>
            <button
              class="like-button"
              :disabled="!cardChiTietDangXem"
              @click="addToFavorite(cardChiTietDangXem)"
            >
              <i class="fas fa-heart"></i> Like
            </button>
          </div>
        </div>
      </div>
      <div class="all-title" v-else>
        <div
          class="title-card"
          v-for="(news, index) in tinTucChiTietDangXem"
          :key="index"
          @click="xemChiTiet(news)"
        >
          <img :src="news.hinh" :alt="news.ten" />
          <div class="info-card">
            <h4>Đăng bởi: Admin Khánh</h4>
            <p class="info-name">{{ news.ten }}</p>
            <p class="view-detail"><strong>Xem chi tiết →</strong></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const dsNews = ref([
  { hinh: '/imageicon/bunbo.png', noiDung: 'Mách bạn công thức nấu tô bún đậm vị' },
  { hinh: '/imageicon/lauthai.png', noiDung: 'Lẩu thái chua cay dễ làm' },
  { hinh: '/imageicon/bunbo.png', noiDung: 'Món ngon mỗi ngày đơn giản' },
])
const chitiet = ref([
  {
    hinh: '/imageicon/bunbo.png',
    chitiet: [
      { ten: 'Bún bò Huế đậm đà', hinh: '/imageicon/bunbo.png', noiDung: 'Canh cá nấu mẻ là món ăn dân dã, quen thuộc trong mỗi mâm cơm gia đình Việt. Mùa hè nắng nóng mà có bát canh cá chua chua, ngọt ngọt thì còn gì bằng. Có rất nhiều cách để chế biến theo công thức này như: canh cá trắm nấu mẻ, canh cá basa nấu mẻ, canh cá lóc nấu mẻ, canh cá dọc mùng nấu mẻ,…' },
      { ten: 'Nguyên liệu chính', hinh: '/imageicon/bunbo.png', noiDung: 'Thịt bò, giò heo...' },
      { ten: 'Cách chế biến', hinh: '/imageicon/bunbo.png', noiDung: 'Luộc xương, nêm mắm ruốc...' },
      { ten: 'Cách chế biến', hinh: '/imageicon/bunbo.png', noiDung: 'Luộc xương, nêm mắm ruốc...' },
      { ten: 'Cách chế biến', hinh: '/imageicon/bunbo.png', noiDung: 'Luộc xương, nêm mắm ruốc...' },
    ]
  },
  {
    hinh: '/imageicon/lauthai.png',
    chitiet: [
      { ten: 'Lẩu thái chua cay', hinh: '/imageicon/lauthai.png', noiDung: 'Nước dùng từ sả, chanh, ớt...' },
      { ten: 'Thành phần chuẩn', hinh: '/imageicon/lauthai.png', noiDung: 'Tôm, mực, nghêu, rau...' },
      { ten: 'Cách nấu', hinh: '/imageicon/lauthai.png', noiDung: 'Xào nguyên liệu trước rồi thêm nước dùng...' },
      { ten: 'Lưu ý bảo quản', hinh: '/imageicon/lauthai.png', noiDung: 'Không nên để qua đêm...' },
    ]
  },
  {
    hinh: '/imageicon/bunbo.png',
    chitiet: [
      { ten: 'Món ăn 1', hinh: '/imageicon/bunbo.png', noiDung: '...' },
      { ten: 'Món ăn 2', hinh: '/imageicon/bunbo.png', noiDung: '...' },
      { ten: 'Món ăn 2', hinh: '/imageicon/bunbo.png', noiDung: '...' },
      { ten: 'Món ăn 2', hinh: '/imageicon/bunbo.png', noiDung: '...' },
    ]
  }
])

const tinTucChiTietDangXem = ref([])
const cardChiTietDangXem = ref(null)
const thoigian = ref()
const time = ref('')
function updatetime() {
  const now = new Date()
  time.value = now.toLocaleDateString()
  thoigian.value = now.toLocaleDateString('vi-VN')
}
let interval = null
onMounted(() => {
  updatetime()
  interval = setInterval(updatetime, 1000)
});
onUnmounted(() => {
  clearInterval(interval)
})
// Khi vừa vào thì chọn tin đầu tiên
onMounted(() => {
  chonTinTuc(0)
})
// Hàm chọn tin bên trái
function chonTinTuc(index) {
  tinTucChiTietDangXem.value = chitiet.value[index].chitiet
  cardChiTietDangXem.value = null
}
// Hàm xem chi tiết khi bấm vào card bên phải
function xemChiTiet(card) {
  cardChiTietDangXem.value = card
}

function shareNews(news) {
  if (!news || !news.ten) {
    alert('Không thể chia sẻ: Vui lòng chọn một tin tức trước!')
    return
  }
  const url = window.location.href || 'https://example.com/news'
  const text = `Khám phá công thức: ${news.ten}`
  if (navigator.share) {
    navigator.share({ title: news.ten, text, url })
      .catch(err => {
        console.error('Lỗi chia sẻ:', err)
        alert('Không thể chia sẻ: Lỗi hệ thống, vui lòng thử lại sau!')
      })
  } else {
    alert(`Chia sẻ công thức "${news.ten}":\n${text}\n${url}`)
  }
}

function addToFavorite(news) {
  if (!news || !news.ten) {
    alert('Không thể thêm vào yêu thích: Vui lòng chọn một tin tức trước!')
    return
  }
  localStorage.setItem(`favorite_${news.ten}`, JSON.stringify(news))
  alert('Đã thêm vào yêu thích!')
}
</script>

<style scoped>
.container-news {
  display: flex;
  background: #143b36;
  width: 100%;
  min-height: 100vh;
  padding: 24px;
}

.col-left {
  width: 30%;
}

.col-right {
  width: 70%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.card-news {
  background: #ffffff;
  border: 1px solid #d69c52;
  border-radius: 10px;
  width: 90%;
  margin: 10px 0 10px 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.title-news {
  background: #d69c52;
  text-align: center;
  font-weight: bold;
  color: #ffffff;
  font-size: 20px;
  padding: 12px;
  margin: 0;
}

.info-news {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease, transform 0.2s ease;
}

.info-news:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.info-news.active {
  background: rgba(214, 156, 82, 0.2);
  border-left: 4px solid #d69c52;
}

.info-news img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.content-news {
  margin: 0 0 0 10px;
  color: #143b36;
  white-space: normal;
  flex: 1;
  font-size: 16px;
  transition: color 0.3s ease;
}

.info-news:hover .content-news {
  color: #ffd700;
}

.all-title {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 12px;
}

.title-card {
  background: #ffffff;
  width: 300px;
  height: 300px;
  border-radius: 10px;
  margin: 12px 0 10px 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
}

.title-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.title-card img {
  height: 180px;
  width: 100%;
  object-fit: cover;
  transition: transform 0.2s ease;
}

.title-card:hover img {
  transform: scale(1.1);
}

.info-card {
  color: #143b36;
  padding: 10px;
}

.info-card h4 {
  font-size: 14px;
  color: #666;
  margin: 0 0 8px;
}

.info-card .info-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px;
  transition: color 0.3s ease;
}

.title-card:hover .info-name {
  color: #ffd700;
}

.info-card .view-detail {
  font-size: 14px;
  color: #ffd700;
  margin: 0;
  font-weight: bold;
}

.title-card:hover .view-detail {
  color: #d69c52;
}

.title-see {
  background: #ffffff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  width: 100%;
  height: 100%;
  overflow-y: auto;
  color: #143b36;
}

.back-button {
  background: #d69c52;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
  transition: background 0.3s ease;
}

.back-button:hover {
  background: #b57c3e;
}

.meta-info {
  display: flex;
  gap: 16px;
  font-size: 14px;
  margin-bottom: 16px;
}

.meta-info i {
  margin-right: 6px;
}

.detail-image {
  width: 100%;
  max-width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  margin: 16px 0;
}

.detail-content h2 {
  font-size: 24px;
  font-weight: 700;
  margin: 16px 0;
}

.detail-content h3 {
  font-size: 20px;
  font-weight: 600;
  margin: 12px 0;
}

.detail-content h4 {
  font-size: 18px;
  font-weight: 600;
  margin: 12px 0;
}

.detail-content h5 {
  font-size: 16px;
  font-weight: 600;
  margin: 12px 0;
}

.detail-content p {
  font-size: 16px;
  margin: 8px 0;
}

.ingredient-list,
.step-list {
  padding-left: 20px;
  margin: 12px 0;
  font-size: 16px;
}

.ingredient-list li,
.step-list li {
  margin-bottom: 8px;
}

.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.share-button,
.like-button {
  background: #4caf50;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.share-button:disabled,
.like-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.share-button:hover:not(:disabled) {
  background: #388e3c;
}

.like-button {
  background: #e63946;
}

.like-button:hover:not(:disabled) {
  background: #c62828;
}

@media (max-width: 768px) {
  .container-news {
    flex-direction: column;
    padding: 16px;
  }

  .col-left,
  .col-right {
    width: 100%;
  }

  .col-left {
    max-height: 40vh;
    overflow-y: auto;
  }

  .title-card {
    width: 100%;
    max-width: 300px;
  }

  .detail-image {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .info-news img {
    width: 60px;
    height: 60px;
  }

  .content-news {
    font-size: 14px;
  }

  .title-card {
    height: 280px;
  }

  .title-card img {
    height: 160px;
  }

  .info-card .info-name {
    font-size: 16px;
  }

  .detail-content h2 {
    font-size: 20px;
  }

  .detail-content h3 {
    font-size: 18px;
  }

  .detail-content p,
  .ingredient-list,
  .step-list {
    font-size: 14px;
  }
}
</style>