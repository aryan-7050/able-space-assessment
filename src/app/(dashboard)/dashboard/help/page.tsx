'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '../../../components/layout/Header';
import Sidebar from '../../../components/layout/Sidebar';
import { 
  FiSearch,
  FiHelpCircle,
  FiBook,
  FiVideo,
  FiMessageCircle,
  FiMail,
  FiArrowRight,
  FiChevronDown,
  FiChevronUp,
  FiExternalLink,
  FiCheckCircle,
  FiClock,
  FiUser,
  FiSettings,
  FiLock,
  FiBell,
  FiCalendar,
  FiCheckSquare,
  FiHome,
  FiStar,
  FiThumbsUp,
  FiThumbsDown,
  FiSend,
  FiFileText,
  FiLifeBuoy,
  FiZap,
  FiTrendingUp,
  FiShield,
  FiGrid,
  FiRefreshCw,
  FiCopy,
  FiDownload,
  FiShare2,
  FiHeart,
  FiAward
} from 'react-icons/fi';

export default function HelpPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center px-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading help center...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const categories = [
    { id: 'all', label: 'All', icon: FiGrid },
    { id: 'getting-started', label: 'Getting Started', icon: FiHome },
    { id: 'tasks', label: 'Tasks', icon: FiCheckSquare },
    { id: 'calendar', label: 'Calendar', icon: FiCalendar },
    { id: 'settings', label: 'Settings', icon: FiSettings },
    { id: 'security', label: 'Security', icon: FiLock },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'How do I get started with TaskFlow?',
      answer: 'Getting started with TaskFlow is easy! Simply create an account, and you\'ll be guided through the setup process. You can start by creating your first task, setting up your profile, and customizing your preferences.',
    },
    {
      id: 2,
      category: 'tasks',
      question: 'How do I create and manage tasks?',
      answer: 'To create a task, click the "New Task" button on your dashboard. You can add a title, description, set priority, choose a status, and assign a due date. Tasks can be edited, deleted, or marked as complete at any time.',
    },
    {
      id: 3,
      category: 'calendar',
      question: 'How does the calendar view work?',
      answer: 'The calendar view shows all your tasks organized by their due dates. You can click on any day to see tasks due on that day. Tasks are color-coded based on their status (pending, in-progress, completed).',
    },
    {
      id: 4,
      category: 'settings',
      question: 'How do I change my password?',
      answer: 'Go to Settings → Security tab. Enter your current password, then your new password and confirm it. Click "Update Password" to save changes. Make sure your new password is at least 6 characters long.',
    },
    {
      id: 5,
      category: 'notifications',
      question: 'How do I manage notifications?',
      answer: 'You can manage notifications in Settings → Notifications. You can toggle email notifications, push notifications, task reminders, weekly reports, and marketing emails.',
    },
    {
      id: 6,
      category: 'security',
      question: 'Is my data secure?',
      answer: 'Yes! TaskFlow uses industry-standard encryption to protect your data. All passwords are hashed, and we use secure HTTPS connections. Your data is private and only accessible to you.',
    },
    {
      id: 7,
      category: 'getting-started',
      question: 'Can I use TaskFlow on mobile?',
      answer: 'Absolutely! TaskFlow is fully responsive and works seamlessly on all devices. You can access your tasks from your phone, tablet, or desktop computer.',
    },
    {
      id: 8,
      category: 'tasks',
      question: 'What are task priorities and statuses?',
      answer: 'Priorities help you organize tasks by importance (Low, Medium, High). Statuses track progress (Pending, In Progress, Completed). You can filter and sort tasks by these categories.',
    },
  ];

  const guides = [
    {
      title: 'Quick Start Guide',
      description: 'Learn the basics in 5 minutes',
      icon: FiZap,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      link: '#',
    },
    {
      title: 'Task Management Tips',
      description: 'Boost your productivity',
      icon: FiTrendingUp,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      link: '#',
    },
    {
      title: 'Security Best Practices',
      description: 'Keep your account safe',
      icon: FiShield,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      link: '#',
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: FiVideo,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      link: '#',
    },
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFeedbackSubmit = () => {
    if (feedbackText.trim()) {
      setFeedbackSubmitted(true);
      setFeedbackText('');
      setTimeout(() => setFeedbackSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 ml-0 md:ml-16 mt-14 sm:mt-16 transition-all duration-300">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 sm:mb-6"
            >
              <div className="flex items-center gap-2 sm:gap-3 mb-1">
                <div className="p-1.5 sm:p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <FiLifeBuoy className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Help & Support
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 ml-1">
                Find answers, guides, and get the support you need
              </p>
            </motion.div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative mb-4 sm:mb-6"
            >
              <div className="relative">
                <FiSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search help articles, FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-12 pr-8 sm:pr-12 py-2.5 sm:py-3.5 text-sm sm:text-base border border-gray-200 dark:border-gray-600 rounded-xl sm:rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm sm:shadow-lg"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    <FiChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
              </div>
            </motion.div>

            {/* Quick Guides */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 sm:mb-6"
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                <FiBook className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
                Quick Guides
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                {guides.map((guide, index) => {
                  const Icon = guide.icon;
                  return (
                    <motion.a
                      key={index}
                      href={guide.link}
                      whileHover={{ y: -2, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`${guide.bgColor} p-3 sm:p-5 rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all cursor-pointer group`}
                    >
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-r ${guide.color} flex items-center justify-center text-white mb-2 sm:mb-3 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
                        {guide.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
                        {guide.description}
                      </p>
                      <div className="mt-2 sm:mt-3 flex items-center gap-1 text-indigo-600 dark:text-indigo-400 text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                        Learn More
                        <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </div>
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>

            {/* Categories */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 sm:mb-6"
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                <FiGrid className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                Categories
              </h2>
              <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.id;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl whitespace-nowrap transition-all text-xs sm:text-sm font-medium touch-manipulation ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                          : 'bg-white/60 dark:bg-gray-800/60 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">{category.label}</span>
                      <span className="xs:hidden">{category.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center gap-2">
                <FiHelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-2 sm:space-y-3">
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-8 sm:py-12 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🔍</div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">No results found</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      Try adjusting your search or filter
                    </p>
                  </div>
                ) : (
                  filteredFaqs.map((faq, index) => {
                    const isExpanded = expandedFaq === faq.id;
                    return (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden shadow-sm hover:shadow-md transition-all"
                      >
                        <button
                          onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                          className="w-full flex items-center justify-between p-3 sm:p-5 text-left hover:bg-gray-50/50 dark:hover:bg-gray-700/30 transition-colors touch-manipulation"
                        >
                          <div className="flex items-start gap-2 sm:gap-3 flex-1 min-w-0">
                            <div className="mt-0.5 sm:mt-1 flex-shrink-0">
                              <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold ${
                                isExpanded 
                                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                              }`}>
                                {faq.id}
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className={`font-semibold text-sm sm:text-base ${
                                isExpanded ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-900 dark:text-white'
                              }`}>
                                {faq.question}
                              </h3>
                              {isExpanded && (
                                <motion.p
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1.5 sm:mt-2 leading-relaxed"
                                >
                                  {faq.answer}
                                </motion.p>
                              )}
                            </div>
                          </div>
                          <div className="ml-2 sm:ml-4 flex-shrink-0">
                            {isExpanded ? (
                              <FiChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                            ) : (
                              <FiChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                            )}
                          </div>
                        </button>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="px-3 sm:px-5 pb-3 sm:pb-5"
                          >
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
                              <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                {categories.find(c => c.id === faq.category)?.label || faq.category}
                              </span>
                              <span>•</span>
                              <span className="flex items-center gap-0.5 sm:gap-1">
                                <FiThumbsUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                                Helpful
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })
                )}
              </div>
            </motion.div>

            {/* Contact Support & Feedback */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4"
            >
              {/* Contact Support */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
                    <FiMessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Contact Support</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">We're here to help</p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
                  Our support team is available 24/7 to assist you.
                </p>
                <div className="space-y-2 sm:space-y-3">
                  <a
                    href="mailto:support@taskflow.com"
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Email Support</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">support@taskflow.com</p>
                    </div>
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  </a>
                  <a
                    href="#"
                    className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiFileText className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">Documentation</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">Read our full docs</p>
                    </div>
                    <FiArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                  </a>
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-3 sm:p-6">
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="p-1.5 sm:p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
                    <FiStar className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base">Send Feedback</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Help us improve</p>
                  </div>
                </div>
                {feedbackSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30"
                  >
                    <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-300 text-sm">Thank you!</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Feedback submitted</p>
                    </div>
                  </motion.div>
                ) : (
                  <div>
                    <textarea
                      rows={3}
                      placeholder="Share your feedback, suggestions..."
                      value={feedbackText}
                      onChange={(e) => setFeedbackText(e.target.value)}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    />
                    <button
                      onClick={handleFeedbackSubmit}
                      disabled={!feedbackText.trim()}
                      className="mt-2 sm:mt-3 w-full flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-indigo-500/25 transition-all transform hover:scale-105 font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                      <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      Submit Feedback
                    </button>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-4 sm:mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4"
            >
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-2.5 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">24/7</div>
                <div className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">Support Available</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-2.5 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-green-600 dark:text-green-400">50+</div>
                <div className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">Help Articles</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-2.5 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-400">4.9★</div>
                <div className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">User Rating</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-gray-200/50 dark:border-gray-700/50 p-2.5 sm:p-4 text-center">
                <div className="text-lg sm:text-2xl font-bold text-yellow-600 dark:text-yellow-400">10K+</div>
                <div className="text-[10px] sm:text-sm text-gray-500 dark:text-gray-400">Happy Users</div>
              </div>
            </motion.div>

            {/* Footer Note */}
            <div className="mt-4 sm:mt-6 text-center text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">
              <p>Can't find what you're looking for? <a href="mailto:support@taskflow.com" className="text-indigo-600 dark:text-indigo-400 hover:underline">Contact support</a></p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}