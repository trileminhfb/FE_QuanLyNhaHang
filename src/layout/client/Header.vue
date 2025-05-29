<template>
  <nav class="navbar">
    <div class="header">
      <ul class="menu">
        <a href="" class="logo">
          <img src="/imageicon/phefood.png" alt="Logo" />
        </a>
        <li class="nav-item">
          <router-link class="router-home" :to="{ name: 'users-home' }"><strong>HOME</strong></router-link>
        </li>
        <li class="nav-item servicefood">
          <router-link class="router-introduce" :to="{ name: 'users-introduce' }">INTRODUCE</router-link>
        </li>
        <li class="nav-item servicefood">
          <router-link :to="{ name: 'users-category' }">MENU</router-link>
        </li>
        <li class="nav-item servicefood">
          <router-link :to="{ name: 'users-news' }">NEWS</router-link>
        </li>
        <li class="nav-item servicefood">
          <router-link to="/booking">BOOKING TABLE</router-link>
        </li>
        <li class="nav-item servicefood">
          <router-link to="/contact">CONTACT</router-link>
        </li>
        <div class="flex-1 justify-end flex items-center nav-icons">
          <!-- Payment Icon -->
          <li class="nav-item">
            <div class="payment-icon">
              <router-link :to="{ name: 'users-payment' }">
                <i class="fa-solid fa-credit-card"></i>
              </router-link>
            </div>
          </li>
          <!-- User Info -->
          <li class="nav-item">
            <div class="cart-user">
              <span v-if="userEmail" class="user-email">Xin chào, {{ userName }}</span>
              <i v-else class="fa-solid fa-user"></i>
              <div class="user-info">
                <router-link v-if="!userEmail" :to="{ name: 'users-login' }">Đăng nhập</router-link>
                <button class="user-info-logout" v-else @click="handleLogout">Đăng xuất</button>
              </div>
            </div>
          </li>
          <!-- Shopping Cart -->
          <li class="nav-item">
            <div class="cart-shopping" ref="cartIcon">
              <router-link :to="{ name: 'users-shoppingCart' }">
                <i class="fa-solid fa-cart-shopping"></i>
                <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
              </router-link>
            </div>
          </li>
          <!-- Hamburger Menu Toggle -->
          <li class="nav-item menu-toggle-wrapper">
            <input type="checkbox" id="menu-toggle" hidden  >
            <label for="menu-toggle" class="menu-toggle">
              <i class="fa-solid fa-bars"></i>
            </label>
            <div class="user-menu">
              <div class="menu-header">
                <label for="menu-toggle">
                  <i class="fa-solid fa-times"></i>
                </label>
                <h2>Menu</h2>
              </div>
              <router-link :to="{ name: 'users-home' }">
                <div class="menu-item">
                  <i class="fa-solid fa-house"></i>
                  <h2>Home</h2>
                </div>
              </router-link>
              <router-link :to="{ name: 'users-introduce' }">
                <div class="menu-item">
                  <i class="fa-solid fa-info-circle"></i>
                  <h2>Introduce</h2>
                </div>
              </router-link>
              <router-link :to="{ name: 'users-category' }">
                <div class="menu-item">
                  <i class="fa-solid fa-utensils"></i>
                  <h2>Menu</h2>
                </div>
              </router-link>
              <router-link :to="{ name: 'users-news' }">
                <div class="menu-item">
                  <i class="fa-solid fa-newspaper"></i>
                  <h2>News</h2>
                </div>
              </router-link>
              <router-link to="/booking">
                <div class="menu-item">
                  <i class="fa-solid fa-calendar-check"></i>
                  <h2>Booking Table</h2>
                </div>
              </router-link>
              <router-link to="/contact">
                <div class="menu-item">
                  <i class="fa-solid fa-envelope"></i>
                  <h2>Contact</h2>
                </div>
              </router-link>
              <router-link :to="{ name: 'users-personalinformation' }">
                <div class="menu-item">
                  <i class="fa-solid fa-user"></i>
                  <h2>Account</h2>
                </div>
              </router-link>
              <router-link :to="{ name: 'users-rank' }">
                <div class="menu-item">
                  <i class="fa-solid fa-ranking-star"></i>
                  <h2>Rank</h2>
                </div>
              </router-link>
              <router-link :to="{ name: 'users-evaluation' }">
                <div class="menu-item">
                  <i class="fas fa-pen"></i>
                  <h2>Rates</h2>
                </div>
              </router-link>
              <router-link :to="{ name: 'booking-history' }">
                <div class="menu-item">
                  <i class="fas fa-history"></i>
                  <h2>History-Booking</h2>
                </div>
              </router-link>
              <router-link :to="{ name: 'users-historypayment' }">
                <div class="menu-item">
                  <i class="fas fa-history"></i>
                  <h2>History-Payment</h2>
                </div>
              </router-link>
              <div class="menu-item" @click="handleLogout">
                <i class="fa-solid fa-right-from-bracket"></i>
                <h2>Log Out</h2>
              </div>
            </div>
          </li>
        </div>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import '../../assets/css/Header.css';
import { cartCount } from '../../stores/cartStore';
import api from '../../services/api';
import { useRouter } from 'vue-router';

const userEmail = ref(null);
const userName = ref(null);
const types = ref([]);
const router = useRouter();
const avatar = ref(localStorage.getItem('avatar') || '/default-avatar.png');

window.addEventListener('storage', () => {
  avatar.value = localStorage.getItem('avatar') || '/default-avatar.png';
});

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Bạn có chắc chắn muốn đăng xuất không?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy',
  });

  if (result.isConfirmed) {
    try {
      const response = await api.post('/client/logout');

      if (response.data.message === 'Đăng xuất thành công') {
        Swal.fire({
          title: 'Đăng xuất thành công!',
          text: 'Bạn đã đăng xuất khỏi tài khoản.',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        localStorage.clear();
        sessionStorage.clear();
        router.push('/users-login');
      }
    } catch (error) {
      console.error('Lỗi đăng xuất:', error);
      Swal.fire({
        title: 'Bạn chưa đăng nhập nên không thể đăng xuất?!',
        text: 'Có lỗi xảy ra khi đăng xuất. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }
};

onMounted(async () => {
  try {
    const response = await api.get('/client/types');
    types.value = response.data.data;
  } catch (error) {
    console.error('Lỗi khi lấy loại món ăn:', error);
  }
  userEmail.value = localStorage.getItem('customer_email') || '';
  userName.value = localStorage.getItem('customer_fullName') || '';
});
</script>

<style scoped>
.navbar {
  width: 100%;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  list-style: none;
  margin: 0;
}

.logo img {
  height: 50px;
  width: auto;
  object-fit: contain;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
  font-size: 14px;
  transition: color 0.3s;
}

.nav-item a:hover {
  color: #e67e22;
}

.servicefood {
  position: relative;
}

.servicefood > a::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  width: 0;
  height: 3px;
  background-color: yellow;
  transition: width 0.3s ease, left 0.3s ease;
  transform: translateX(-50%);
}

.servicefood > a:hover::after {
  width: 100%;
  left: 50%;
}

.nav-icons {
  display: flex;
  align-items: center;
  gap: 15px;
}

.payment-icon i,
.cart-shopping i,
.cart-user i {
  font-size: 18px;
  color: #333;
}

.cart-user {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.user-email {
  font-size: 14px;
  font-weight: bold;
}

.user-info {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #fff;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  display: none;
  z-index: 999;
  white-space: nowrap;
}

.cart-user:hover .user-info {
  display: block;
}

.user-info a,
.user-info button {
  display: block;
  color: #333;
  text-decoration: none;
  background: none;
  border: none;
  padding: 6px 0;
  font-size: 14px;
  cursor: pointer;
  text-align: left;
  width: 100%;
}

.user-info a:hover,
.user-info button:hover {
  color: #d69c52;
}

.cart-shopping {
  position: relative;
}

.cart-count {
  position: absolute;
  top: -6px;
  right: -15px;
  background-color: red;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
}

.menu-toggle-wrapper {
  display: block;
}

.user-menu {
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 260px;
  padding: 20px;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: transform 0.3s;
  transform: translateX(100%);
  z-index: 1000;
  overflow: auto;
}

#menu-toggle:checked ~ .user-menu {
  transform: translateX(0);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.menu-header {
  display: flex;
  align-items: center;
  gap: 20px;
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 14px;
  transition: background 0.1s;
  cursor: pointer;
  color: #333;
  gap: 20px;
}

.menu-item:hover {
  background: #eee;
}

.menu-item i {
  width: 20px;
  font-size: 22px;
  text-align: center;
}

.menu-item h2 {
  font-size: 16px;
  margin: 0;
}

/* Mega Menu */
.mega-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 900px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: none;
  flex-direction: column;
  z-index: 999;
}

.servicefood:hover .mega-menu {
  display: flex;
}

.menu-row {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.menu-list {
  flex: 3;
}

.row-menu {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.col-type {
  width: 200px;
}

.title-header {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #222;
}

.title-header:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

.dish-list {
  list-style: none;
  padding-left: 0;
}

.dish-list li {
  margin-bottom: 6px;
}

.dish-list a {
  text-decoration: none;
  font-size: 14px;
  color: #444;
}

.dish-list a:hover {
  color: #e67e22;
}

.menu-image {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-image img {
  width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu {
    flex-wrap: wrap;
    position: relative;
  }

  .nav-item:not(.menu-toggle-wrapper):not(.nav-icons .nav-item) {
    display: none;
  }

  .menu-toggle-wrapper {
    display: block;
  }

  .nav-icons {
    gap: 10px;
  }

  .logo img {
    height: 40px;
  }

  .user-email {
    font-size: 12px;
  }

  .cart-user i,
  .cart-shopping i,
  .payment-icon i {
    font-size: 16px;
  }

  .mega-menu {
    width: 100%;
    left: 0;
    padding: 10px;
  }

  .menu-row {
    flex-direction: column;
  }

  .col-type {
    width: 100%;
  }

  .menu-image img {
    width: 100%;
    height: auto;
  }
}

@media (max-width: 480px) {
  .header {
    padding: 0 10px;
  }

  .nav-item {
    margin: 0 5px;
  }

  .user-info {
    padding: 8px 10px;
  }

  .user-info a,
  .user-info button {
    font-size: 12px;
  }

  .cart-count {
    font-size: 10px;
    padding: 1px 4px;
  }

  .user-menu {
    width: 100%;
    padding: 15px;
  }

  .menu-item h2 {
    font-size: 14px;
  }

  .menu-item i {
    font-size: 18px;
  }
}
</style>