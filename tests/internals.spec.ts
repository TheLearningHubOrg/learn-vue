import { describe, expect, it } from 'vitest';
import { computed, ref, watchEffect } from 'vue';

describe('reactivity internals', () => {
  it('skips subscribers when a computed value does not change', () => {
    const n = ref(1);
    const isOdd = computed(() => n.value % 2 === 1);
    let runs = 0;
    const stop = watchEffect(
      () => {
        void isOdd.value;
        runs++;
      },
      { flush: 'sync' },
    );

    n.value = 3; // isOdd re-evaluates to true again
    expect(runs).toBe(1); // the effect did not run a second time
    n.value = 4; // now false
    expect(runs).toBe(2);
    stop();
  });

  it('drops dependencies of a branch that is no longer taken', () => {
    const showDetails = ref(true);
    const details = ref('a');
    let runs = 0;
    const stop = watchEffect(
      () => {
        runs++;
        if (showDetails.value) void details.value;
      },
      { flush: 'sync' },
    );

    showDetails.value = false; // run 2: details not read this time
    details.value = 'b'; // no longer a dependency
    expect(runs).toBe(2);
    stop();
  });
});
