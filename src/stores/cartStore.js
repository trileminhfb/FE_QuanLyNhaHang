import { ref, watch } from 'vue';

export const cartCount = ref(0);
export const cartItems = ref([]);

const savedCart = JSON.parse(localStorage.getItem('cartItems'));
if (savedCart && Array.isArray(savedCart)) {
  cartItems.value = savedCart;
  cartCount.value = savedCart.reduce((total, item) => total + item.soLuong, 0);
}

//  Hàm thêm vào giỏ
export function addToCart(mon) {
  const index = cartItems.value.findIndex(item => item.id === mon.id);
  if (index !== -1) {
    cartItems.value[index].soLuong += 1;
  } else {
    cartItems.value.push({ ...mon, soLuong: 1, gia: mon.gia });

  }

  cartCount.value++;
}

//  Theo dõi thay đổi giỏ hàng và lưu vào localStorage
watch(cartItems, (newCart) => {
  localStorage.setItem('cartItems', JSON.stringify(newCart));
}, { deep: true });
