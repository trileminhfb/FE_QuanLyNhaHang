<template>
  <nav class="navbar">
    <div class="header">
      <ul class="menu">
        <a href="" class="logo">
          <img src="/imageicon/phefood.png" alt="">
        </a>
        <li>
          <router-link class="router-home" :to="{ name: 'users-home' }"><strong>HOME</strong></router-link>
        </li>
        <li class="introduce">
          <!-- cach 1 -->
          <!-- <router-link class="router-introduce" to="/introduce" >INTRODUCE</router-link>  -->
          <!-- cach 2 -->
          <router-link class="router-introduce" :to="{ name: 'users-introduce' }">INTRODUCE</router-link>


        </li>
        <li class="servicefood">
          <a href="">SERVICE FOOD</a>

        </li>
        <li class="servicefood">
          <a href="">SERVICE FOOD</a>
          <ul class="name-menu">
            <li>
              <div class="menu-row">
                <div class="menu-list">
                  <div class="row-menu">
                    <div class="col-6" @mouseover="currentImage = '/imageicon/lauthai.png'">
                      <p class="title-header">Khai vị </p>
                      <ul>
                        <li><a href=""><i class="fa-solid fa-circle-dollar-to-slot"></i> Spot</a></li>
                        <li><a href=""><i class="fa-solid fa-jet-fighter"></i> Margin vị akjddâddâda</a></li>
                        <li><a href="P2P.html"><i class="fa-solid fa-credit-card"></i> P2P</a></li>
                      </ul>
                    </div>

                    <div class="col-6" @mouseover="currentImage = '/imageicon/bunbo.png'">
                      <p class="title-header">Món chính</p>
                      <ul>
                        <li><a href="botGiaoDich.html"><i class="fa-solid fa-robot"></i> Bot giao dịch</a></li>
                        <li><a href="saochepgiaodich.html"><i class="fa-solid fa-copy"></i> Sao chép giao dịch</a></li>
                        <li><a href=""><i class="fa-solid fa-lock"></i> Cơm gà </a></li>
                      </ul>
                    </div>
                  </div>

                  <div class="row-menu">
                    <div class="col-6" @mouseover="currentImage = '/imageicon/comga.png'">
                      <p class="title-header">Đồ uống</p>
                      <ul>
                        <li><a href="#"><i class="fa-solid fa-mug-hot"></i> Cà phê</a></li>
                        <li><a href="#"><i class="fa-solid fa-wine-glass"></i> Rượu vang</a></li>
                        <li><a href="#"><i class="fa-solid fa-glass-water"></i> Nước lọc</a></li>
                      </ul>
                    </div>

                    <div class="col-6" @mouseover="currentImage = '/imageicon/lautuxuyen.png'">
                      <p class="title-header">Món tráng miệng</p>
                      <ul>
                        <li><a href="#"><i class="fa-solid fa-ice-cream"></i> Kem</a></li>
                        <li><a href="#"><i class="fa-solid fa-cake-candles"></i> Bánh ngọt</a></li>
                        <li><a href="#"><i class="fa-solid fa-cookie-bite"></i> Cookie</a></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="menu-image">
                  <img style="width: 250px;" :src="currentImage" alt="Ảnh món ăn" />
                </div>
              </div>
            </li>
          </ul>
        </li>
        <li class="servicefood">
          <router-link :to="{ name: 'users-news' }">NEWS</router-link>
        </li>
        <li class="servicefood">
          <router-link to="/booking"> BOOKING</router-link>
        </li>
        <li class="servicefood">
          <router-link to="/contact"> CONTACT</router-link>
        </li>
        <div class="flex-1 justify-end flex me-10 items-center">
          <li>
            <div class="search-container">
              <div :class="isSearch ? 'w-[200px] search-box' : 'w-[40px] search-box'"

              @click="handleOpenSearch()"
          >
                <input type="text" placeholder="Tìm Món ..." name="" id="">
                <div>
                  <i class=" fas  fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
              <!-- <div class="search-icon">
        <i class="fa-solid fa-magnifying-glass"></i>
      </div> -->
              <!-- <div class="search-card">
        <label style="margin: 0 5px 0 5px;" for="">Tìm Kiếm Món Ăn Của Bạn</label>
        <input type="text" placeholder="Tìm món ăn..." />
      </div> -->
            </div>
          </li>
          <li>
            <div class="cart-shopping">
              <router-link :to="{ name: 'users-shoppingCart' }">
                <i class="fa-solid fa-cart-shopping"></i>
              </router-link>

            </div>
          </li>
          <li>
            <div class="user">
              <i class="fa-solid fa-user"></i>
            </div>
          </li>
        </div>


      </ul>


    </div>
  </nav>
</template>
<script setup>
import { ref } from 'vue';
import '../../assets/css/Header.css'
const currentImage = ref('/imageicon/food icon.png')
const isSearch = ref(false);

const handleOpenSearch = () => {
  isSearch.value = true
}

</script>
<style scoped>
.search-box {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 30px;
  padding: 6px 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  overflow: hidden;
  cursor: pointer;
}

.search-box input {
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  font-size: 14px;
  padding-left: 20px;
}

.search-box i {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #333;
  transition: color 0.3s ease;
}

.search-box:hover i {
  color: #007bff;
}
</style>