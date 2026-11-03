import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

// Setup store: state is ref(), getters are computed(), actions are functions.
export const useCounterStore = defineStore('counter', () => {
  const count = ref(42);

  const doubleCount = computed(() => count.value * 2);
  const isEven = computed(() => count.value % 2 === 0);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  // Setup stores have no built-in $reset(), so the store defines its own.
  function reset() {
    count.value = 0;
  }

  return { count, doubleCount, isEven, increment, decrement, reset };
});
