```vue
<template>
  <footer class="footer">
    <div class="container">
      <div class="col-left">
        <img src="/imageicon/logo.png" alt="Logo" class="logo">
        <p>Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, mang lại cho khách hàng những trải nghiệm tuyệt vời nhất. Các món ăn với công thức độc quyền sẽ mang lại hương vị mới mẻ cho thực khách. Dola Restaurant xin chân thành cảm ơn.</p>
        <strong>Cửa hàng chính</strong>
      </div>

      <div class="col-right">
        <div class="instruct">
          <h3>Phương thức thanh toán</h3>
          <ul>
            <li>Thanh toán qua thẻ tín dụng</li>
            <li>Thanh toán qua ví điện tử</li>
            <li>Thanh toán khi nhận hàng</li>
          </ul>
        </div>
        <div class="policy">
          <h3>Chính sách</h3>
          <ul>
            <li>Chính sách thành viên</li>
            <li>Chính sách thanh toán</li>
            <li>Hướng dẫn mua hàng</li>
          </ul>
        </div>
        <div class="social-network">
          <h3>Mạng xã hội</h3>
          <div class="social-links">
            <a href="https://www.facebook.com" target="_blank" class="social-icon facebook">
              <i class="fa-brands fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" class="social-icon instagram">
              <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="https://twitter.com" target="_blank" class="social-icon twitter">
              <i class="fa-brands fa-twitter"></i>
            </a>
          </div>
          <h3>Hình thức thanh toán</h3>
          <ul class="payment">
            <li>
              <img src="/imageicon/payment_1.png" alt="Payment Method 1">
            </li>
            <li>
              <img src="/imageicon/payment_2.png" alt="Payment Method 2">
            </li>
            <li>
              <img src="/imageicon/payment_3.png" alt="Payment Method 3">
            </li>
          </ul>
        </div>
      </div>
    </div>

    <p class="footer-text">© 2025 Công ty của bạn. Mọi quyền được bảo lưu.</p>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 40px 0;
  font-family: Arial, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20px;
}

.col-left {
  flex: 1;
  min-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
}

.col-left .logo {
  width: 200px;
  height: auto;
  margin-bottom: 20px;
}

.col-left p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.col-right {
  flex: 2;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.instruct,
.policy,
.social-network {
  flex: 1;
  min-width: 200px;
  text-align: left;
}

h3 {
  font-size: 20px;
  margin-bottom: 15px;
  font-weight: bold;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
  font-size: 14px;
}

.payment {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.payment li img {
  width: 50px;
  height: auto;
  object-fit: contain;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.social-icon {
  font-size: 30px;
  transition: transform 0.3s ease;
  color: #fff;
}

.social-icon:hover {
  transform: scale(1.1);
}

.social-icon.facebook {
  color: #3b5998;
}

.social-icon.instagram {
  color: #e4405f;
}

.social-icon.twitter {
  color: #1da1f2;
}

.footer-text {
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
  padding: 10px 0;
  border-top: 1px solid #555;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: center;
  }

  .col-left,
  .col-right {
    width: 100%;
    padding: 15px;
    align-items: center;
    text-align: center;
  }

  .col-left .logo {
    width: 150px;
  }

  .col-left p {
    font-size: 14px;
  }

  .col-right {
    flex-direction: column;
    align-items: center;
  }

  .instruct,
  .policy,
  .social-network {
    text-align: center;
  }

  .payment {
    justify-content: center;
  }

  .payment li img {
    width: 40px;
  }

  .social-links {
    justify-content: center;
  }

  h3 {
    font-size: 18px;
  }

  ul li {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .col-left .logo {
    width: 120px;
  }

  .col-left p {
    font-size: 12px;
  }

  h3 {
    font-size: 16px;
  }

  ul li {
    font-size: 12px;
  }

  .payment li img {
    width: 35px;
  }

  .social-icon {
    font-size: 24px;
  }

  .footer-text {
    font-size: 12px;
  }
}
</style>
```