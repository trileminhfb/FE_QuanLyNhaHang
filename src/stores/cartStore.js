import { ref, onMounted } from "vue";
import api from "../services/api";
export const cartCount = ref(0);
export const cartItems = ref([]);

export async function fetchCart() {
  const id = localStorage.getItem("table_id") 

  try {
    const response = await api.get(`/client/carts/${id}`);
    const data = response.data;

    if (Array.isArray(data) && data.length > 0) {
      
      cartItems.value = data.map((item) => {
        const food = item.food || {};
        return {
          id: item.id,
          id_food: food.id || item.id_food,
          quantity: item.quantity,
          name: food.name || "Không rõ tên",
          price: food.price || food.newPrice || food.cost || 0,
          image: food.image || "https://via.placeholder.com/60",
        };
      });

      cartCount.value = cartItems.value.reduce(
        (total, item) => total + item.quantity,
        0
      );

      localStorage.setItem("shoppingCart", JSON.stringify(cartItems.value));
    } else {
      console.log(123);

      // console.warn("API trả về giỏ hàng trống → thử dùng localStorage");
      // const localCart = localStorage.getItem("shoppingCart");
      // if (localCart) {
      //   cartItems.value = JSON.parse(localCart);
      //   cartCount.value = cartItems.value.reduce(
      //     (total, item) => total + item.quantity,
      //     0
      //   );
      // }
      cartItems.value = [];
      cartCount.value = 0
    }
  } catch (error) {
    cartItems.value = [];
      cartCount.value = 0
  }
}



export async function addToCart(mon) {
  const tableId = Number(localStorage.getItem("table_id"));
  if (!tableId || isNaN(tableId)) {
    console.error("Không tìm thấy table_id trong localStorage");
    return;
  }

  const newItem = {
    id_food: mon.id,
    id_table: tableId,
    quantity: 1,
    name: mon.name,
    price: mon.price || mon.newPrice || mon.cost,
    image: mon.image,
  };

  try {
    const response = await api.post("/client/carts/create", newItem);

    const existingItem = cartItems.value.find(
      (item) => item.id_food === newItem.id_food
    );

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

    cartCount.value = cartItems.value.reduce(
      (total, item) => total + item.quantity,
      0
    );
    localStorage.setItem("shoppingCart", JSON.stringify(cartItems.value));
  } catch (error) {
    console.error("Không thể thêm vào giỏ hàng", error);
  }
}


export async function clearCart() {
  try {
    await api.delete("/client/carts");
    cartItems.value = [];
    cartCount.value = 0;
    localStorage.removeItem("shoppingCart");
  } catch (error) {
    console.error("Lỗi khi xóa toàn bộ giỏ hàng:", error);
  }
}
onMounted(() => {
  fetchCart();
});

