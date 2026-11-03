<script setup lang="ts">
import { useTheme } from '../theme';

const { theme, toggle } = useTheme();
</script>

<template>
  <button type="button" :aria-pressed="theme === 'dark'" @click="toggle">Theme: {{ theme }}</button>
</template>
