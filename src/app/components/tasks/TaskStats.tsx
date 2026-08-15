'use client';

import { Task } from '../../types';
import { motion } from 'framer-motion';
import { FiCheckCircle, FiClock, FiAlertCircle, FiTrendingUp } from 'react-icons/fi';

interface TaskStatsProps {
  tasks: Task[];
}
export default function TaskStats({ tasks }: TaskStatsProps) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProgress = tasks.filter(t => t.status === 'in-progress').length;
  const pending = tasks.filter(t => t.status === 'pending').length;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    { label: 'Total Tasks', value: total, icon: FiTrendingUp, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/50' },
    { label: 'Completed', value: completed, icon: FiCheckCircle, color: 'text-green-600 bg-green-100 dark:bg-green-900/50' },
    { label: 'In Progress', value: inProgress, icon: FiClock, color: 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/50' },
    { label: 'Pending', value: pending, icon: FiAlertCircle, color: 'text-red-600 bg-red-100 dark:bg-red-900/50' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow border border-gray-200/50 dark:border-gray-700/50">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          </div>
        </motion.div>
      ))}
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="md:col-span-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90">Overall Completion Rate</div>
            <div className="text-3xl font-bold">{completionRate}%</div>
          </div>
          <div className="w-32 h-32">
            <svg viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="12" strokeDasharray={`${completionRate * 2.51} 251`} strokeDashoffset="0" strokeLinecap="round" transform="rotate(-90 50 50)" className="transition-all duration-1000" />
              <text x="50" y="50" textAnchor="middle" dy="0.35em" className="text-2xl font-bold fill-white">{completionRate}%</text>
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
}