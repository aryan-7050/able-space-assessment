'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiCheckSquare, 
  FiCalendar, 
  FiSettings,
  FiHelpCircle,
  FiTrendingUp,
  FiClock,
  FiAward,
  FiZap,
  FiPlus
} from 'react-icons/fi';
import { motion } from 'framer-motion';

const navItems = [
  { 
    href: '/dashboard', 
    label: 'Dashboard', 
    icon: FiHome,
    description: 'Overview & stats'
  },
  { 
    href: '/dashboard/tasks', 
    label: 'Tasks', 
    icon: FiCheckSquare,
    description: 'Manage your tasks'
  },
  { 
    href: '/dashboard/calendar', 
    label: 'Calendar', 
    icon: FiCalendar,
    description: 'View by due date'
  },
  { 
    href: '/dashboard/settings', 
    label: 'Settings', 
    icon: FiSettings,
    description: 'Preferences & more'
  },
  { 
    href: '/dashboard/help', 
    label: 'Help & Support', 
    icon: FiHelpCircle,
    description: 'Get assistance'
  },
];

const quickStats = [
  { label: 'Productivity', value: '87%', icon: FiTrendingUp, color: 'text-green-500' },
  { label: 'On Track', value: '12', icon: FiClock, color: 'text-blue-500' },
  { label: 'Achievements', value: '8', icon: FiAward, color: 'text-yellow-500' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-16 hover:w-64 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50 hidden md:block overflow-y-auto z-30 transition-all duration-300 ease-in-out group/sidebar overflow-x-hidden">
    
      <nav className="px-2 py-2 space-y-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || 
                          (item.href === '/dashboard' && pathname === '/dashboard');

          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <div className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${
                  isActive 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0 overflow-hidden">
                  <span className={`font-medium text-sm whitespace-nowrap ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : ''
                  } opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300`}>
                    {item.label}
                  </span>
                  <p className={`text-[10px] truncate opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300 ${
                    isActive ? 'text-blue-500/70 dark:text-blue-400/70' : 'text-gray-400 dark:text-gray-500'
                  }`}>
                    {item.description}
                  </p>
                </div>

                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 group-hover/sidebar:hidden whitespace-nowrap z-50">
                  {item.label}
                </div>

                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full flex-shrink-0"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <div className="mx-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 rounded-xl border border-gray-200/50 dark:border-gray-700/50 opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300">
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">Quick Stats</p>
        <div className="space-y-1.5">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${stat.color}`} />
                  <span className="text-xs text-gray-600 dark:text-gray-300">{stat.label}</span>
                </div>
                <span className="text-xs font-semibold text-gray-900 dark:text-white">{stat.value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="mx-3 mt-3 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300">
        <div className="flex items-center gap-2">
          <FiZap className="w-4 h-4" />
          <span className="text-xs font-semibold">Pro Features</span>
        </div>
        <p className="text-[10px] opacity-90 mt-1">Unlock advanced analytics</p>
        <button className="mt-2 w-full py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-medium transition-all backdrop-blur-sm">
          Upgrade Now
        </button>
      </div>

      <div className="p-3 mt-2 border-t border-gray-200/50 dark:border-gray-700/50 opacity-0 group-hover/sidebar:opacity-100 transition-all duration-300">
        <p className="text-[10px] text-gray-400 dark:text-gray-500 text-center">
          © 2026 TaskFlow Inc.
        </p>
      </div>
    </aside>
  );
}