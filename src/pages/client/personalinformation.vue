<template>
    <div class="container-personalinformation">
      <div class="rank-box">
        <div class="member-info">
          <img src="/imageicon/logo.png" class="avatar" />
          <div class="member-details">
            <h3>Le Minh Tri</h3>
            <p>69 Stars</p>
          </div>
        </div>
  
        <div class="total-spending">
            
          <p class="label">
           <span> Total Spending <strong style="color: aqua;">2025</strong> </span>
          
          <span class="amount">5.787.000 đ</span>
            
          </p>
  
          <div class="progress-bar">
            <div class="milestone">
              <span>0 đ</span>
              <div class="icon start"></div>
            </div>
            <div class="milestone">
              <span>2.000.000 đ</span>
              <div class="icon mid"></div>
            </div>
            <div class="milestone">
              <span>4.000.000 đ</span>
              <div class="icon current"></div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="info-box">
        <div class="category-container">
 
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
  <div class="information-personal">
   
   <div class="input-information">
    <div class="row-information">
      <div class="group-information">
      Họ và tên
      <i class="fa fa-user"></i>
        
        <input type="text" name="" id="">
      </div>
      <div class="group-information">
    Ngày sinh


        <input type="date" name="" id="">
      </div>
    </div>
    <div class="row-information">
      <div class="group-information">
     số điện thoại
      <i class="fa fa-user"></i>
        <input type="number" name="" id="">
      </div>
      <div class="group-information">
      Họ và tên
      <i class="fa fa-user"></i>

        <input type="text" name="" id="">
      </div>
    </div>
    <div class="row-information">
      <div class="group-radio">
        
        <input type="radio" name="0" id="">Nam
        <input type="radio" name="0" id="">Nữ

      </div>
      <div style="margin-left: 313px;" class="group-information">
      Họ và tên
      <i class="fa fa-user"></i>

        <input type="text" name="" id="">
      </div>
    </div>
   </div>
  </div>
      </div>
    </div>
  </div>
</div>
      </div>
    </div>
  </template>
  <script setup>
import { ref } from 'vue'
    import { addToCart as addToCartFormStore } from '../../stores/cartStore'
const tabs = ref([
{
    ten: 'Lịch sử giao dịch',
    noiDung: 'Nội dung Món Khai',
   
  },
  {
    ten: 'Thông tin cá nhân',
    noiDung: 'Nội dung Món Chính',
   
  },
  {
    ten: 'Thông báo',
    noiDung: 'Nội dung Món Pizza',
  
  },
  {
    ten: 'Quà tặng',
    noiDung: 'Nội dung Món Pizza',
  
  },
  {
    ten: 'Chính sách ',
    noiDung: 'Nội dung Món Tráng Miệng',
 
  },
  
])
const currentTab = ref(0)

</script>
  <style scoped>

  .input-information{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
  }
  .row-information{
    display: flex;
    gap: 20px;
    align-items: center;
    
  }
  .group-information input{
    border: 1px solid #ccc;           
  background-color: white;      
  padding: 8px 12px;
  border-radius: 4px;
  font-size: 14px;
  width: 400px;
  padding-left: 35px; /*  chừa chỗ cho icon */
  }
  .group-information{
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .group-information i{
    position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(20%);
  color: #888;

  }
  .container-personalinformation {
    display: flex;
    gap: 20px;
    padding: 20px;
    font-family: sans-serif;
    background-color: #f5f5f5; 
    height: 100%;
  }
  
  /* Left */
  .rank-box {
    width: 35%;
    background: white;
    padding: 20px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  
  .member-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    flex-shrink: 0;
  }
  
  .member-details h3 {
    font-size: 18px;
    margin-bottom: 2px;
  }
  
  .total-spending .label {
    font-size: 14px;
    color: gray;
    margin-top: 15px;
  }
 
  

  .label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.total {
  flex-grow: 1;
}
.amount {
  text-align: right;
}
  .total-spending .amount {
    font-size: 20px;
    color: #f37021;
    font-weight: bold;
    margin-bottom: 10px;
  }
  
  .progress-bar {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: relative;
    height: 70px;
    margin-top: 10px;
    border-top: 2px solid #ccc;
  border-bottom: 2px solid #ccc;
    padding-top: 20px;
  }
  
  .milestone {
    text-align: center;
    position: relative;
  }
  
  .milestone .icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin: 5px auto 0;
    background: #ccc;
  }
  
  .milestone .start {
    background: #aaa;
  }
  
  .milestone .mid {
    background: gold;
  }
  
  .milestone .current {
    background: orange;
    border: 2px solid white;
    box-shadow: 0 0 4px orange;
   
  }
  
  /* Right */
  .info-box {
    width: 65%;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  }
  .category-container{
    background: white;
    width: 100%;
}
.title {
    margin-top: 30px;
  }
  .title p {
    font-family: "Dancing Script", cursive;
  }

  
  
 
  
  
  .tab-links {
    display: flex;
    list-style: none;
    justify-content: space-between;
    margin-bottom: 20px;
    border-bottom: 2px solid #ccc;
  }
  
  .tab-link {
    padding: 10px 20px;
    cursor: pointer;
    font-weight: bold;
    border: none;
    background-color: transparent;
    transition: 0.3s;
    color: #333;
  }
  
  .tab-link.current {
    color: #ff4500;
    border-bottom: 3px solid #ff4500;
  }
  
  .tab-content {
    padding: 20px;
    border: 1px solid #ddd; 
    border-radius: 8px;
    background: #f9f9f9;
  }
  .menu-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    padding: 20px 0;
    

  }
  .menu-grid{
    display: flex;
    flex-wrap: wrap;
  }
  .card-menu{
    border: 1px solid white ;
    width: 262px;
    padding: 10px;
    margin: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
border-radius: 20px;


  }
  .card-menu img{
    width: 300px;
    height: 200px;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));

  }
  .info-card{
   text-align: center;
  }
  
  .menu-card {
    border: 1px solid #ccc;
    border-radius: 12px;
    overflow: hidden;
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
  }
  
  .menu-card:hover {
    transform: translateY(-5px);
  }
  
  .menu-card img {
    width: 300px;
    object-fit: cover;
  }
  
  .menu-info {
    padding: 12px;
    text-align: center;
    word-wrap: break-word;
  }
  
  .xemthem-btn {
    padding: 10px 20px;
    font-weight: bold;
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
  .review-section {
    width: 100%;
    padding: 20px;
  }
  
  .review-card {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    height: 130px;
  }
  
  .review-content {
    flex: 0 0 60%; 
    padding-right: 15px; 
  }
  
 
  </style>
  