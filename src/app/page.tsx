'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './hooks/useAuth';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiClock, 
  FiTrendingUp, 
  FiShield, 
  FiZap, 
  FiUsers,
  FiArrowRight,
  FiStar,
  FiAward,
} from 'react-icons/fi';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (user) return null;

  const features = [
    {
      icon: <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Smart Task Management',
      description: 'Create, organize, and track tasks with intelligent automation',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: <FiClock className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Real-time Updates',
      description: 'Stay synchronized across all your devices instantly',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: <FiTrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Productivity Insights',
      description: 'Track your progress and boost efficiency with analytics',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: <FiShield className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected with enterprise-grade security',
      color: 'from-red-500 to-red-600',
    },
  ];

  const stats = [
    { number: '10K+', label: 'Active Users', icon: <FiUsers className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { number: '50K+', label: 'Tasks Completed', icon: <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { number: '99.9%', label: 'Uptime Guarantee', icon: <FiAward className="w-4 h-4 sm:w-5 sm:h-5" /> },
    { number: '4.9★', label: 'User Rating', icon: <FiStar className="w-4 h-4 sm:w-5 sm:h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-60 h-60 sm:w-80 sm:h-80 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-60 h-60 sm:w-80 sm:h-80 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 sm:w-96 sm:h-96 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <nav className="glass fixed top-0 w-full z-50 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-1.5 sm:gap-2"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold gradient-text">TaskFlow</span>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 sm:gap-4"
            >
              <Link 
                href="/login" 
                className="text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/register" 
                className="px-4 py-1.5 sm:px-6 sm:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105 font-medium text-sm sm:text-base"
              >
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >

            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
              <span className="gradient-text">Streamline Your</span>
              <br />
              <span className="text-gray-900 dark:text-white">Workflow Today</span>
            </h1>
            
            <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2 sm:px-0">
              Experience the most intuitive task management platform designed for modern teams.
              Organize, prioritize, and accomplish more with intelligent automation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2 sm:px-0">
              <Link
                href="/register"
                className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:shadow-xl hover:shadow-blue-500/30 transition-all transform hover:scale-105 font-medium flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                Start Free Trial
                <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover:scale-105 font-medium text-center text-sm sm:text-base"
              >
                View Demo
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200/50 dark:border-gray-700/50 text-center"
              >
                <div className="text-xl sm:text-3xl font-bold gradient-text">{stat.number}</div>
                <div className="text-[10px] sm:text-sm text-gray-600 dark:text-gray-400 mt-0.5 sm:mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 sm:mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-200/50 dark:border-gray-700/50 cursor-pointer"
              >
                <div className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 sm:mt-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl sm:rounded-3xl p-6 sm:p-12 text-center text-white"
          >
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4">
              Ready to Boost Your Productivity?
            </h2>
            <p className="text-sm sm:text-lg opacity-90 max-w-2xl mx-auto mb-4 sm:mb-8 px-2">
              Join thousands of teams already using TaskFlow to streamline their workflow.
            </p>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 rounded-full hover:shadow-2xl transition-all transform hover:scale-105 font-semibold text-sm sm:text-base"
            >
              Get Started Now
              <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200/50 dark:border-gray-700/50 py-6 sm:py-8 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </div>
      </footer>
    </div>
  );
}