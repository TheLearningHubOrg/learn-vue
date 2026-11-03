import { computed, ref } from 'vue';
import { filterTasks, nextStatus, summarize } from '../lib/tasks';
import type { StatusFilter, Task } from '../types';

/**
 * Feature state for the task board. Every call creates independent state,
 * which is what separates a composable from a global store.
 */
export function useTasks(initial: readonly Task[] = []) {
  // Copy the seed so two boards never share the same objects.
  const tasks = ref<Task[]>(initial.map((task) => ({ ...task })));
  const query = ref('');
  const status = ref<StatusFilter>('all');
  let nextId = initial.reduce((max, task) => Math.max(max, task.id), 0) + 1;

  const visible = computed(() => filterTasks(tasks.value, query.value, status.value));
  const summary = computed(() => summarize(tasks.value));

  function add(title: string, estimate = 1): Task | null {
    const clean = title.trim();
    if (clean === '' || !Number.isFinite(estimate) || estimate <= 0) return null;
    const task: Task = { id: nextId++, title: clean, status: 'todo', estimate };
    tasks.value.push(task);
    return task;
  }

  function advance(id: number): void {
    const task = tasks.value.find((item) => item.id === id);
    if (task) task.status = nextStatus(task.status);
  }

  function remove(id: number): void {
    tasks.value = tasks.value.filter((item) => item.id !== id);
  }

  return { tasks, query, status, visible, summary, add, advance, remove };
}
