'use client';

import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../context/ThemeContext';
import ThemeToggle from '../shared/ThemeToggle';
import { FiLogOut, FiUser, FiSettings, FiHelpCircle, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when window resizes to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (showDropdown) {
        const target = e.target as HTMLElement;
        if (!target.closest('.dropdown-container')) {
          setShowDropdown(false);
        }
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  return (
    <header className="glass fixed top-0 w-full z-40 border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Left section - Logo */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
            aria-label="Toggle menu"
          >
            <FiMenu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
          </button>

          <Link 
            href="/dashboard" 
            className="text-lg sm:text-xl font-bold gradient-text"
          >
            TaskFlow
          </Link>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />
          
          {/* User Dropdown */}
          <div className="relative dropdown-container">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
              aria-label="User menu"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-xs sm:text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="hidden sm:block text-sm text-gray-700 dark:text-gray-300 max-w-[100px] truncate">
                {user?.name}
              </span>
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-56 sm:w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 overflow-hidden z-50"
                >
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* Navigation Links */}
                  <div className="py-1">
                    <Link
                      href="/dashboard/profile"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiUser className="w-4 h-4 flex-shrink-0" />
                      <span>Profile</span>
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiSettings className="w-4 h-4 flex-shrink-0" />
                      <span>Settings</span>
                    </Link>
                    <Link
                      href="/dashboard/help"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
                      onClick={() => setShowDropdown(false)}
                    >
                      <FiHelpCircle className="w-4 h-4 flex-shrink-0" />
                      <span>Help</span>
                    </Link>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>

                  {/* Sign Out Button */}
                  <button
                    onClick={() => {
                      setShowDropdown(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors font-medium touch-manipulation"
                  >
                    <FiLogOut className="w-4 h-4 flex-shrink-0" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="md:hidden fixed left-0 top-0 h-full w-64 sm:w-72 bg-white dark:bg-gray-800 z-50 shadow-2xl flex flex-col"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">TF</span>
                  </div>
                  <span className="text-lg font-bold gradient-text">TaskFlow</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation"
                  aria-label="Close menu"
                >
                  <FiX className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                </button>
              </div>

              {/* User Info in Mobile Menu */}
              <div className="px-4 py-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium text-lg">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-lg">🏠</span>
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link
                  href="/dashboard/tasks"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-lg">✅</span>
                  <span className="font-medium">Tasks</span>
                </Link>
                <Link
                  href="/dashboard/calendar"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-lg">📅</span>
                  <span className="font-medium">Calendar</span>
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-lg">⚙️</span>
                  <span className="font-medium">Settings</span>
                </Link>
              </nav>

              {/* Mobile Menu Footer - Sign Out */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors font-medium touch-manipulation"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}