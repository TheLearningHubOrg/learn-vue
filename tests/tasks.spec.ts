import { describe, expect, it } from 'vitest';
import { filterTasks, nextStatus, summarize } from '../src/lib/tasks';
import type { Task } from '../src/types';

const tasks: Task[] = [
  { id: 1, title: 'Write docs', status: 'done', estimate: 1 },
  { id: 2, title: 'Fix login bug', status: 'doing', estimate: 3 },
  { id: 3, title: 'Write tests', status: 'todo', estimate: 2 },
];

describe('filterTasks', () => {
  it('matches the query case-insensitively and ignores surrounding spaces', () => {
    expect(filterTasks(tasks, '  WRITE ', 'all').map((t) => t.id)).toEqual([1, 3]);
  });

  it('combines the query with the status filter', () => {
    expect(filterTasks(tasks, 'write', 'todo').map((t) => t.id)).toEqual([3]);
  });

  it('returns a new array and leaves the input untouched', () => {
    const result = filterTasks(tasks, '', 'all');
    expect(result).toEqual(tasks);
    expect(result).not.toBe(tasks);
  });
});

describe('summarize', () => {
  it('counts done tasks and remaining hours', () => {
    expect(summarize(tasks)).toEqual({ total: 3, done: 1, percentDone: 33, remainingEstimate: 5 });
  });

  it('handles an empty list without dividing by zero', () => {
    expect(summarize([]).percentDone).toBe(0);
  });
});

describe('nextStatus', () => {
  it('cycles todo -> doing -> done -> todo', () => {
    expect(nextStatus('todo')).toBe('doing');
    expect(nextStatus('doing')).toBe('done');
    expect(nextStatus('done')).toBe('todo');
  });
});
