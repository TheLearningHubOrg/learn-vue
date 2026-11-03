<script setup lang="ts">
defineProps<{ title?: string }>();

// defineSlots only adds types; it generates no runtime code.
defineSlots<{
  header?: () => unknown;
  default?: () => unknown;
  footer?: () => unknown;
}>();
</script>

<template>
  <section class="card">
    <header v-if="$slots.header || title" class="card-header">
      <slot name="header">
        <h2>{{ title }}</h2>
      </slot>
    </header>
    <div class="card-body">
      <slot />
    </div>
    <footer v-if="$slots.footer" class="card-footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.card-header h2 {
  font-size: 1.05rem;
}
.card-footer {
  border-top: 1px solid var(--border);
  padding-top: 0.75rem;
}
</style>
