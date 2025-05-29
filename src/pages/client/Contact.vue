<template>
    <div class="web-contact">
        <div class="container">
            <div class="col-left">
                <div class="contact">
                    <h3><strong>Nhà hàng PHÊ FOOD</strong></h3>
                    <div class="info-contact">
                        <p>Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, mang lại cho khách
                            hàng những trải nghiệm tuyệt vời nhất. Các món ăn với công thức độc quyền sẽ mang lại hương
                            vị mới mẻ cho thực khách. Dola Restaurant xin chân thành cảm ơn.</p>
                        <p><strong>Cửa hàng chính</strong></p>
                        <ul>
                            <li>
                                <p>Địa chỉ: 52 Giáp Văn Cương</p>
                            </li>
                            <li>
                                <p>Điện thoại: <strong style="color: yellow;">1900 6750</strong></p>
                            </li>
                            <li>
                                <p>Email: <strong style="color: yellow;">tranvankhanh23122003@gmail.com</strong></p>
                            </li>
                        </ul>
                        <Button class="btn-seeStore">Hệ Thống cửa hàng</Button>
                    </div>
                </div>
            </div>
            <div class="col-right">
                <div class="form-contact">
                    <h3><strong>Liên Hệ Với Chúng Tôi</strong></h3>
                    <div class="group-contact">
                        <input class="input-name" type="text" placeholder="Họ và tên">
                        <input class="input-email" type="text" placeholder="Email">
                        <input class="input-phone" type="text" placeholder="Số điện thoại">
                        <input class="input-content" type="text" placeholder="Nội dung">
                        <Button class="btn-sendInfo">Gửi Thông Tin</Button>
                    </div>
                </div>
            </div>
        </div>
        <div class="map">
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.66313210352!2d108.15967927460028!3d16.082961439071273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218c30c993543%3A0xec01cc42d8352cff!2zNTIgR2nDoXAgVsSDbiBDxrDGoW5nLCBIb8OgIE1pbmgsIExpw6puIENoaeG7g3UsIMSQw6AgTuG6tW5nIDU1MDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1744623014700!5m2!1svi!2s"
                style="border:0;" allowfullscreen="true" loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
    </div>
</template>

<style scoped>
.web-contact {
    background: #143b36;
    width: 100%;
    min-height: 100vh;
    padding: 1.5rem;
    box-sizing: border-box;
}

.container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.5rem;
}

.col-left,
.col-right {
    flex: 1;
    min-width: 300px;
}

.contact,
.form-contact {
    margin: 1.5rem 0;
}

.contact h3,
.form-contact h3 {
    color: white;
    background-color: #d69c52;
    padding: 0.75rem;
    border-radius: 5px;
    font-size: clamp(1.2rem, 4vw, 1.5rem);
    text-align: center;
    margin: 0 auto;
    width: 100%;
    max-width: 600px;
}

.info-contact {
    border: 1px solid red;
    margin-top: 1rem;
    padding: 1rem;
    color: white;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.info-contact ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.info-contact p {
    margin: 0;
}

.group-contact {
    border: 1px solid red;
    margin-top: 1rem;
    padding: 1rem;
    color: white;
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.input-name,
.input-email,
.input-phone,
.input-content {
    width: 100%;
    border-radius: 8px;
    padding: 0.75rem;
    font-size: 0.9rem;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.input-name::placeholder,
.input-email::placeholder,
.input-phone::placeholder,
.input-content::placeholder {
    padding-left: 0.5rem;
    color: #888;
}

.input-content {
    height: auto;
}

.btn-seeStore,
.btn-sendInfo {
    color: #fff;
    background-color: #d69c52;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
    border-radius: 5px;
    box-shadow: 0 3px 6px #a37b44;
    border: none;
    cursor: pointer;
    transition: box-shadow 0.3s ease, background-color 0.3s ease;
    width: 100%;
    max-width: 200px;
}

.btn-seeStore:hover,
.btn-sendInfo:hover {
    background-color: #c98e3b;
    box-shadow: 0 5px 10px #a37b44;
}

.map {
    margin: 1.5rem 0;
    padding: 0 1rem;
    width: 100%;
}

.map iframe {
    width: 100%;
    height: 400px;
    border: 0;
}

/* Media Queries for Responsive Design */
@media (max-width: 768px) {
    .col-left,
    .col-right {
        min-width: unset;
        width: 100%;
    }

    .contact h3,
    .form-contact h3 {
        font-size: 1.2rem;
        max-width: 100%;
    }

    .info-contact,
    .group-contact {
        max-width: 100%;
    }

    .map iframe {
        height: 300px;
    }
}

@media (max-width: 480px) {
    .web-contact {
        padding: 1rem;
    }

    .contact,
    .form-contact {
        margin: 1rem 0;
    }

    .contact h3,
    .form-contact h3 {
        font-size: 1rem;
    }

    .info-contact,
    .group-contact {
        padding: 0.75rem;
        font-size: 0.9rem;
    }

    .input-name,
    .input-email,
    .input-phone,
    .input-content {
        padding: 0.5rem;
        font-size: 0.85rem;
    }

    .input-content {
        height: 80px;
    }

    .btn-seeStore,
    .btn-sendInfo {
        font-size: 0.85rem;
        padding: 0.5rem;
        max-width: 100%;
    }

    .map iframe {
        height: 250px;
    }
}
</style>