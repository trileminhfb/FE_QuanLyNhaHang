<template>
    <div
        class="h-[calc(100vh-100px)] w-[300px] fixed z-0 mt-20 flex flex-col gap-2 font-bold text-2xl ps-2 pt-2 text-black">
        <!-- Trang chủ (visible for all roles) -->
        <div :class="menuClass('home')" @click="onClickMenu('home')">
            <MenuIcon src="/imageicon/home icon.png" label="Trang chủ" />
        </div>
        <!-- Món ăn (visible for admin and manager) -->
        <div v-if="user.role === 'admin' || user.role === 'manager'" :class="menuClass('admin-foods')"
            @click="onClickMenu('admin-foods')">
            <MenuIcon src="/imageicon/food icon.png" label="Món ăn" />
        </div>
        <!-- Loại (visible for admin and manager) -->
        <div v-if="user.role === 'admin' || user.role === 'manager'" :class="menuClass('admin-categories')"
            @click="onClickMenu('admin-categories')">
            <MenuIcon src="/imageicon/category icon.png" label="Thể loại" />
        </div>
        <!-- Kiểu (visible for admin and manager) -->
        <div v-if="user.role === 'admin' || user.role === 'manager'" :class="menuClass('admin-types')"
            @click="onClickMenu('admin-types')">
            <MenuIcon src="/imageicon/category icon.png" label="Kiểu" />
        </div>
        <!-- Bàn (visible for admin and manager) -->
        <div v-if="user.role === 'admin' || user.role === 'manager'" :class="menuClass('admin-tables')"
            @click="onClickMenu('admin-tables')">
            <MenuIcon src="/imageicon/table icon.png" label="Bàn" />
        </div>
        <!-- Khách hàng (visible for admin and manager) -->
        <div v-if="user.role === 'admin' || user.role === 'manager'" :class="menuClass('admin-customers')"
            @click="onClickMenu('admin-customers')">
            <MenuIcon src="/imageicon/customer icon.png" label="Khách hàng" />
        </div>
        <!-- Rank (visible for admin and manager) -->
        <div v-if="user.role === 'admin' || user.role === 'manager'" :class="menuClass('admin-ranks')"
            @click="onClickMenu('admin-ranks')">
            <MenuIcon src="/imageicon/rank icon.png" label="Rank" fullImage />
        </div>
        <!-- Sale (visible for admin and manager) -->
        <div v-if="user.role === 'admin' || user.role === 'manager'" :class="menuClass('admin-sales')"
            @click="onClickMenu('admin-sales')">
            <MenuIcon src="/imageicon/sale icon.png" label="Sale" />
        </div>
        <!-- Nhân viên (visible only for admin) -->
        <div v-if="user.role === 'admin'" :class="menuClass('admin-users')" @click="onClickMenu('admin-users')">
            <MenuIcon src="/imageicon/staff icon.png" label="Nhân viên" />
        </div>
        <!-- Kho (visible for admin and manager) -->
        <div v-if="user.role === 'admin' || user.role === 'manager'" :class="menuClass('menu-warehouse-admin')"
            @click="onClickMenu('menu-warehouse-admin')">
            <MenuIcon src="/imageicon/warehouse icon.png" label="Kho" />
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import MenuIcon from '../../components/Admin/MenuIcon.vue';
import { ref, computed, onMounted } from 'vue';
import api from '../../services/api';

const router = useRouter();
const route = useRoute();

const user = ref({
    role: 'N/A',
});

async function fetchUserProfile() {
    try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw new Error('No authentication token found.');
        }

        const response = await api.get('/admin/users/profile');
        user.value.role = response.data.data.role; // Only store the role
    } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
        if (error.response?.status === 401) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            router.push({ name: 'admin-login' });
        }
    }
}

const onClickMenu = (link) => {
    router.push({ name: link });
};

function menuClass(name) {
    const current = route.name || 'home';
    return [
        'flex flex-row gap-2 justify-start items-center w-full h-[100px] rounded-lg border-2 ps-2 hover:bg-gray-500 hover:cursor-pointer',
        current === name ? 'bg-red-500 text-white' : 'bg-gray-300 text-black',
    ];
}

onMounted(fetchUserProfile);
</script>