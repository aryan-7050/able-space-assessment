'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useTasks } from '../../../hooks/useTasks';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/layout/Header';
import Sidebar from '../../../components/layout/Sidebar';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiCalendar as FiCalendarIcon,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiPlus,
  FiArrowRight,
  FiGrid,
  FiList
} from 'react-icons/fi';

export default function CalendarPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { tasks, loading, fetchTasks } = useTasks();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

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

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const getTasksForDate = (date: Date) => {
    if (!tasks) return [];
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.getDate() === date.getDate() &&
             taskDate.getMonth() === date.getMonth() &&
             taskDate.getFullYear() === date.getFullYear();
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    if (!selectedDate) return false;
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading calendar...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const days = getDaysInMonth(currentDate);
  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  const allTasksWithDueDate = tasks.filter(t => t.dueDate);
  const tasksThisMonth = allTasksWithDueDate.filter(t => {
    const taskDate = new Date(t.dueDate!);
    return taskDate.getMonth() === currentDate.getMonth() &&
           taskDate.getFullYear() === currentDate.getFullYear();
  });

  const stats = {
    total: tasksThisMonth.length,
    completed: tasksThisMonth.filter(t => t.status === 'completed').length,
    inProgress: tasksThisMonth.filter(t => t.status === 'in-progress').length,
    pending: tasksThisMonth.filter(t => t.status === 'pending').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 ml-0 md:ml-56 lg:ml-64 mt-14 sm:mt-16">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
            >
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Calendar
                </h1>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
                  Organize your tasks by due date
                </p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                {/* View Toggle */}
                <div className="hidden sm:flex bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-1">
                  <button
                    onClick={() => setViewMode('month')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'month' 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('week')}
                    className={`p-2 rounded-lg transition-all ${
                      viewMode === 'week' 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={goToToday}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105 text-sm sm:text-base whitespace-nowrap"
                >
                  <FiCalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden xs:inline">Today</span>
                </button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6"
            >
              <StatCard 
                icon={<FiCalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />}
                value={stats.total}
                label="This Month"
                bgColor="bg-blue-50 dark:bg-blue-900/20"
                borderColor="border-blue-200 dark:border-blue-800/30"
                gradient="from-blue-600 to-blue-700"
              />
              <StatCard 
                icon={<FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />}
                value={stats.completed}
                label="Completed"
                bgColor="bg-green-50 dark:bg-green-900/20"
                borderColor="border-green-200 dark:border-green-800/30"
                gradient="from-green-600 to-green-700"
              />
              <StatCard 
                icon={<FiClock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />}
                value={stats.inProgress}
                label="In Progress"
                bgColor="bg-yellow-50 dark:bg-yellow-900/20"
                borderColor="border-yellow-200 dark:border-yellow-800/30"
                gradient="from-yellow-600 to-yellow-700"
              />
              <StatCard 
                icon={<FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />}
                value={stats.pending}
                label="Pending"
                bgColor="bg-red-50 dark:bg-red-900/20"
                borderColor="border-red-200 dark:border-red-800/30"
                gradient="from-red-600 to-red-700"
              />
            </motion.div>

            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              {/* Calendar Navigation */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200/50 dark:border-gray-700/50">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:scale-110"
                >
                  <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                  {monthNames[currentDate.getMonth()]} <span className="text-blue-600 dark:text-blue-400">{currentDate.getFullYear()}</span>
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-all hover:scale-110"
                >
                  <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 p-2 sm:p-3">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 p-2 sm:p-3">
                {days.map((day, index) => {
                  const dayTasks = day ? getTasksForDate(day) : [];
                  const hasTasks = dayTasks.length > 0;
                  const hasCompleted = dayTasks.some(t => t.status === 'completed');
                  const hasPending = dayTasks.some(t => t.status === 'pending' || t.status === 'in-progress');
                  const taskCount = dayTasks.length;

                  return (
                    <motion.div
                      key={index}
                      whileHover={day ? { scale: 1.02 } : {}}
                      whileTap={day ? { scale: 0.98 } : {}}
                      onClick={() => day && setSelectedDate(day)}
                      className={`
                        min-h-[80px] sm:min-h-[100px] lg:min-h-[120px] p-1.5 sm:p-2 rounded-xl cursor-pointer transition-all
                        ${day ? 'hover:shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700/50' : ''}
                        ${day && isToday(day) ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800 bg-blue-50/50 dark:bg-blue-900/20' : ''}
                        ${day && isSelected(day) ? 'ring-2 ring-purple-500 ring-offset-2 dark:ring-offset-gray-800 bg-purple-50/50 dark:bg-purple-900/20' : ''}
                        ${!day ? 'bg-gray-50/50 dark:bg-gray-800/30' : 'bg-white dark:bg-gray-800'}
                        border border-gray-100 dark:border-gray-700/50
                      `}
                    >
                      {day && (
                        <>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm sm:text-base font-semibold ${
                              isToday(day) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {day.getDate()}
                            </span>
                            {taskCount > 0 && (
                              <span className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded-full">
                                {taskCount}
                              </span>
                            )}
                          </div>
                          
                          {/* Task indicators */}
                          {hasTasks && (
                            <div className="mt-1 flex gap-1">
                              {hasCompleted && (
                                <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm" title="Has completed tasks" />
                              )}
                              {hasPending && (
                                <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-sm" title="Has pending tasks" />
                              )}
                            </div>
                          )}

                          {/* Task preview - Only show on desktop */}
                          <div className="hidden sm:block mt-1 space-y-0.5">
                            {dayTasks.slice(0, 2).map((task) => (
                              <div
                                key={task._id}
                                className={`text-[9px] lg:text-[10px] px-1.5 py-0.5 rounded truncate transition-all ${
                                  task.status === 'completed' 
                                    ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300 line-through' 
                                    : task.status === 'in-progress'
                                    ? 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                                    : 'bg-gray-50 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300'
                                }`}
                                title={task.title}
                              >
                                {task.title}
                              </div>
                            ))}
                            {dayTasks.length > 2 && (
                              <div className="text-[9px] text-gray-400 dark:text-gray-500">
                                +{dayTasks.length - 2} more
                              </div>
                            )}
                          </div>

                          {/* Mobile task count badge */}
                          <div className="sm:hidden mt-1">
                            {taskCount > 0 && (
                              <div className="text-[8px] font-medium text-gray-500 dark:text-gray-400">
                                {taskCount} task{taskCount > 1 ? 's' : ''}
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Selected Date Tasks - Enhanced */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-6"
              >
                {selectedDateTasks.length > 0 ? (
                  <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <FiCalendarIcon className="w-5 h-5 text-blue-600" />
                        <span>
                          {selectedDate.toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedDateTasks.length} task{selectedDateTasks.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      {selectedDateTasks.map((task, index) => (
                        <motion.div
                          key={task._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl transition-all ${
                            task.status === 'completed' 
                              ? 'bg-green-50/70 dark:bg-green-900/20 border border-green-200/50 dark:border-green-800/30' 
                              : task.status === 'in-progress'
                              ? 'bg-yellow-50/70 dark:bg-yellow-900/20 border border-yellow-200/50 dark:border-yellow-800/30'
                              : 'bg-gray-50/70 dark:bg-gray-700/30 border border-gray-200/50 dark:border-gray-700/50'
                          } hover:shadow-md transition-all`}
                        >
                          <div className="flex-1 min-w-0 w-full sm:w-auto">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className={`font-semibold text-gray-900 dark:text-white ${
                                task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : ''
                              }`}>
                                {task.title}
                              </p>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                                task.priority === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300' :
                                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {task.priority}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                task.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                                task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                              {task.description}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-3 sm:mt-0 ml-0 sm:ml-4">
                            <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                              task.status === 'completed' ? 'bg-green-500 text-white' :
                              task.status === 'in-progress' ? 'bg-yellow-500 text-white' :
                              'bg-gray-500 text-white'
                            }`}>
                              {task.status === 'completed' ? '✓ Done' :
                               task.status === 'in-progress' ? '⏳ In Progress' :
                               '⏰ Pending'}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8 sm:py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
                  >
                    <div className="text-5xl sm:text-6xl mb-4">📅</div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      No Tasks Due
                    </h3>
                    <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                      You have no tasks scheduled for {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <button
                      onClick={() => {
                        // Navigate to tasks page or open task creation
                        router.push('/dashboard/tasks');
                      }}
                      className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105 text-sm font-medium"
                    >
                      <FiPlus className="w-4 h-4" />
                      Create Task
                      <FiArrowRight className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

// ============== Enhanced Stat Card Component ==============

function StatCard({ icon, value, label, bgColor, borderColor, gradient }: any) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className={`bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl shadow-sm border ${borderColor || 'border-gray-200/50 dark:border-gray-700/50'} hover:shadow-lg transition-all`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${gradient || 'from-blue-600 to-blue-700'} bg-clip-text text-transparent`}>
            {value}
          </div>
          <div className="text-[10px] sm:text-xs lg:text-sm text-gray-500 dark:text-gray-400 font-medium">
            {label}
          </div>
        </div>
        <div className={`p-2 sm:p-3 ${bgColor} rounded-xl`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}