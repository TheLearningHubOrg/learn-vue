<script setup lang="ts">
interface Props {
  label: string;
  value: number | string;
  trend?: string;
  variant?: 'primary' | 'success' | 'warning' | 'purple';
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
});

const emit = defineEmits<{
  (e: 'inspect', label: string): void;
}>();
</script>

<template>
  <div class="metric-card" :class="`variant-${props.variant}`">
    <div class="card-header">
      <span class="card-label">{{ props.label }}</span>
      <span v-if="props.trend" class="trend-badge">{{ props.trend }}</span>
    </div>
    <div class="card-value">{{ props.value }}</div>
    <button class="inspect-btn" @click="emit('inspect', props.label)">
      Inspect State 🔍
    </button>
  </div>
</template>

<style scoped>
.metric-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: all 0.25s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
  border-color: rgba(66, 184, 131, 0.4);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}

.variant-primary {
  border-left: 4px solid #42b883;
}

.variant-success {
  border-left: 4px solid #10b981;
}

.variant-warning {
  border-left: 4px solid #f59e0b;
}

.variant-purple {
  border-left: 4px solid #8b5cf6;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-label {
  font-size: 0.875rem;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.trend-badge {
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  background: rgba(66, 184, 131, 0.15);
  color: #42b883;
  border-radius: 9999px;
  font-weight: 600;
}

.card-value {
  font-size: 2rem;
  font-weight: 700;
  color: #f8fafc;
  font-variant-numeric: tabular-nums;
}

.inspect-btn {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #cbd5e1;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  font-size: 0.8125rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.inspect-btn:hover {
  background: #42b883;
  color: #0f172a;
  border-color: #42b883;
}
</style>
