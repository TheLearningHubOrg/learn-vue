// tests/vue.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';

test('Vue 3 Reactivity Engine Primitives Simulation', async (t) => {
  await t.test('simulates ref() getter and setter dependency trigger', () => {
    function createRef(initialVal) {
      let _val = initialVal;
      let subscribers = 0;
      return {
        get value() {
          return _val;
        },
        set value(newVal) {
          _val = newVal;
          subscribers++;
        },
        get subscribers() {
          return subscribers;
        }
      };
    }

    const count = createRef(10);
    assert.equal(count.value, 10);
    count.value = 25;
    assert.equal(count.value, 25);
    assert.equal(count.subscribers, 1);
  });

  await t.test('simulates computed dirty checking and cache invalidation', () => {
    let dirty = true;
    let cachedVal = null;
    let computeRuns = 0;

    function evaluateComputed(getter) {
      if (dirty) {
        cachedVal = getter();
        computeRuns++;
        dirty = false;
      }
      return cachedVal;
    }

    const getter = () => 42 * 2;
    assert.equal(evaluateComputed(getter), 84);
    assert.equal(evaluateComputed(getter), 84);
    assert.equal(computeRuns, 1); // Cached!

    dirty = true; // State changed
    assert.equal(evaluateComputed(getter), 84);
    assert.equal(computeRuns, 2); // Re-computed!
  });
});

test('Vue Patch Flag Bitwise Masks', async (t) => {
  await t.test('verifies patch flag bitwise calculations', () => {
    const TEXT = 1;
    const CLASS = 2;
    const STYLE = 4;
    const PROPS = 8;

    const dynamicElement = TEXT | CLASS; // Has dynamic text and dynamic class
    assert.equal((dynamicElement & TEXT) !== 0, true);
    assert.equal((dynamicElement & CLASS) !== 0, true);
    assert.equal((dynamicElement & STYLE) !== 0, false);
    assert.equal((dynamicElement & PROPS) !== 0, false);
  });
});
