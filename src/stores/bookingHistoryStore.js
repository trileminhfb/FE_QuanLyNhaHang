// stores/bookingHistoryStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useBookingHistoryStore = defineStore('bookingHistory', () => {
  const bookings = ref([]);

  const addBooking = (booking) => {
    bookings.value.push(booking);
  };

  const deleteBooking = (index) => {
    bookings.value.splice(index, 1);
  };

  return {
    bookings,
    addBooking,
    deleteBooking,
  };
});
