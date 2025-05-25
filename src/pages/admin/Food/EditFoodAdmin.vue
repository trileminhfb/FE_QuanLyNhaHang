<template>
	<div v-if="user.role === 'admin' || user.role === 'manager'"
		class="w-[calc(100vw-300px)] h-[calc(100vh-100px)] fixed z-10 mt-20 ms-[300px] flex flex-col p-2">
		<div class="h-full w-full flex flex-col font-semibold">
			<div class="uppercase font-bold text-2xl">Chỉnh sửa món ăn</div>

			<div class="w-[70vw] h-full flex justify-center items-start text-xl rounded-lg">
				<div class="w-full h-[70vh] flex flex-row">
					<!-- Left Section -->
					<div class="border flex-col gap-2 p-5 flex flex-[2] rounded-s-lg">
						<div class="w-full">
							<p>Tên món ăn</p>
							<input class="border w-full h-12 ps-2" v-model="foodData.name" type="text" />
						</div>

						<div class="w-full">
							<p>Giá món ăn (VNĐ)</p>
							<input class="w-full border h-12 px-2" v-model="foodData.cost" type="number" />
						</div>

						<div class="w-full flex flex-row gap-5">
							<div class="flex flex-row gap-5">
								<p>Best Seller</p>
								<SwitchButton v-model="foodData.best_seller"
									@toggle="(val) => console.log('Trạng thái mới:', val)" />
							</div>
							<div class="flex flex-row gap-5">
								<p>Mở bán</p>
								<SwitchButton v-model="foodData.status"
									@toggle="(val) => console.log('Trạng thái mới:', val)" />
							</div>
						</div>

						<div class="w-full">
							<p>Mô tả món ăn</p>
							<textarea class="w-full border mt-2 h-[300px] px-2 py-2 resize-none"
								v-model="foodData.detail" placeholder="Nhập mô tả món ăn tại đây..."></textarea>
						</div>
					</div>

					<!-- Right Section -->
					<div class="border flex flex-1 gap-2 flex-col items-center p-2 rounded-e-lg">
						<div class="flex flex-col gap-2 justify-center items-center">
							<div class="h-[200px] w-[200px] border rounded-lg overflow-hidden">
								<img class="object-cover w-full h-full" :src="img.preview" alt="Hình ảnh hiển thị" />
							</div>
							<input ref="imageInput" type="file" id="change-picture-input" class="hidden"
								@change="onFileChange" accept="image/*" />
							<label for="change-picture-input"
								class="hover:cursor-pointer hover:bg-slate-500 rounded-md w-full h-12 text-2xl px-5 bg-gray-300 flex items-center justify-center">
								Thay đổi
							</label>

						</div>

						<div class="w-[300px]">
							<p>Kiểu món ăn</p>
							<select class="h-10 w-full border-2 ps-2" v-model="foodData.type.id">
								<option v-for="type in allItemsTypes" :key="type.id" :value="type.id">
									{{ type.name }}
								</option>
							</select>
						</div>

						<div class="w-[300px]">
							<div class="mb-2">Thể loại</div>
							<div v-if="foodData.type.id"
								class="border overflow-y-auto text-sm flex flex-wrap gap-2 p-2 max-h-[200px]">
								<div v-for="category in filteredCategories" :key="category.id"
									class="border hover:cursor-pointer rounded-lg px-2 flex items-center justify-center h-10"
									:class="{
										'bg-green-500 text-white': foodData.categories.includes(
											category.id
										),
									}" @click="toggleCategory(category.id)">
									<p>{{ category.name }}</p>
								</div>
							</div>
							<div v-else class="text-sm text-gray-500">
								Vui lòng chọn kiểu món ăn để hiển thị thể loại.
							</div>
						</div>

						<div class="flex flex-row gap-5">
							<input
								class="bg-green-500 rounded-md w-24 hover:cursor-pointer hover:bg-green-300 hover:text-black text-white h-12 text-2xl"
								type="button" value="Lưu" @click="goSave" />
							<input
								class="bg-red-500 rounded-md w-24 hover:cursor-pointer hover:bg-red-300 hover:text-black h-12 text-white text-2xl"
								type="button" value="Xoá" @click="goDelete" />
							<ConfirmDelete v-if="showConfirm" @confirm="confirmDelete" @cancel="cancelDelete" />
							<input
								class="rounded-md w-24 hover:cursor-pointer hover:bg-gray-300 border border-black h-12 text-2xl"
								type="button" value="Trở lại" @click="goBack" />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<AccessDenied v-if="showToast" />
</template>

<script setup>
import { ref, onMounted, computed, watch, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import api from "../../../services/api";

import SwitchButton from "../../../components/Admin/SwitchButton.vue";
import ConfirmDelete from "../../../components/Admin/ConfirmDelete.vue";
import AccessDenied from "../../../components/Admin/AccessDenied.vue";

const router = useRouter();
const route = useRoute();
const showConfirm = ref(false);
const allItemsCategories = ref([]);
const allItemsTypes = ref([]);
const img = reactive({
	origin: null,
	preview: null
});

const user = ref({
	role: 'N/A',
});
const showToast = ref(false);

async function fetchUserProfile() {
	try {
		const token = localStorage.getItem('auth_token');
		if (!token) {
			throw new Error('No authentication token found.');
		}

		const response = await axios.get('http://127.0.0.1:8000/api/admin/users/profile', {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

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

const foodData = reactive({
	id: null,
	name: "",
	cost: 0,
	best_seller: 0,
	status: 1,
	detail: "",
	image: "",
	type: {
		id: null
	},
	categories: [],
});

const fetchFoods = () => {
	api.get("/admin/foods/" + route.params.id).then((res) => {
		Object.assign(foodData, {
			...res.data,
			categories: res.data.categories.flatMap(category => category.id),
			category_ids: res.data.categories.flatMap(category => category.id)
		});
		Object.assign(img, {
			origin: foodData.image,
			preview: foodData.image
		});
	});
};

const fetchType = async () => {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/admin/types");
		allItemsTypes.value = response.data.data;
	} catch (error) {
		console.error("Lỗi khi lấy dữ liệu types:", error);
	}
};

const fetchCategory = async () => {
	try {
		const response = await axios.get(
			"http://127.0.0.1:8000/api/admin/categories"
		);
		allItemsCategories.value = response.data;
	} catch (error) {
		console.error("Lỗi khi lấy dữ liệu categories:", error);
	}
};

const filteredCategories = computed(() => {
	if (!foodData.type.id) return [];
	return allItemsCategories.value.filter(
		(category) => category.id_type === foodData.type.id
	);
});

watch(
	() => foodData.type.id,
	(newType) => {
		if (newType) {
			foodData.categories = foodData.categories.filter((categoryId) =>
				allItemsCategories.value.some(
					(category) =>
						category.id === categoryId && category.id_type === newType
				)
			);
		} else {
			foodData.categories = [];
		}
	}
);

onMounted(async () => {
	await fetchFoods();
	fetchType();
	fetchCategory();
	fetchUserProfile();
});

watch(() => user.value.role, (newRole) => {
	if (newRole !== 'admin' && newRole !== 'manager') {
		showToast.value = true;

	}
});

function toggleCategory(categoryId) {
	const index = foodData.categories.indexOf(categoryId);
	if (index !== -1) {
		foodData.categories.splice(index, 1);
	} else {
		foodData.categories.push(categoryId);
	}
}

function goBack() {
	router.push({ name: "admin-foods" });
}

function goDelete() {
	showConfirm.value = true;
}

async function confirmDelete() {
	showConfirm.value = false;
	try {
		await axios.delete(`http://127.0.0.1:8000/api/admin/foods/${foodData.id}`);
		alert("Đã xoá thành công!");
		router.push({ name: "admin-foods" });
	} catch (error) {
		console.error("Lỗi khi xoá:", error);
		alert("Không thể xoá món ăn này.");
	}
}

function cancelDelete() {
	showConfirm.value = false;
}

function onFileChange(e) {
	const file = e.target.files[0]
	if (file) {
		foodData.image = file
		img.preview = URL.createObjectURL(file)
	}
}

async function goSave() {
	const formData = new FormData()
	formData.append('_method', 'PUT')
	formData.append('name', foodData.name)
	formData.append('id_type', foodData.type.id)
	// formData.append('bestSeller', foodData.best_seller === 1)
	formData.append('cost', foodData.cost)
	formData.append('detail', foodData.detail)
	formData.append('status', foodData.status)
	formData.append('category_ids', foodData.category_ids)
	formData.append('image', foodData.image)
	formData.append('originImg', img.origin)

	try {
		await axios.post(`http://127.0.0.1:8000/api/admin/foods/${foodData.id}`, formData);
		alert("Cập nhật thành công!");
		router.push({ name: "admin-foods" });
	} catch (error) {
		console.error("Lỗi khi lưu:", error);
		alert("Đã xảy ra lỗi khi lưu dữ liệu.");
	}
}
</script>
