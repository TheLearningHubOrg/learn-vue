import type { Task } from '../types';

export const seedTasks: Task[] = [
  { id: 1, title: 'Read the SFC anatomy section', status: 'done', estimate: 1 },
  { id: 2, title: 'Build a component with typed props', status: 'doing', estimate: 2 },
  { id: 3, title: 'Two-way bind a filter with defineModel', status: 'todo', estimate: 2 },
  { id: 4, title: 'Trace a computed through the reactivity graph', status: 'todo', estimate: 3 },
];
