import { describe, expect, it } from 'vitest';
import { useTasks } from '../src/composables/useTasks';
import { seedTasks } from '../src/data/seed';

describe('useTasks', () => {
  it('gives every caller independent state', () => {
    const a = useTasks(seedTasks);
    const b = useTasks(seedTasks);
    a.advance(3);
    expect(a.tasks.value.find((t) => t.id === 3)?.status).toBe('doing');
    expect(b.tasks.value.find((t) => t.id === 3)?.status).toBe('todo');
    expect(seedTasks[2].status).toBe('todo');
  });

  it('recomputes visible tasks when the query or status changes', () => {
    const board = useTasks(seedTasks);
    expect(board.visible.value).toHaveLength(4);
    board.query.value = 'defineModel';
    expect(board.visible.value.map((t) => t.id)).toEqual([3]);
    board.query.value = '';
    board.status.value = 'done';
    expect(board.visible.value.map((t) => t.id)).toEqual([1]);
  });

  it('adds trimmed tasks with fresh ids and rejects invalid input', () => {
    const board = useTasks(seedTasks);
    expect(board.add('   ')).toBeNull();
    expect(board.add('Ship it', 0)).toBeNull();
    const task = board.add('  Ship it  ', 2);
    expect(task).toMatchObject({ id: 5, title: 'Ship it', status: 'todo', estimate: 2 });
    expect(board.summary.value.total).toBe(5);
  });

  it('removes tasks and updates the summary', () => {
    const board = useTasks(seedTasks);
    board.remove(1);
    expect(board.summary.value).toMatchObject({ total: 3, done: 0, remainingEstimate: 7 });
  });
});
