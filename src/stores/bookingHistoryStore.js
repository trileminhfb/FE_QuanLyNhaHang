import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBookingHistoryStore = defineStore('bookingHistory', () => {
  const bookings = ref([]);

  const addBooking = (booking) => {
    bookings.value.push(booking);
    saveToLocalStorage();
  };

  const deleteBooking = (index) => {
    bookings.value.splice(index, 1);
    saveToLocalStorage();
  };

  const updateBookingFoods = (updatedBooking) => {
    const index = bookings.value.findIndex(b => b.id === updatedBooking.id);
    if (index !== -1) {
      bookings.value[index] = { ...bookings.value[index], foods: updatedBooking.foods };
      saveToLocalStorage();
    }
  };

  const loadFromLocalStorage = () => {
    const data = localStorage.getItem('bookingHistory');
    if (data) {
      bookings.value = JSON.parse(data);
    }
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('bookingHistory', JSON.stringify(bookings.value));
  };

  return {
    bookings,
    addBooking,
    deleteBooking,
    updateBookingFoods,
    loadFromLocalStorage,
    saveToLocalStorage,
  };
});