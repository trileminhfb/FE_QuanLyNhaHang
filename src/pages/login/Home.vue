<template>
    <div class="bg-blue-200 w-full h-screen flex flex-row justify-center items-center">
        <div class="w-[50vw] h-[50vh] bg-white rounded-[50px] flex flex-row shadow-lg">
            <div
                class="w-[50vw] h-full bg-blue-500 rounded-e-[500px] rounded-s-[100px] flex flex-col justify-center items-center gap-4 text-white">
                <h1 class="text-3xl font-bold ">Hello, Welcome!</h1>
                <p class="text-sm">Don't have an account?</p>
                <button class="rounded-xl bg-blue-500 h-12 w-32 border-2 border-white font-bold" type="button"
                    @click="goRegister">Register</button>
            </div>
            <div
                class="w-[50vw] h-full bg-white rounded-e-[50px] flex flex-col gap-4 justify-center items-center text-black">
                <div class="w-24 h-24 flex justify-center items-center rounded-full overflow-hidden">
                    <img class="object-cover" src="/imageicon/phefood.png" alt="icon quên mật khẩu">
                </div>
                <h1 class="text-3xl font-bold">Login</h1>
                <div class="flex flex-col w-[15vw] h-[5vh]">
                    <div class="relative w-full h-full">
                        <input v-model="email" class="rounded-xl bg-gray-200 p-3 w-[15vw]" type="text" name="email"
                            id="email" placeholder="E-mail">
                        <svg class="absolute top-3 right-2 w-6 h-6 text-gray-800" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div class="flex flex-col w-[15vw] h-[5vh]">
                    <div class="relative w-full h-full">
                        <input v-model="password" :type="showPassword ? 'text' : 'password'"
                            class="rounded-xl bg-gray-200 p-3 w-[15vw]" name="password" id="password"
                            placeholder="Password" />
                        <svg class="absolute top-3 right-2 w-6 h-6 text-black" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                            viewBox="0 0 24 24">
                            <path fill-rule="evenodd"
                                d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <input type="checkbox" id="show-pass" v-model="showPassword" />
                    <label for="show-pass" class="text-sm">Hiển thị mật khẩu</label>
                </div>
                <p class="text-sm hover:text-blue-500 hover:cursor-pointer" @click="goForgotPassword">Forgot Password?
                </p>
                <button class="rounded-xl bg-blue-500 h-12 w-[15vw] text-white font-bold" @click="login"
                    type="button">Login</button>

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"; // Thêm onMounted ở đây
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const showPassword = ref(false);

const email = ref('');
const password = ref('');

function goRegister() {
    router.push({ name: 'register' });
}

function goForgotPassword() {
    router.push({ name: 'forgot-password' });
}

// onMounted(() => {
//     const token = localStorage.getItem("token");
//     console.log("Token trong login:", token);

//     if (token) {
//         router.push({ name: "home" });
//     }
// });


async function login() {
    try {
        const response = await axios.post('http://127.0.0.1:8000/api/admin/users/login', {
            email: email.value,
            password: password.value
        });

        const { token, user } = response.data;

        localStorage.setItem('token', token);

        console.log('Đăng nhập thành công:', user);
        router.push({ name: 'home' });

    } catch (error) {
        console.error('Lỗi đăng nhập:', error.response?.data || error.message);
        alert('Sai Email hoặc mật khẩu!');
    }
}
</script>
