'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useTasks } from '../../../hooks/useTasks';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../../../components/layout/Header';
import Sidebar from '../../../components/layout/Sidebar';
import { 
  FiChevronLeft, 
  FiChevronRight, 
  FiCalendar as FiCalendarIcon,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';

export default function CalendarPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { tasks, loading, fetchTasks } = useTasks();
  
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading calendar...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const days = getDaysInMonth(currentDate);
  const selectedDateTasks = selectedDate ? getTasksForDate(selectedDate) : [];

  // Get task statistics for the month
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 ml-0 md:ml-64 mt-16">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Calendar
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  View and manage your tasks by due date
                </p>
              </div>
              <button
                onClick={goToToday}
                className="mt-4 md:mt-0 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiCalendarIcon className="w-5 h-5" />
                <span>Today</span>
              </button>
            </div>

            {/* Month Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6"
            >
              <StatCard 
                icon={<FiCalendarIcon className="w-5 h-5 text-blue-600" />}
                value={stats.total}
                label="Tasks This Month"
                bgColor="bg-blue-100 dark:bg-blue-900/50"
              />
              <StatCard 
                icon={<FiCheckCircle className="w-5 h-5 text-green-600" />}
                value={stats.completed}
                label="Completed"
                bgColor="bg-green-100 dark:bg-green-900/50"
              />
              <StatCard 
                icon={<FiClock className="w-5 h-5 text-yellow-600" />}
                value={stats.inProgress}
                label="In Progress"
                bgColor="bg-yellow-100 dark:bg-yellow-900/50"
              />
              <StatCard 
                icon={<FiAlertCircle className="w-5 h-5 text-red-600" />}
                value={stats.pending}
                label="Pending"
                bgColor="bg-red-100 dark:bg-red-900/50"
              />
            </motion.div>

            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={previousMonth}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FiChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <FiChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 p-2">
                {dayNames.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-gray-600 dark:text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 p-2">
                {days.map((day, index) => {
                  const dayTasks = day ? getTasksForDate(day) : [];
                  const hasTasks = dayTasks.length > 0;
                  const hasCompleted = dayTasks.some(t => t.status === 'completed');
                  const hasPending = dayTasks.some(t => t.status === 'pending' || t.status === 'in-progress');

                  return (
                    <div
                      key={index}
                      onClick={() => day && setSelectedDate(day)}
                      className={`
                        min-h-[100px] p-2 rounded-lg cursor-pointer transition-colors
                        ${day ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : ''}
                        ${day && isToday(day) ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500' : ''}
                        ${day && isSelected(day) ? 'bg-purple-50 dark:bg-purple-900/20 border-2 border-purple-500' : ''}
                        ${!day ? 'bg-gray-50 dark:bg-gray-800/50' : ''}
                      `}
                    >
                      {day && (
                        <>
                          <div className={`text-sm font-medium ${
                            isToday(day) ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {day.getDate()}
                          </div>
                          
                          {/* Task indicators */}
                          {hasTasks && (
                            <div className="mt-1 flex gap-1">
                              {hasCompleted && (
                                <div className="w-2 h-2 rounded-full bg-green-500" title="Has completed tasks" />
                              )}
                              {hasPending && (
                                <div className="w-2 h-2 rounded-full bg-yellow-500" title="Has pending tasks" />
                              )}
                            </div>
                          )}

                          {/* Task preview */}
                          <div className="mt-1 space-y-1">
                            {dayTasks.slice(0, 2).map((task) => (
                              <div
                                key={task._id}
                                className={`text-[10px] px-1 py-0.5 rounded truncate ${
                                  task.status === 'completed' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 line-through' 
                                    : task.status === 'in-progress'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                                }`}
                                title={task.title}
                              >
                                {task.title}
                              </div>
                            ))}
                            {dayTasks.length > 2 && (
                              <div className="text-[10px] text-gray-500 dark:text-gray-400">
                                +{dayTasks.length - 2} more
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Selected Date Tasks */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6"
              >
                {selectedDateTasks.length > 0 ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <FiCalendarIcon className="w-5 h-5 text-blue-600" />
                      Tasks for {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    <div className="space-y-3">
                      {selectedDateTasks.map((task) => (
                        <div
                          key={task._id}
                          className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                            task.status === 'completed' 
                              ? 'bg-green-50 dark:bg-green-900/20' 
                              : task.status === 'in-progress'
                              ? 'bg-yellow-50 dark:bg-yellow-900/20'
                              : 'bg-gray-50 dark:bg-gray-700/50'
                          }`}
                        >
                          <div className="flex-1">
                            <p className={`font-medium text-gray-900 dark:text-white ${
                              task.status === 'completed' ? 'line-through text-gray-500 dark:text-gray-400' : ''
                            }`}>
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                              {task.description}
                            </p>
                            <div className="flex gap-2 mt-2">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300' :
                                task.priority === 'medium' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {task.priority}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                task.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                                task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300' :
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                              }`}>
                                {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              task.status === 'completed' ? 'bg-green-500 text-white' :
                              task.status === 'in-progress' ? 'bg-yellow-500 text-white' :
                              'bg-gray-500 text-white'
                            }`}>
                              {task.status === 'completed' ? '✓ Done' :
                               task.status === 'in-progress' ? '⏳ In Progress' :
                               '⏰ Pending'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-4xl mb-2">📅</div>
                    <p className="text-gray-500 dark:text-gray-400">
                      No tasks due on {selectedDate.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                )}
              </motion.div>
            )}
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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
        </div>
        <div className={`p-3 ${bgColor} rounded-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}