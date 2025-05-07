<template>
  <div class="shopping-cart">
    <div class="container-shoppingCart">
      <div class="col-left">
        <div class="order-cart">
          <h3 style="font-size: 30px;" class="order-title"><strong>Giỏ Hàng Của Bạn</strong></h3>
          <div v-if="cartItems.length === 0">
            Chưa có mặt hàng nào
          </div>
          <div v-else>
            <div>
              <ul class="header-cart">
                <li>Thông tin sản phẩm</li>
                <li>Đơn giá</li>
                <li>Số lượng</li>
                <li>Thành tiền</li>
              </ul>
            </div>
            <ul>
              <li class="order-item" v-for="(item, index) in cartItems" :key="item.id || index">
                <div class="item-col info">
                  <img :src="item.image" alt="Image of {{ item.name }}" />
                  <span>{{ item.name }}</span>
                </div>
                <div style="margin-left: 20px;" class="item-col price">
                  {{ item.price }}₫
                </div>
                <div class="item-col quantity">
                  {{ item.quantity }}
                </div>
                <div class="item-col total">
                  {{ item.price * item.quantity }}₫
                  <button class="btn-delete" @click="xoaHang(item.id_food)">Xóa</button>
                </div>  
              </li>
            </ul>
            <div class="order-btn-wrapper">
              <router-link :to="{ name: 'users-pay' }">
                <button class="btn-orderItem">Đặt Món</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-right"></div>
    </div>
  </div>
</template>

<script setup>
import { cartItems } from '../../stores/cartStore';
import axios from 'axios';

// Xóa món khỏi giỏ hàng
async function xoaHang(id) {
  try {
    await axios.delete(`/admin/carts/${id}`); // Gửi yêu cầu xóa món từ giỏ hàng
    const index = cartItems.value.findIndex(item => item.id_food === id);
    if (index !== -1) {
      cartItems.value.splice(index, 1); // Xóa món khỏi giỏ
    }
  } catch (error) {
    console.error("Không thể xóa món khỏi giỏ hàng", error);
  }
}
</script>

<style scoped>
.shopping-cart {
    background-color: #143b36;
    height: 800px;
}

.container-shoppingCart {
    margin: 0 auto;
    padding: 0 auto;
    width: 1300px;
    display: flex;
    overflow: hidden;
}

.col-left {
    width: 70%;
    color: white;
}

.col-right {
    width: 30%;
    color: white;
}

.order-cart {
    margin-top: 20px;
    border: 1px solid red;
    height: auto;
    padding: 20px;
    width: 800px;
    border: 1px solid white;
}

.header-cart {
  display: flex;
  color: white;
  font-weight: bold;
  border: 1px solid white;
}

.header-cart li {
  flex: 1;
  list-style: none;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border: 1px solid #ccc;
}

.item-col {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
}

.item-col img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-left: 10px;
}

.btn-delete {
  margin-left: 10px;
  color: red;
  background: none;
  border: none;
  cursor: pointer;
}
.order-btn-wrapper {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.btn-orderItem{
  color: #fff;
    background-color: #d69c52;
    padding: 10px 15px;
    font-size: 14px;
    border-radius: 5px;
    box-shadow: 0 3px 6px #a37b44;
    height: 40px;
    width: 200px;
    transition: box-shadow 0.3s ease;
    display: flex;
justify-content: center;
align-items: center;
}
</style>