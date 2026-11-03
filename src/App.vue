<script setup lang="ts">
import { ref, watch } from 'vue';
import BaseCard from './components/BaseCard.vue';
import MetricCard from './components/MetricCard.vue';
import TaskFilter from './components/TaskFilter.vue';
import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import ThemeToggle from './components/ThemeToggle.vue';
import { useTasks } from './composables/useTasks';
import { seedTasks } from './data/seed';
import { useCounterStore } from './stores/counter';
import { provideTheme } from './theme';

const { theme } = provideTheme('dark');
// Destructure the refs so the template can use them without .value.
const { query, status, visible, summary, add, advance, remove } = useTasks(seedTasks);
const counter = useCounterStore();

const notice = ref<string | null>(null);
let timer: ReturnType<typeof setTimeout> | undefined;

function flash(message: string) {
  notice.value = message;
  clearTimeout(timer);
  timer = setTimeout(() => (notice.value = null), 2500);
}

// watch() with a getter source: runs only when the done count changes.
watch(
  () => summary.value.done,
  (done, previous) => {
    if (done > previous) flash(`Task finished: ${done} done`);
  },
);
</script>

<template>
  <div class="app" :data-theme="theme">
    <header class="app-header">
      <h1>Learn Vue starter</h1>
      <ThemeToggle />
    </header>

    <p v-if="notice" class="notice" role="status">{{ notice }}</p>

    <div class="metrics">
      <MetricCard
        label="Tasks"
        :value="summary.total"
        @inspect="(label) => flash(`Inspecting ${label}`)"
      />
      <MetricCard
        label="Done"
        :value="`${summary.percentDone}%`"
        variant="success"
        @inspect="(label) => flash(`Inspecting ${label}`)"
      />
      <MetricCard
        label="Hours left"
        :value="summary.remainingEstimate"
        variant="warning"
        @inspect="(label) => flash(`Inspecting ${label}`)"
      />
    </div>

    <BaseCard title="Task board">
      <TaskFilter v-model:query="query" v-model:status="status" />
      <TaskList :tasks="visible" @advance="advance" @remove="remove">
        <template #empty>Nothing matches "{{ query }}".</template>
      </TaskList>
      <template #footer>
        <TaskForm @add="add" />
      </template>
    </BaseCard>

    <BaseCard title="Pinia counter">
      <p>
        Count {{ counter.count }}, double {{ counter.doubleCount }},
        {{ counter.isEven ? 'even' : 'odd' }}
      </p>
      <template #footer>
        <div class="row">
          <button type="button" @click="counter.increment()">+1</button>
          <button type="button" @click="counter.decrement()">-1</button>
          <button type="button" @click="counter.reset()">Reset</button>
        </div>
      </template>
    </BaseCard>
  </div>
</template>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: var(--text);
}
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}
.notice {
  border: 1px solid #42b883;
  color: #42b883;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
}
.row {
  display: flex;
  gap: 0.5rem;
}
</style>
