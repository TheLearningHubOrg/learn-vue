import { describe, expect, it, vi } from 'vitest';
import {
  computed,
  isReactive,
  isRef,
  nextTick,
  reactive,
  ref,
  shallowRef,
  toRefs,
  triggerRef,
  watch,
  watchEffect,
} from 'vue';

describe('reactivity primitives', () => {
  it('computed caches until a dependency changes', () => {
    const count = ref(1);
    const getter = vi.fn(() => count.value * 2);
    const double = computed(getter);

    expect(getter).not.toHaveBeenCalled(); // lazy: nothing runs until read
    expect(double.value).toBe(2);
    expect(double.value).toBe(2);
    expect(getter).toHaveBeenCalledTimes(1); // second read hit the cache

    count.value = 5;
    expect(double.value).toBe(10);
    expect(getter).toHaveBeenCalledTimes(2);
  });

  it('destructuring reactive() loses reactivity, toRefs() keeps it', () => {
    const state = reactive({ count: 0 });
    const { count: plain } = state;
    const { count: linked } = toRefs(state);

    state.count = 3;
    expect(plain).toBe(0);
    expect(isRef(linked)).toBe(true);
    expect(linked.value).toBe(3);
  });

  it('ref() makes nested objects deeply reactive, shallowRef() does not', () => {
    const deep = ref({ nested: { n: 1 } });
    const shallow = shallowRef({ nested: { n: 1 } });
    expect(isReactive(deep.value.nested)).toBe(true);
    expect(isReactive(shallow.value.nested)).toBe(false);
  });

  it('shallowRef ignores nested writes until triggerRef()', () => {
    const list = shallowRef([1, 2, 3]);
    const length = vi.fn(() => list.value.length);
    const stop = watchEffect(() => length(), { flush: 'sync' });
    expect(length).toHaveBeenCalledTimes(1);

    list.value.push(4); // nested mutation: not tracked
    expect(length).toHaveBeenCalledTimes(1);
    triggerRef(list); // force subscribers to re-run
    expect(length).toHaveBeenCalledTimes(2);
    stop();
  });

  it('watch() callbacks are batched and run before the next tick', async () => {
    const count = ref(0);
    const seen: number[] = [];
    const stop = watch(count, (value) => seen.push(value));

    count.value++;
    count.value++;
    count.value++;
    expect(seen).toEqual([]); // nothing yet: the job is queued
    await nextTick();
    expect(seen).toEqual([3]); // one run with the final value
    stop();
  });
});
