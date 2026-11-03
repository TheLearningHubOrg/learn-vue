import { inject, provide, readonly, ref, type InjectionKey, type Ref } from 'vue';

export type Theme = 'light' | 'dark';

export interface ThemeContext {
  theme: Readonly<Ref<Theme>>;
  toggle: () => void;
}

// A Symbol key typed with InjectionKey gives inject() a precise return type.
export const ThemeKey: InjectionKey<ThemeContext> = Symbol('theme');

export function provideTheme(initial: Theme = 'dark'): ThemeContext {
  const theme = ref<Theme>(initial);
  const context: ThemeContext = {
    // Consumers can read the theme but only change it through toggle().
    theme: readonly(theme),
    toggle: () => {
      theme.value = theme.value === 'dark' ? 'light' : 'dark';
    },
  };
  provide(ThemeKey, context);
  return context;
}

export function useTheme(): ThemeContext {
  const context = inject(ThemeKey, null);
  if (!context) {
    throw new Error('useTheme() was called without provideTheme() in an ancestor component');
  }
  return context;
}
