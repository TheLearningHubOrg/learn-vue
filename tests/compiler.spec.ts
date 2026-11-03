import { describe, expect, it } from 'vitest';
import { compileTemplate } from 'vue/compiler-sfc';

function compile(source: string): string {
  return compileTemplate({ source, filename: 'Demo.vue', id: 'demo' }).code;
}

describe('template compiler output', () => {
  it('marks dynamic text and class with patch flags', () => {
    const code = compile('<p :class="cls">{{ msg }}</p>');
    expect(code).toContain('/* TEXT, CLASS */');
  });

  it('flags only the dynamic node in a mixed tree', () => {
    const code = compile('<div><p class="static">static</p><span>{{ msg }}</span></div>');
    expect(code).toContain('/* TEXT */');
    expect(code).not.toContain('CLASS');
  });
});
