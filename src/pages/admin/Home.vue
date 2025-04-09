<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] mt-[80px] ms-[300px] flex flex-col p-2">
        <div class="flex flex-row gap-2 w-full h-[150px]">
            <div class="h-full w-full bg-gray-300 flex flex-row justify-center items-center">
                <div class="overflow-hidden w-full">
                    <img class="h-32 w-32 overflow-auto object-cover" src="/imageicon/box icon.png" alt="">
                </div>

                <div class="w-full flex flex-col justify-center items-center">
                    <p class="font-bold text-2xl">Tổng sản phẩm</p>
                    <p class="font-semibold text-xl">100</p>
                </div>
            </div>

            <div class="h-full w-full bg-gray-300 flex flex-row justify-center items-center">
                <div class="overflow-hidden w-full">
                    <img class="h-32 w-32 overflow-auto object-cover" src="/imageicon/staff icon.png" alt="">
                </div>

                <div class="w-full flex flex-col justify-center items-center">
                    <p class="font-bold text-2xl">Tổng nhân viên</p>
                    <p class="font-semibold text-xl">100</p>
                </div>
            </div>

            <div class="h-full w-full bg-gray-300 flex flex-row justify-center items-center">
                <div class="overflow-hidden w-full">
                    <img class="h-32 w-32 overflow-auto object-cover" src="/imageicon/cash icon.png" alt="">
                </div>

                <div class="w-full flex flex-col justify-center items-center">
                    <p class="font-bold text-2xl">Tổng doanh thu</p>
                    <p class="font-semibold text-xl">100</p>
                </div>
            </div>
        </div>

        <div class="flex flex-col w-full h-screen mt-4">
            <div class="flex flex-row w-full h-10 items-center gap-2 font-bold text-2xl">
                <p>Tổng doanh thu tháng</p>
                <input class="h-8 w-16 border-2 ps-2" type="number" name="month" id="month" value="1" min="1" max="12">
                <p>Năm</p>
                <input class="h-8 w-28 border-2 ps-2" type="number" name="year" id="year" value="2025" min="1">
                <p>Tổng doanh thu (VNĐ)</p>
                <div class="h-8 w-28 bg-red-500"></div>
            </div>

            <div class="border-2 w-full h-full"></div>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
