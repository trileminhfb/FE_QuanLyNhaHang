<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="w-full h-12 flex flex-row justify-end pe-5 pb-2">
            <input class="ps-2 w-44 h-10 font-bold text-2xl rounded-lg border-gray-400 border-2" type="text" name="name"
                id="name" placeholder="search">
        </div>
        <div class="w-full h-full border-t border-gray-400 px-2 pt-2">
            <table class="w-full h-[30vw] table-auto font-semibold text-2xl ">
                <thead>
                    <tr class="border-2 border-gray-300">
                        <th>
                            <div class="flex flex-row justify-center items-center gap-2">
                                <div class="flex flex-col hover:cursor-pointer ps-5">
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
                                <p class="text-start w-full">Họ tên</p>
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
                                <p>Ranking</p>
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
                                        src="/imageicon/staff icon.png" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Lê Minh Trí</p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-start items-center p-1">
                                                <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="flex justify-center items-center w-full h-full">
                            <p class="bg-yellow-500 w-fit px-2">Bronze</p>
                        </td>
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
                                        src="/imageicon/staff icon.png" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Lê Minh Trí </p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-end items-center p-1">
                                                <div class="w-6 h-6 bg-green-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="flex justify-center items-center w-full h-full">
                            <p class="bg-gray-300 w-fit px-2">Sliver</p>
                        </td>
                        <td class="text-center">
                            <div class="flex justify-center items-center h-full">
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
                                        src="/imageicon/staff icon.png" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Lê Minh Trí </p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-start items-center p-1">
                                                <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="flex justify-center items-center w-full h-full">
                            <p class="bg-yellow-300 w-fit px-2">Gold</p>
                        </td>
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
                                        src="/imageicon/staff icon.png" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Lê Minh Trí </p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-start items-center p-1">
                                                <div class="w-6 h-6 bg-red-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="flex justify-center items-center w-full h-full">
                            <p class="bg-blue-300 w-fit px-2">Diamond</p>
                        </td>
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
                                        src="/imageicon/staff icon.png" alt="">
                                    <div class="ps-5 flex flex-col gap-5">
                                        <p class="hover:cursor-pointer">Lê Minh Trí </p>
                                        <div class="flex flex-row gap-2 items-center">
                                            <div
                                                class="hover:cursor-pointer w-16 h-8 flex rounded-full border-2 border-black justify-end items-center p-1">
                                                <div class="w-6 h-6 bg-green-500 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td class="flex justify-center items-center w-full h-full">
                            <p class="bg-blue-300 w-fit px-2">Diamond</p>
                        </td>
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