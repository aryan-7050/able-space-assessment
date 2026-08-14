'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useTasks, Task, TaskFormData } from '../../hooks/useTasks';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiPlus, FiSearch, FiCheckCircle, FiClock, FiAlertCircle,
  FiTrendingUp, FiEdit2, FiTrash2, FiCalendar, FiFlag, FiX, FiSave
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { tasks, loading, createTask, updateTask, deleteTask, fetchTasks } = useTasks();
  
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
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

  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'completed').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    completionRate: tasks.length > 0 ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100) : 0,
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your dashboard...</p>
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
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 ml-0 md:ml-56 lg:ml-64 mt-14 sm:mt-16">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-white mb-4 sm:mb-6 md:mb-8"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
                <div className="w-full sm:w-auto">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    Welcome back, {user?.name?.split(' ')[0] || 'User'}! 👋
                  </h1>
                  <p className="mt-1 opacity-90 text-xs sm:text-sm md:text-base">
                    You have {stats.pending} pending tasks. Let's get things done!
                  </p>
                </div>
                <button
                  onClick={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg hover:shadow-lg transition-all transform hover:scale-105 font-medium text-sm sm:text-base"
                >
                  <FiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>New Task</span>
                </button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6"
            >
              <StatCard 
                icon={<FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />}
                value={stats.total}
                label="Total"
                bgColor="bg-blue-100 dark:bg-blue-900/50"
              />
              <StatCard 
                icon={<FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 dark:text-green-400" />}
                value={stats.completed}
                label="Completed"
                bgColor="bg-green-100 dark:bg-green-900/50"
              />
              <StatCard 
                icon={<FiClock className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-600 dark:text-yellow-400" />}
                value={stats.inProgress}
                label="In Progress"
                bgColor="bg-yellow-100 dark:bg-yellow-900/50"
              />
              <StatCard 
                icon={<FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-red-600 dark:text-red-400" />}
                value={stats.pending}
                label="Pending"
                bgColor="bg-red-100 dark:bg-red-900/50"
              />
            </motion.div>

            {/* Completion Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 sm:p-6 text-white mb-4 sm:mb-6"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
                  <div>
                    <div className="text-xs sm:text-sm opacity-90">Completion Rate</div>
                    <div className="text-2xl sm:text-3xl font-bold">{stats.completionRate}%</div>
                  </div>
                  <div className="flex-1 sm:w-64 h-2 sm:h-3 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stats.completionRate}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-white rounded-full"
                    />
                  </div>
                </div>
                <div className="text-xs sm:text-sm opacity-90">
                  {stats.completed} of {stats.total} tasks done
                </div>
              </div>
            </motion.div>

            {/* Filters and Search */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6"
            >
              <div className="flex-1 relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {['all', 'pending', 'in-progress', 'completed'].map((status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg whitespace-nowrap transition-colors text-xs sm:text-sm ${
                      filter === status
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Task Form Modal */}
            <AnimatePresence>
              {showForm && (
                <TaskFormModal
                  editingTask={editingTask}
                  formData={formData}
                  setFormData={setFormData}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    resetForm();
                  }}
                />
              )}
            </AnimatePresence>

            {/* Task List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {filteredTasks.length === 0 ? (
                <EmptyState 
                  searchTerm={searchTerm}
                  onCreateTask={() => {
                    resetForm();
                    setShowForm(true);
                  }}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {filteredTasks.map((task) => (
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
    </div>
  );
}

// ============== Sub-Components ==============

// Stat Card Component
function StatCard({ icon, value, label, bgColor }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 md:p-6 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
          <div className="text-[10px] sm:text-xs md:text-sm text-gray-600 dark:text-gray-400">{label}</div>
        </div>
        <div className={`p-2 sm:p-3 ${bgColor} rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Task Card Component
function TaskCard({ task, onEdit, onDelete, onStatusChange }: any) {
  const statusStyles = {
    completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    'in-progress': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
    pending: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  const priorityStyles = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300',
    medium: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300',
    low: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  const statusLabels = {
    'pending': 'Pending',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 sm:p-5 md:p-6 border border-gray-200/50 dark:border-gray-700/50"
    >
      <div className="flex justify-between items-start mb-2 sm:mb-3">
        <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white line-clamp-2 flex-1">
          {task.title}
        </h3>
        <div className="flex gap-1 sm:gap-2 ml-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 sm:p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            title="Edit task"
          >
            <FiEdit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-500 dark:text-gray-400" />
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="p-1.5 sm:p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete task"
          >
            <FiTrash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500" />
          </button>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4 line-clamp-3">
        {task.description}
      </p>

      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${statusStyles[task.status as keyof typeof statusStyles]}`}>
          {statusLabels[task.status as keyof typeof statusLabels]}
        </span>
        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-0.5 sm:gap-1 ${priorityStyles[task.priority as keyof typeof priorityStyles]}`}>
          <FiFlag className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          {task.priority}
        </span>
        {task.dueDate && (
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-300 flex items-center gap-0.5 sm:gap-1">
            <FiCalendar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
        <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">
          {task.createdAt && new Date(task.createdAt).toLocaleDateString()}
        </span>
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task._id, e.target.value as Task['status'])}
          className="text-[10px] sm:text-xs border rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 bg-transparent border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </motion.div>
  );
}

// Task Form Modal Component
function TaskFormModal({ editingTask, formData, setFormData, onSubmit, onCancel }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            {editingTask ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onCancel}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Task['priority'] })}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            <button
              type="submit"
              className="w-full sm:flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <FiSave className="w-4 h-4" />
              {editingTask ? 'Update Task' : 'Create Task'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="w-full sm:px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Empty State Component
function EmptyState({ searchTerm, onCreateTask }: any) {
  return (
    <div className="text-center py-8 sm:py-12 bg-white dark:bg-gray-800 rounded-xl border border-gray-200/50 dark:border-gray-700/50 px-4">
      <div className="text-4xl sm:text-6xl mb-4">📋</div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {searchTerm ? 'No tasks match your search' : 'No tasks yet'}
      </h3>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
        {searchTerm 
          ? 'Try adjusting your search or filters' 
          : 'Create your first task to get started!'}
      </p>
      {!searchTerm && (
        <button
          onClick={onCreateTask}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
        >
          Create Task
        </button>
      )}
    </div>
  );
}