<script setup lang="ts">
import type { StatusFilter } from '../types';

// Two independent v-model bindings: v-model:query and v-model:status.
const query = defineModel<string>('query', { required: true });
const status = defineModel<StatusFilter>('status', { default: 'all' });

const options: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'todo', label: 'To do' },
  { value: 'doing', label: 'In progress' },
  { value: 'done', label: 'Done' },
];
</script>

<template>
  <div class="filter" role="search">
    <label>
      <span class="sr-only">Search tasks</span>
      <input v-model.trim="query" type="search" placeholder="Search tasks" data-test="query" />
    </label>
    <label>
      <span class="sr-only">Status</span>
      <select v-model="status" data-test="status">
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </label>
  </div>
</template>

<style scoped>
.filter {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
input {
  flex: 1;
  min-width: 12rem;
}
</style>
