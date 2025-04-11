<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] mt-[80px] ms-[300px] flex flex-col p-2">
        <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2">
            <div
                class="w-44 h-10 font-bold text-2xl rounded-lg border-gray-400 border-2 hover:bg-blue-200 hover:cursor-pointer">
                + Thêm món</div>
        </div>
        <div class="w-full h-full border-t border-gray-400 px-2 pt-2">
            <table class="w-full h-[30vw] table-auto font-semibold text-2xl ">
                <thead>
                    <tr class="border-2 border-gray-300">
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <div class="flex flex-col hover:cursor-pointer">
                                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m5 15 7-7 7 7" />
                                    </svg>
                                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </div>
                                <p>Tên món</p>
                            </div>
                        </th>
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <div class="flex flex-col hover:cursor-pointer">
                                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m5 15 7-7 7 7" />
                                    </svg>
                                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </div>
                                <p>Số lượng đã đặt</p>
                            </div>
                        </th>
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <div class="flex flex-col hover:cursor-pointer">
                                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m5 15 7-7 7 7" />
                                    </svg>
                                    <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </div>
                                <p>Giá</p>
                            </div>
                        </th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="border-2 border-gray-300">
                        <td>
                            <div class="h-full flex flex-row justify-start items-center">
                                <div class="overflow-hidden flex flex-row justify-center items-center">
                                    <img class="hover:cursor-pointer overflow-auto object-cover h-32 w-24"
                                        src="./src/img/download.jpg" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-start items-center p-1">
                                                <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                                            </div>
                                            <svg class="hover:cursor-pointer w-6 h-6 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-width="2"
                                                    d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">65413</td>
                        <td class="text-center">400.000 VNĐ</td>
                        <td class="text-center">
                            <div class="flex justify-center items-center h-full ">
                                <div
                                    class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                    <svg class="w-full h-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                            d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                    </svg>
                                    <div
                                        class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chi tiết</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chỉnh sửa</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Xoá</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="border-2 border-gray-300">
                        <td>
                            <div class="h-full flex flex-row justify-start items-center">
                                <div class="overflow-hidden flex flex-row justify-center items-center">
                                    <img class="hover:cursor-pointer overflow-auto object-cover h-32 w-24"
                                        src="./src/img/download.jpg" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-end items-center p-1">
                                                <div class="w-6 h-6 bg-green-500 rounded-full"></div>
                                            </div>
                                            <svg class="hover:cursor-pointer w-6 h-6 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-width="2"
                                                    d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">65413</td>
                        <td class="text-center">400.000 VNĐ</td>
                        <td class="text-center">
                            <div class="flex justify-center items-center h-full ">
                                <div
                                    class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                    <svg class="w-full h-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                            d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                    </svg>
                                    <div
                                        class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chi tiết</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chỉnh sửa</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Xoá</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="border-2 border-gray-300">
                        <td>
                            <div class="h-full flex flex-row justify-start items-center">
                                <div class="overflow-hidden flex flex-row justify-center items-center">
                                    <img class="hover:cursor-pointer overflow-auto object-cover h-32 w-24"
                                        src="./src/img/download.jpg" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-start items-center p-1">
                                                <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                                            </div>
                                            <svg class="hover:cursor-pointer w-6 h-6 text-yellow-500" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">65413</td>
                        <td class="text-center">400.000 VNĐ</td>
                        <td class="text-center">
                            <div class="flex justify-center items-center h-full ">
                                <div
                                    class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                    <svg class="w-full h-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                            d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                    </svg>
                                    <div
                                        class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chi tiết</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chỉnh sửa</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Xoá</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="border-2 border-gray-300">
                        <td>
                            <div class="h-full flex flex-row justify-start items-center">
                                <div class="overflow-hidden flex flex-row justify-center items-center">
                                    <img class="hover:cursor-pointer overflow-auto object-cover h-32 w-24"
                                        src="./src/img/download.jpg" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-start items-center p-1">
                                                <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                                            </div>
                                            <svg class="hover:cursor-pointer w-6 h-6 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-width="2"
                                                    d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">65413</td>
                        <td class="text-center">400.000 VNĐ</td>
                        <td class="text-center">
                            <div class="flex justify-center items-center h-full ">
                                <div
                                    class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                    <svg class="w-full h-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                            d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                    </svg>
                                    <div
                                        class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chi tiết</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chỉnh sửa</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Xoá</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="border-2 border-gray-300">
                        <td>
                            <div class="h-full flex flex-row justify-start items-center">
                                <div class="overflow-hidden flex flex-row justify-center items-center">
                                    <img class="hover:cursor-pointer overflow-auto object-cover h-32 w-24"
                                        src="./src/img/download.jpg" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Hamberger thịt nướng bơ tỏi hấp xả các thứ</p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-end items-center p-1">
                                                <div class="w-6 h-6 bg-green-500 rounded-full"></div>
                                            </div>
                                            <svg class="hover:cursor-pointer w-6 h-6 text-yellow-500" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                                fill="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="text-center">65413</td>
                        <td class="text-center">400.000 VNĐ</td>
                        <td class="text-center">
                            <div class="flex justify-center items-center h-full ">
                                <div
                                    class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                    <svg class="w-full h-full" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                        width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                            d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                    </svg>
                                    <div
                                        class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chi tiết</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Chỉnh sửa</p>
                                        <p class="hover:bg-gray-500 text-start w-full h-full">Xoá</p>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="w-full h-24 flex flex-row justify-center items-center gap-2">
                <div
                    class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 hover:cursor-pointer">
                    <p class="font-semibold text-2xl"> &lt;&lt; </p>
                </div>
                <div
                    class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 hover:cursor-pointer">
                    <p class="font-semibold text-2xl">&lt;</p>
                </div>
                <div
                    class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 hover:cursor-pointer">
                    <p class="font-semibold text-2xl">1</p>
                </div>
                <div class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center ">
                    <p class="font-semibold text-2xl">...</p>
                </div>
                <div
                    class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 hover:cursor-pointer">
                    <p class="font-semibold text-2xl">6</p>
                </div>
                <div
                    class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 hover:cursor-pointer">
                    <p class="font-semibold text-2xl">7</p>
                </div>
                <div
                    class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 hover:cursor-pointer">
                    <p class="font-semibold text-2xl">8</p>
                </div>
                <div class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
                    <p class="font-semibold text-2xl">...</p>
                </div>
                <div
                    class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 hover:cursor-pointer">
                    <p class="font-semibold text-2xl">16</p>
                </div>
                <div
                    class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 hover:cursor-pointer">
                    <p class="font-semibold text-2xl">&gt;</p>
                </div>
                <div
                    class="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-blue-200 hover:cursor-pointer">
                    <p class="font-semibold text-2xl">&gt;&gt;</p>
                </div>
            </div>

        </div>
    </div>
</template>
<script>
export default {

}
</script>
