<script setup lang="ts">
import type { Task } from '../types';

defineProps<{ tasks: Task[] }>();

const emit = defineEmits<{
  advance: [id: number];
  remove: [id: number];
}>();

// The scoped slot hands each task to the parent, which may render it any way it likes.
defineSlots<{
  item?: (props: { task: Task }) => unknown;
  empty?: () => unknown;
}>();

const labels: Record<Task['status'], string> = {
  todo: 'To do',
  doing: 'In progress',
  done: 'Done',
};
</script>

<template>
  <ul v-if="tasks.length > 0" class="task-list">
    <li v-for="task in tasks" :key="task.id" :class="['task', `task--${task.status}`]">
      <slot name="item" :task="task">
        <span class="task-title">{{ task.title }}</span>
        <span class="task-meta">{{ labels[task.status] }} · {{ task.estimate }}h</span>
      </slot>
      <div class="task-actions">
        <button type="button" @click="emit('advance', task.id)">Next status</button>
        <button type="button" class="danger" @click="emit('remove', task.id)">Remove</button>
      </div>
    </li>
  </ul>
  <p v-else class="empty">
    <slot name="empty">No tasks match.</slot>
  </p>
</template>

<style scoped>
.task-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 8px;
}
.task--done .task-title {
  text-decoration: line-through;
  color: var(--muted);
}
.task-meta {
  margin-left: 0.75rem;
  font-size: 0.8rem;
  color: var(--muted);
}
.task-actions {
  display: flex;
  gap: 0.4rem;
}
.danger {
  color: #f87171;
}
.empty {
  color: var(--muted);
}
</style>
