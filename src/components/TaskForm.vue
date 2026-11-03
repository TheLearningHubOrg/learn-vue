<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  add: [title: string, estimate: number];
}>();

const title = ref('');
const estimate = ref(1);

function submit() {
  if (title.value.trim() === '') return;
  emit('add', title.value, estimate.value);
  title.value = '';
  estimate.value = 1;
}
</script>

<template>
  <form class="task-form" @submit.prevent="submit">
    <label>
      Title
      <input v-model="title" required data-test="title" />
    </label>
    <label>
      Hours
      <input v-model.number="estimate" type="number" min="1" step="1" data-test="estimate" />
    </label>
    <button type="submit">Add task</button>
  </form>
</template>

<style scoped>
.task-form {
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
  flex-wrap: wrap;
}
label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: var(--muted);
}
input[type='number'] {
  width: 5rem;
}
</style>
