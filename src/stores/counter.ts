import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCounterStore = defineStore('counter', () => {
  const count = ref(42);
  const title = ref('Vue 3.5 Reactivity Engine');

  const doubleCount = computed(() => count.value * 2);
  const isEven = computed(() => count.value % 2 === 0);

  function increment() {
    count.value++;
  }

  function decrement() {
    count.value--;
  }

  function reset() {
    count.value = 0;
  }

  return {
    count,
    title,
    doubleCount,
    isEven,
    increment,
    decrement,
    reset,
  };
});
