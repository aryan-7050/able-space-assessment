'use client';

import { Task } from '../../types';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiClock, FiFlag } from 'react-icons/fi';
import { format } from 'date-fns';
import Badge from '../ui/Badge';
interface TaskCardProps {
  task: Task;
  onUpdate: (id: string, data: Partial<Task>) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
  'in-progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
  completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
};

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
          {task.title}
        </h3>
        <div className="flex gap-2 flex-shrink-0 ml-2">
          <button
            onClick={() => onUpdate(task._id!, {})}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiEdit2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(task._id!)}
            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <FiTrash2 className="w-4 h-4 text-red-500" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <Badge className={statusColors[task.status]}>
          {task.status.replace('-', ' ')}
        </Badge>
        <Badge className={priorityColors[task.priority]}>
          <FiFlag className="w-3 h-3 inline mr-1" />
          {task.priority}
        </Badge>
        {task.dueDate && (
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
            <FiClock className="w-3 h-3 inline mr-1" />
            {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </Badge>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Created {format(new Date(task.createdAt!), 'MMM dd, yyyy')}
        </div>
        <select
          value={task.status}
          onChange={(e) => onUpdate(task._id!, { status: e.target.value as Task['status'] })}
          className="text-sm border rounded-lg px-2 py-1 bg-transparent border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </motion.div>
  );
}