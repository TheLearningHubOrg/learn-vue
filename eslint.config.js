import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(
  { ignores: ['dist/**', 'coverage/**'] },
  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,
  {
    rules: {
      // Formatting is Prettier's job; keep ESLint on correctness.
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/html-self-closing': 'off',
      // Optional props typed as `x?: T` are undefined by design.
      'vue/require-default-prop': 'off',
    },
  },
  {
    // Tests define small host components inline.
    files: ['tests/**/*.ts'],
    rules: { 'vue/one-component-per-file': 'off' },
  },
);
