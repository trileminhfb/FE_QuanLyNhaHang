<template>
    <div class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-0 mt-20 ms-[300px] flex flex-col p-2">
        <div class="h-full w-full flex flex-col font-bold">
            <p class="uppercase text-2xl">Lịch sử đặt hàng</p>
            <div class="w-full h-full flex flex-col">
                <div class="w-full h-fit flex flex-row p-2">
                    <div class="flex flex-row flex-1 gap-5">
                        <div class="">Tất cả</div>
                        <div class="">Hoàn thành</div>
                        <div class="">Bị huỷ</div>
                        <div class="">Đang sử dụng</div>
                    </div>
                    <div class="flex flex-row flex-1 gap-2 justify-end">
                        <input class="border border-gray-300" type="date" name="start_date" id="start_date"
                            value="2025-04-18">
                        <p>đến</p>
                        <input class="border border-gray-300" type="date" name="ebd_date" id="ebd_date"
                            value="2025-04-19">
                    </div>
                </div>
                <div class="w-full h-fit border-t border-gray-400 px-2 pt-2">
                    <table class="w-full table-auto font-semibold text-sm ">
                        <thead>
                            <tr class="border-2 border-gray-300">
                                <th>
                                    <div class="flex flex-row justify-center items-center gap-2">
                                        <div class="flex flex-col hover:cursor-pointer ps-5">
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                                            </svg>
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <p class="text-start w-full">ID</p>
                                    </div>
                                </th>

                                <th>
                                    <div class="flex flex-row justify-center items-center gap-2">
                                        <div class="flex flex-col hover:cursor-pointer">
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                                            </svg>
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <p>Trạng thái</p>
                                    </div>
                                </th>
                                <th>
                                    <div class="flex flex-row justify-center items-center gap-2">
                                        <div class="flex flex-col hover:cursor-pointer">
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                                            </svg>
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <p>Bàn</p>
                                    </div>
                                </th>
                                <th>
                                    <div class="flex flex-row justify-center items-center gap-2">
                                        <div class="flex flex-col hover:cursor-pointer">
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                                            </svg>
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <p>Thời gian đặt</p>
                                    </div>
                                </th>
                                <th>
                                    <div class="flex flex-row justify-center items-center gap-2">
                                        <div class="flex flex-col hover:cursor-pointer">
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                                            </svg>
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <p>Thời gian sử dụng</p>
                                    </div>
                                </th>
                                <th>
                                    <div class="flex flex-row justify-center items-center gap-2">
                                        <div class="flex flex-col hover:cursor-pointer">
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m5 15 7-7 7 7" />
                                            </svg>
                                            <svg class="w-4 h-4 text-gray-800" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round"
                                                    stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                            </svg>
                                        </div>
                                        <p>Tổng</p>
                                    </div>
                                </th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="border-2 border-gray-300">
                                <td>
                                    <div class="h-16 flex flex-row justify-start items-center px-2">
                                        <p>#</p>
                                        <p>1213</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <div class="bg-green-500 p-2 ">Hoàn thành
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>2:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>5,500,000</p>
                                        <p>VNĐ</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="flex justify-center items-center h-full ">
                                        <div
                                            class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                            <svg class="w-full h-full" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
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
                                    <div class="h-16 flex flex-row justify-start items-center px-2">
                                        <p>#</p>
                                        <p>1213</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <div class="bg-red-500 p-2 ">Bị huỷ
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>2:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>5,500,000</p>
                                        <p>VNĐ</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="flex justify-center items-center h-full ">
                                        <div
                                            class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                            <svg class="w-full h-full" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
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
                                    <div class="h-16 flex flex-row justify-start items-center px-2">
                                        <p>#</p>
                                        <p>1213</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <div class="bg-yellow-500 p-2 ">Đang sử dụng
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>2:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>5,500,000</p>
                                        <p>VNĐ</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="flex justify-center items-center h-full ">
                                        <div
                                            class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                            <svg class="w-full h-full" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
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
                                    <div class="h-16 flex flex-row justify-start items-center px-2">
                                        <p>#</p>
                                        <p>1213</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <div class="bg-green-500 p-2 ">Hoàn thành
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>2:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>5,500,000</p>
                                        <p>VNĐ</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="flex justify-center items-center h-full ">
                                        <div
                                            class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                            <svg class="w-full h-full" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
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
                                    <div class="h-16 flex flex-row justify-start items-center px-2">
                                        <p>#</p>
                                        <p>1213</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <div class="bg-red-500 p-2 ">Bị huỷ
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>2:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>5,500,000</p>
                                        <p>VNĐ</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="flex justify-center items-center h-full ">
                                        <div
                                            class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                            <svg class="w-full h-full" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
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
                                    <div class="h-16 flex flex-row justify-start items-center px-2">
                                        <p>#</p>
                                        <p>1213</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <div class="bg-green-500 p-2 ">Hoàn thành
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>2:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>5,500,000</p>
                                        <p>VNĐ</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="flex justify-center items-center h-full ">
                                        <div
                                            class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                            <svg class="w-full h-full" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
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
                                    <div class="h-16 flex flex-row justify-start items-center px-2">
                                        <p>#</p>
                                        <p>1213</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <div class="bg-yellow-500 p-2 ">Đang sử dụng
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>2:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>5,500,000</p>
                                        <p>VNĐ</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="flex justify-center items-center h-full ">
                                        <div
                                            class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                            <svg class="w-full h-full" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                                    d="M6 12h.01m6 0h.01m5.99 0h.01" />
                                            </svg>
                                            <div
                                                class="absolute hidden group-hover:flex z-10 right-0 bg-gray-200 border-2 border-gray-400 w-40 flex-col gap-2 rounded-lg p-2 items-start">
                                                <p class="hover:bg-gray-500 text-start w-full h-full">Chi tiết</p>
                                                `` <p class="hover:bg-gray-500 text-start w-full h-full">Chỉnh sửa</p>
                                                <p class="hover:bg-gray-500 text-start w-full h-full">Xoá</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr class="border-2 border-gray-300">
                                <td>
                                    <div class="h-16 flex flex-row justify-start items-center px-2">
                                        <p>#</p>
                                        <p>1213</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <div class="bg-yellow-500 p-2 ">Đang sử dụng
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>12:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>2:22:12</p>
                                    </div>
                                </td>
                                <td>
                                    <div class="h-16 flex justify-center items-center px-2">
                                        <p>5,500,000</p>
                                        <p>VNĐ</p>
                                    </div>
                                </td>
                                <td class="text-center">
                                    <div class="flex justify-center items-center h-full ">
                                        <div
                                            class="w-10 h-10 text-gray-800 hover:bg-gray-400 hover:cursor-pointer rounded-lg relative group">
                                            <svg class="w-full h-full" aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                                viewBox="0 0 24 24">
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
        </div>

    </div>
</template>
<script>
export default {

}
</script>