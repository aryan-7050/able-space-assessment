'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiCheckSquare, FiCalendar, FiSettings } from 'react-icons/fi';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/dashboard/tasks', label: 'Tasks', icon: FiCheckSquare },
  { href: '/dashboard/calendar', label: 'Calendar', icon: FiCalendar },
  { href: '/dashboard/settings', label: 'Settings', icon: FiSettings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-14 sm:top-16 h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-4rem)] w-56 sm:w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:block overflow-y-auto z-30">
      <nav className="p-3 sm:p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
                          (item.href === '/dashboard' && pathname === '/dashboard');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              <span className="font-medium text-sm sm:text-base">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}