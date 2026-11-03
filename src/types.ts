export type TaskStatus = 'todo' | 'doing' | 'done';

export type StatusFilter = TaskStatus | 'all';

export interface Task {
  id: number;
  title: string;
  status: TaskStatus;
  /** Effort in hours. */
  estimate: number;
}

export interface TaskSummary {
  total: number;
  done: number;
  percentDone: number;
  remainingEstimate: number;
}
