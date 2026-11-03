import { beforeEach, describe, expect, it } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { mount } from '@vue/test-utils';
import App from '../src/App.vue';
import { useCounterStore } from '../src/stores/counter';

describe('counter store', () => {
  beforeEach(() => setActivePinia(createPinia()));

  it('exposes state, getters and actions', () => {
    const store = useCounterStore();
    expect(store.count).toBe(42);
    store.increment();
    expect(store.doubleCount).toBe(86);
    expect(store.isEven).toBe(false);
    store.reset();
    expect(store.count).toBe(0);
  });
});

describe('App', () => {
  it('filters the board and adds tasks end to end', async () => {
    const wrapper = mount(App, { global: { plugins: [createPinia()] } });
    expect(wrapper.findAll('li')).toHaveLength(4);

    await wrapper.get('[data-test="query"]').setValue('defineModel');
    expect(wrapper.findAll('li')).toHaveLength(1);

    await wrapper.get('[data-test="query"]').setValue('');
    await wrapper.get('[data-test="title"]').setValue('Deploy the image');
    await wrapper.get('form').trigger('submit');
    expect(wrapper.findAll('li')).toHaveLength(5);
    expect(wrapper.text()).toContain('Deploy the image');
  });

  it('shows the empty slot message when nothing matches', async () => {
    const wrapper = mount(App, { global: { plugins: [createPinia()] } });
    await wrapper.get('[data-test="query"]').setValue('zzz');
    expect(wrapper.text()).toContain('Nothing matches "zzz".');
  });
});
