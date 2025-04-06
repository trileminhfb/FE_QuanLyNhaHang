<template>
     <footer class="footer">
    <div class="container">
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
        <a href="https://www.linkedin.com" target="_blank" class="social-icon linkedin">
          <i class="fa-brands fa-linkedin"></i>
        </a>
      </div>
      <p class="footer-text">© 2025 Công ty của bạn. Mọi quyền được bảo lưu.</p>
    </div>
  </footer>
</template>
<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 20px 0;
  text-align: center;
  font-family: Arial, sans-serif;
}

.footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.social-links {
  margin-bottom: 20px;
}

.social-icon {
  font-size: 30px;
  margin: 0 15px;
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

.social-icon.linkedin {
  color: #0077b5;
}

.footer-text {
  font-size: 14px;
  margin-top: 10px;
}
</style>