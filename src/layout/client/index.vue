<template>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
</template>
<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue';
import '../../assets/css/Home.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

import { onMounted } from 'vue'

onMounted(() => {
    AOS.init()
})
</script>
<style></style>
