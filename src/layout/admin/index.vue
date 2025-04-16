<template>
    <HeaderAdmin></HeaderAdmin>
    <LeftAdmin></LeftAdmin>
    <router-view></router-view>
</template>

<script>
import HeaderAdmin from './headerMenu.vue'
import LeftAdmin from './leftMenu.vue'
export default {

    name: 'app',
    components: {
        HeaderAdmin,
        LeftAdmin
    }
}
</script>