import { ref ,onMounted } from "vue";
import api from "../services/api";
export const cartCount = ref(0);
export const cartItems = ref([]);
export async function fetchCart() {
  try {
    const response = await api.get("/client/carts");
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      cartItems.value = data.map(item => ({
        id: item.id,
        id_food: item.id_food,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        image: item.image,
      }));
      cartCount.value = cartItems.value.reduce((total, item) => total + item.quantity, 0);
      localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
    } else {
      console.warn("API trả về giỏ hàng trống → thử dùng localStorage");
      const localCart = localStorage.getItem('shoppingCart');
      if (localCart) {
        cartItems.value = JSON.parse(localCart);
        cartCount.value = cartItems.value.reduce((total, item) => total + item.quantity, 0);
      }
    }
  } catch (error) {
    console.error("Không thể lấy giỏ hàng từ API:", error);
    const localCart = localStorage.getItem('shoppingCart');
    if (localCart) {
      cartItems.value = JSON.parse(localCart);
      cartCount.value = cartItems.value.reduce((total, item) => total + item.quantity, 0);
    }
  }
}

export async function addToCart(mon) {
  const newItem = {
    id_food: mon.id,
    id_table: 1,
    quantity: 1,
    name: mon.name,
    price: mon.price || mon.newPrice || mon.cost,
    image: mon.image,
  };

  try {
    const response = await api.post("/client/carts/create", newItem);

    // Tìm xem đã có món trong giỏ chưa (theo id_food, không phải id)
    const existingItem = cartItems.value.find(item => item.id_food === newItem.id_food);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.value.push({
        id: response.data.id,
        id_food: newItem.id_food,
        quantity: 1,
        name: newItem.name,
        price: newItem.price,
        image: newItem.image,
      });
    }

    // Cập nhật số lượng tổng
    cartCount.value = cartItems.value.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem('shoppingCart', JSON.stringify(cartItems.value));
  } catch (error) {
    console.error("Không thể thêm vào giỏ hàng", error);
  }
}

export async function clearCart() {
  try {
    await api.delete('/client/carts'); // Xóa toàn bộ giỏ hàng trên server
    cartItems.value = [];
    cartCount.value = 0;
    localStorage.removeItem('shoppingCart');
  } catch (error) {
    console.error("Lỗi khi xóa toàn bộ giỏ hàng:", error);
  }
}
onMounted(() => {
  fetchCart();
});

