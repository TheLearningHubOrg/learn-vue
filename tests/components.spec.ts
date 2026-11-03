import { describe, expect, it } from 'vitest';
import { defineComponent, h, ref } from 'vue';
import { mount } from '@vue/test-utils';
import BaseCard from '../src/components/BaseCard.vue';
import MetricCard from '../src/components/MetricCard.vue';
import TaskFilter from '../src/components/TaskFilter.vue';
import TaskForm from '../src/components/TaskForm.vue';
import TaskList from '../src/components/TaskList.vue';
import ThemeToggle from '../src/components/ThemeToggle.vue';
import { provideTheme } from '../src/theme';
import type { Task } from '../src/types';

const tasks: Task[] = [
  { id: 1, title: 'Alpha', status: 'todo', estimate: 1 },
  { id: 2, title: 'Beta', status: 'done', estimate: 2 },
];

describe('MetricCard', () => {
  it('renders props, applies the default variant and emits inspect', async () => {
    const wrapper = mount(MetricCard, { props: { label: 'Tasks', value: 4 } });
    expect(wrapper.get('[data-test="value"]').text()).toBe('4');
    expect(wrapper.classes()).toContain('metric--primary');

    await wrapper.get('button').trigger('click');
    expect(wrapper.emitted('inspect')).toEqual([['Tasks']]);
  });

  it('re-renders when a destructured prop changes', async () => {
    const wrapper = mount(MetricCard, { props: { label: 'Tasks', value: 1 } });
    await wrapper.setProps({ value: 9 });
    expect(wrapper.get('[data-test="value"]').text()).toBe('9');
  });
});

describe('BaseCard', () => {
  it('renders default, named and fallback slot content', () => {
    const wrapper = mount(BaseCard, {
      props: { title: 'Fallback title' },
      slots: { default: 'Body text', footer: '<button>Save</button>' },
    });
    expect(wrapper.get('h2').text()).toBe('Fallback title');
    expect(wrapper.get('.card-body').text()).toBe('Body text');
    expect(wrapper.find('.card-footer button').exists()).toBe(true);
  });

  it('omits the header and footer when nothing fills them', () => {
    const wrapper = mount(BaseCard, { slots: { default: 'x' } });
    expect(wrapper.find('.card-footer').exists()).toBe(false);
    expect(wrapper.find('.card-header').exists()).toBe(false);
  });
});

describe('TaskFilter (defineModel)', () => {
  it('emits update:query and update:status', async () => {
    const wrapper = mount(TaskFilter, { props: { query: '' } });
    await wrapper.get('[data-test="query"]').setValue('  docs ');
    await wrapper.get('[data-test="status"]').setValue('done');
    expect(wrapper.emitted('update:query')?.at(-1)).toEqual(['docs']);
    expect(wrapper.emitted('update:status')?.at(-1)).toEqual(['done']);
  });

  it('keeps a parent ref in sync through v-model', async () => {
    const query = ref('');
    const Parent = defineComponent({
      setup: () => () =>
        h(TaskFilter, {
          query: query.value,
          'onUpdate:query': (value: string) => (query.value = value),
        }),
    });
    const wrapper = mount(Parent);
    await wrapper.get('[data-test="query"]').setValue('vue');
    expect(query.value).toBe('vue');
  });
});

describe('TaskForm', () => {
  it('emits add with a numeric estimate and resets the fields', async () => {
    const wrapper = mount(TaskForm);
    await wrapper.get('[data-test="title"]').setValue('New task');
    await wrapper.get('[data-test="estimate"]').setValue('3');
    await wrapper.get('form').trigger('submit');
    expect(wrapper.emitted('add')).toEqual([['New task', 3]]);
    expect((wrapper.get('[data-test="title"]').element as HTMLInputElement).value).toBe('');
  });
});

describe('TaskList', () => {
  it('renders fallback rows and emits ids', async () => {
    const wrapper = mount(TaskList, { props: { tasks } });
    expect(wrapper.findAll('li')).toHaveLength(2);
    expect(wrapper.text()).toContain('Done · 2h');

    await wrapper.findAll('button')[0].trigger('click');
    expect(wrapper.emitted('advance')).toEqual([[1]]);
  });

  it('lets the parent render rows through the scoped item slot', () => {
    const wrapper = mount(TaskList, {
      props: { tasks },
      slots: { item: ({ task }: { task: Task }) => h('strong', task.title.toUpperCase()) },
    });
    expect(wrapper.findAll('strong').map((node) => node.text())).toEqual(['ALPHA', 'BETA']);
  });

  it('shows the empty slot for an empty list', () => {
    const wrapper = mount(TaskList, { props: { tasks: [] }, slots: { empty: 'Nothing here' } });
    expect(wrapper.text()).toBe('Nothing here');
  });
});

describe('ThemeToggle (provide / inject)', () => {
  it('reads and toggles the provided theme', async () => {
    const Host = defineComponent({
      setup() {
        provideTheme('dark');
        return () => h(ThemeToggle);
      },
    });
    const wrapper = mount(Host);
    expect(wrapper.text()).toBe('Theme: dark');
    await wrapper.get('button').trigger('click');
    expect(wrapper.text()).toBe('Theme: light');
  });

  it('fails loudly without a provider', () => {
    expect(() => mount(ThemeToggle)).toThrow(/provideTheme/);
  });
});
