<template>
    <div class="container">
        <div class="order-table">
            <div class="col-left">
                <p class="title-oder">
                    <i class="fas fa-utensils"></i>
                    Liên Hệ Đặt Bàn
                    <i class="fas fa-utensils"></i>
                </p>

                <div class="input-text">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tên Của Bạn</label>
                            <input type="text" placeholder="Nhập tên của bạn..." />
                        </div>
                        <div class="form-group">
                            <label>Email của bạn</label>
                            <input type="email" placeholder="Nhập email của bạn..." />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Số Điện Thoại</label>
                            <input type="text" placeholder="Nhập số điện thoại..." />
                        </div>
                        <div class="form-group">
                            <label>Bạn có thể đến ngày nào? </label>
                            <input type="date" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Bạn đi mấy người?</label>
                            <input type="text" placeholder="Nhập số người..." />
                        </div>
                        <div class="form-group">
                            <label>Thời gian bạn đến?</label>
                            <input type="time" />
                        </div>
                    </div>
                </div>
                <div class="oder-introduce">
                  <p>Khác có thể đặt tiệc hội nghị , liên hoan vui lòng gọi trực tiếp:
                    <strong class="number-phone"> 1900 2345 </strong>
                  </p>
                </div>
                <button class="oder-btn">
<strong>Đặt Bàn Ngay</strong>
                </button>
            </div>
            <div class="col-right">
                <img src="/public/imageicon/bunbo.png" alt="Hình ảnh" />
            </div>
        </div>
    </div>
</template>

<script setup>
import '../../assets/css/Booking.css'
</script>

<style scoped>
.container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    justify-content: center;
}

.order-table {
    width: 100%;
    height: 550px;
    background: #143b36;
    border-radius: 60px;
    display: flex;
    align-items: center;
    padding: 30px;
    gap: 40px;
}

.col-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.col-right {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}

.col-right img {
    width: 100%;
    max-width: 400px;
    object-fit: contain;
    margin-top: 100px;
}

.title-oder {
    font-family: "Dancing Script", cursive;
    text-align: center;
    color: white;
    margin-bottom: 20px;
}

.input-text {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-row {
    display: flex;
    gap: 20px;
    justify-content: space-between;
}

.form-group {
    display: flex;
    flex-direction: column;
    flex: 1;
}

label {
    color: white;
    margin-bottom: 6px;
    font-size: 20px;
    font-weight: 500;
    text-align: left;
}

input {
    background: #fff;
    border: 2px solid #ccc;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 16px;
    outline: none;
    transition: border-color 0.3s ease;
}

.oder-introduce{
    margin-top: 15px;
    text-align: center;
}
.oder-introduce p{
    
    font-size: 16px;
    color: white;
}
.number-phone{
    color: yellow;
}
.oder-btn{
    background:white;
width: 200px;
display: flex;
justify-content: center;
margin: 20px auto 0;
border-radius: 10px;
font-size: 25px;
}
.oder-btn:hover{
    background: yellow;
}
</style>