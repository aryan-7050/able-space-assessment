'use client';

import { Task } from '../../types';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onUpdate: (id: string, data: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

export default function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
        <p className="text-gray-500 dark:text-gray-400">No tasks yet. Create your first task!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}