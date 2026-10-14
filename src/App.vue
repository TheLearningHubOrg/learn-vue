<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCounterStore } from './stores/counter';
import MetricCard from './components/MetricCard.vue';

// 1. Pinia Store Integration
const store = useCounterStore();

// 2. Local Reactive State
const activeTab = ref<'dashboard' | 'reactivity' | 'curriculum'>('dashboard');
const searchQuery = ref('');
const notification = ref<string | null>(null);

// 3. Computed derived values
const statusColor = computed(() => (store.isEven ? '#10b981' : '#f59e0b'));

// 4. Watcher
watch(
  () => store.count,
  (newCount, oldCount) => {
    notification.value = `State Updated: ${oldCount} ➔ ${newCount}`;
    setTimeout(() => {
      notification.value = null;
    }, 2500);
  }
);

function handleInspect(label: string) {
  notification.value = `Inspecting component: ${label} (Pinia count: ${store.count})`;
  setTimeout(() => {
    notification.value = null;
  }, 3000);
}
</script>

<template>
  <div class="learning-app">
    <!-- Header -->
    <header class="app-header">
      <div class="logo-group">
        <div class="vue-badge">Vue 3.5</div>
        <div>
          <h1>Learn Vue 3 Masterclass</h1>
          <p class="subtitle">
            Composition API • Pinia Store • Reactivity Engine • Enterprise Testing
          </p>
        </div>
      </div>

      <nav class="nav-tabs">
        <button
          :class="['nav-btn', { active: activeTab === 'dashboard' }]"
          @click="activeTab = 'dashboard'"
        >
          Interactive App
        </button>
        <button
          :class="['nav-btn', { active: activeTab === 'reactivity' }]"
          @click="activeTab = 'reactivity'"
        >
          Reactivity Inspector
        </button>
        <button
          :class="['nav-btn', { active: activeTab === 'curriculum' }]"
          @click="activeTab = 'curriculum'"
        >
          7-Stage Curriculum
        </button>
      </nav>
    </header>

    <!-- Notification Toast -->
    <transition name="fade">
      <div v-if="notification" class="toast-banner">
        <span>⚡ {{ notification }}</span>
      </div>
    </transition>

    <!-- TAB 1: DASHBOARD -->
    <section v-if="activeTab === 'dashboard'" class="tab-content">
      <div class="metrics-grid">
        <MetricCard
          label="Active Reactive Count"
          :value="store.count"
          trend="+12% today"
          variant="primary"
          @inspect="handleInspect"
        />
        <MetricCard
          label="Derived Computed Value"
          :value="store.doubleCount"
          trend="2x multiplier"
          variant="success"
          @inspect="handleInspect"
        />
        <MetricCard
          label="Parity State"
          :value="store.isEven ? 'EVEN' : 'ODD'"
          variant="warning"
          @inspect="handleInspect"
        />
        <MetricCard
          label="Curriculum Stages"
          value="7 Stages"
          trend="40+ Staff Q&As"
          variant="purple"
          @inspect="handleInspect"
        />
      </div>

      <div class="interactive-panel">
        <div class="panel-card">
          <h2>Pinia Reactive Counter Controller</h2>
          <p class="panel-desc">
            Directly mutate state via actions with automatic dependency tracking:
          </p>
          <div class="controls-row">
            <button class="action-btn inc" @click="store.increment()">
              + Increment
            </button>
            <button class="action-btn dec" @click="store.decrement()">
              - Decrement
            </button>
            <button class="action-btn reset" @click="store.reset()">
              Reset State
            </button>
          </div>
          <div class="state-preview">
            <code>Count: {{ store.count }} | Parity: <span :style="{ color: statusColor }">{{ store.isEven ? 'EVEN' : 'ODD' }}</span></code>
          </div>
        </div>
      </div>
    </section>

    <!-- TAB 2: REACTIVITY INSPECTOR -->
    <section v-if="activeTab === 'reactivity'" class="tab-content">
      <div class="panel-card">
        <h2>Reactivity Engine Internals (Proxy vs Getter/Setter)</h2>
        <div class="code-box">
          <pre><code>// Vue 3 Composition API Pattern
import { ref, computed, watchEffect } from 'vue';

const count = ref({{ store.count }});
const double = computed(() => count.value * 2); // Result: {{ store.doubleCount }}

// Active Subscribers:
// 1. MetricCard Component
// 2. Notification Toast Watcher
// 3. Parity Computed Signal</code></pre>
        </div>
      </div>
    </section>

    <!-- TAB 3: CURRICULUM -->
    <section v-if="activeTab === 'curriculum'" class="tab-content">
      <div class="panel-card">
        <h2>7-Stage Pedagogical Roadmap</h2>
        <ul class="roadmap-list">
          <li><strong>Stage 1:</strong> Single-File Component Anatomy & Options vs Composition</li>
          <li><strong>Stage 2:</strong> Reactivity Engine Deep Dive (ref, reactive, watchEffect)</li>
          <li><strong>Stage 3:</strong> Component Architecture, Typed Props, Emits & defineModel</li>
          <li><strong>Stage 4:</strong> Production Composables Engineering & Async State</li>
          <li><strong>Stage 5:</strong> Enterprise State Management with Pinia & Vue Router 4</li>
          <li><strong>Stage 6:</strong> Compiler Optimizations, Teleport, Suspense & SSR</li>
          <li><strong>Stage 7:</strong> Staff Vue Architect Interview Handbook & Cheatsheet</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.learning-app {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.vue-badge {
  background: #42b883;
  color: #0f172a;
  font-weight: 800;
  padding: 0.5rem 0.875rem;
  border-radius: 10px;
  font-size: 1.125rem;
}

h1 {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.subtitle {
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 0.25rem;
}

.nav-tabs {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  padding: 0.375rem;
  border-radius: 10px;
}

.nav-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-btn:hover {
  color: #f8fafc;
}

.nav-btn.active {
  background: #42b883;
  color: #0f172a;
  font-weight: 600;
}

.toast-banner {
  background: rgba(66, 184, 131, 0.15);
  border: 1px solid #42b883;
  color: #42b883;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.875rem;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.panel-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 2rem;
}

.panel-desc {
  color: #94a3b8;
  margin: 0.5rem 0 1.5rem;
}

.controls-row {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.action-btn.inc {
  background: #42b883;
  color: #0f172a;
}

.action-btn.dec {
  background: rgba(255, 255, 255, 0.1);
  color: #f8fafc;
}

.action-btn.reset {
  background: rgba(239, 68, 68, 0.2);
  color: #f87171;
  border: 1px solid rgba(239, 68, 68, 0.4);
}

.action-btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.state-preview {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  font-family: monospace;
}

.code-box {
  background: #020617;
  padding: 1.5rem;
  border-radius: 8px;
  margin-top: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

pre {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  color: #38bdf8;
}

.roadmap-list {
  margin-top: 1rem;
  padding-left: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  color: #cbd5e1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
