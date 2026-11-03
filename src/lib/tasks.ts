import type { StatusFilter, Task, TaskStatus, TaskSummary } from '../types';

/** Pure function: no Vue imports, so it is trivial to unit test. */
export function filterTasks(tasks: readonly Task[], query: string, status: StatusFilter): Task[] {
  const needle = query.trim().toLowerCase();
  return tasks.filter(
    (task) =>
      (status === 'all' || task.status === status) &&
      (needle === '' || task.title.toLowerCase().includes(needle)),
  );
}

export function summarize(tasks: readonly Task[]): TaskSummary {
  const done = tasks.filter((task) => task.status === 'done').length;
  const remainingEstimate = tasks
    .filter((task) => task.status !== 'done')
    .reduce((sum, task) => sum + task.estimate, 0);
  return {
    total: tasks.length,
    done,
    percentDone: tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100),
    remainingEstimate,
  };
}

const ORDER: Record<TaskStatus, TaskStatus> = { todo: 'doing', doing: 'done', done: 'todo' };

export function nextStatus(status: TaskStatus): TaskStatus {
  return ORDER[status];
}
