<script setup lang="ts">
// Vue 3.5+: destructured props stay reactive, and defaults use plain JS syntax.
const {
  label,
  value,
  hint,
  variant = 'primary',
} = defineProps<{
  label: string;
  value: number | string;
  hint?: string;
  variant?: 'primary' | 'success' | 'warning';
}>();

const emit = defineEmits<{
  inspect: [label: string];
}>();
</script>

<template>
  <article class="metric" :class="`metric--${variant}`">
    <div class="metric-head">
      <span class="metric-label">{{ label }}</span>
      <span v-if="hint" class="metric-hint">{{ hint }}</span>
    </div>
    <div class="metric-value" data-test="value">{{ value }}</div>
    <button type="button" class="metric-inspect" @click="emit('inspect', label)">Inspect</button>
  </article>
</template>

<style scoped>
.metric {
  background: var(--surface);
  border: 1px solid var(--border);
  border-left-width: 4px;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.metric--primary {
  border-left-color: #42b883;
}
.metric--success {
  border-left-color: #10b981;
}
.metric--warning {
  border-left-color: #f59e0b;
}
.metric-head {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
}
.metric-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--muted);
}
.metric-hint {
  font-size: 0.75rem;
  color: #42b883;
}
.metric-value {
  font-size: 1.75rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.metric-inspect {
  align-self: flex-start;
}
</style>
