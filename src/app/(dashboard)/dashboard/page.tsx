'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks, Task, TaskFormData } from '../../hooks/useTasks';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FiPlus, FiCheckCircle, FiClock, FiAlertCircle,
  FiTrendingUp, FiEdit2, FiTrash2, FiCalendar, FiFlag, FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { tasks, loading, createTask, updateTask, deleteTask, fetchTasks } = useTasks();
  
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const resetForm = useCallback(() => {
    setFormData({
      title: '',
      description: '',
      status: 'pending',
      priority: 'medium',
      dueDate: '',
    });
    setEditingTask(null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    try {
      if (editingTask) {
        await updateTask(editingTask._id!, formData);
        toast.success('Task updated successfully!');
      } else {
        await createTask(formData);
        toast.success('Task created successfully!');
      }
      resetForm();
      setShowForm(false);
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 0,
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Get emoji based on time
  const getEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '';
    if (hour < 17) return '';
    return '';
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 ml-0 md:ml-16 transition-all duration-300 mt-14 sm:mt-16">
          <div className="max-w-6xl mx-auto">
            {/* Welcome Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                    {getGreeting()}, {user?.name?.split(' ')[0] || 'User'}! {getEmoji()}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    You have <span className="font-semibold text-indigo-600 dark:text-indigo-400">{stats.pending}</span> pending tasks. Let's get things done!
                  </p>
                </div>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:scale-105 font-medium text-sm"
                >
                  <FiPlus className="w-4 h-4" />
                  <span>New Task</span>
                </button>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6"
            >
              <StatCard
                title="Total Tasks"
                value={stats.total}
                icon={FiTrendingUp}
                color="indigo"
                change="+12%"
                changeType="up"
              />
              <StatCard
                title="Completed"
                value={stats.completed}
                icon={FiCheckCircle}
                color="green"
                change="+8%"
                changeType="up"
              />
              <StatCard
                title="In Progress"
                value={stats.inProgress}
                icon={FiClock}
                color="yellow"
                change="-2%"
                changeType="down"
              />
              <StatCard
                title="Pending"
                value={stats.pending}
                icon={FiAlertCircle}
                color="red"
                change="+5%"
                changeType="up"
              />
            </motion.div>

            {/* Completion Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 mb-6"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Completion Rate</h3>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stats.completionRate}%</p>
                </div>
                <div className="flex-1 w-full sm:max-w-md">
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.completionRate}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                    />
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center sm:text-left">
                    {stats.completed} of {stats.total} tasks completed
                  </p>
                </div>
                <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">This month</span>
              </div>
            </motion.div>

            {/* Task List - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {tasks.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-6xl mb-4">📋</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No tasks yet</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Create your first task to get started!</p>
                  <button
                    onClick={() => {
                      resetForm();
                      setShowForm(true);
                    }}
                    className="mt-4 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:scale-105 text-sm font-medium"
                  >
                    Create Task
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {tasks.slice(0, 6).map((task) => (
                    <TaskCard
                      key={task._id}
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                      onStatusChange={(id, status) => updateTask(id, { status })}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Enter task title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  placeholder="Enter task description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full px-4 py-2.5 text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:scale-105 font-medium text-sm"
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                  className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ============== Stat Card Component ==============

function StatCard({ title, value, icon: Icon, color, change, changeType }: any) {
  const colors = {
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400',
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="stat-card bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 sm:p-6 transition-all"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`p-2 sm:p-3 rounded-xl ${colors[color]}`}>
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3">
        {changeType === 'up' ? (
          <FiArrowUp className="w-3 h-3 text-green-500" />
        ) : (
          <FiArrowDown className="w-3 h-3 text-red-500" />
        )}
        <span className={`text-xs font-medium ${changeType === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
        <span className="text-xs text-gray-400 dark:text-gray-500">from last month</span>
      </div>
    </motion.div>
  );
}

// ============== Task Card Component ==============

function TaskCard({ task, onEdit, onDelete, onStatusChange }: any) {
  const statusStyles = {
    completed: 'status-badge completed',
    'in-progress': 'status-badge in-progress',
    pending: 'status-badge pending',
  };

  const priorityStyles = {
    high: 'priority-badge high',
    medium: 'priority-badge medium',
    low: 'priority-badge low',
  };

  const priorityClass = {
    high: 'priority-high',
    medium: 'priority-medium',
    low: 'priority-low',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className={`task-card ${priorityClass[task.priority]} bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 sm:p-5 transition-all`}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 flex-1 text-sm">
          {task.title}
        </h3>
        <div className="flex gap-1 ml-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiEdit2 className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
          >
            <FiTrash2 className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        <span className={statusStyles[task.status]}>
          {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
        </span>
        <span className={priorityStyles[task.priority]}>
          <FiFlag className="w-3 h-3 inline mr-0.5" />
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
            <FiCalendar className="w-3 h-3 inline mr-0.5" />
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {task.createdAt && new Date(task.createdAt).toLocaleDateString()}
        </span>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value)}
          className="text-xs border rounded-lg px-2 py-1 bg-transparent border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </motion.div>
  );
}