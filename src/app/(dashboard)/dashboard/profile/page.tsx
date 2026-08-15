'use client';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Header from '../../../components/layout/Header';
import Sidebar from '../../../components/layout/Sidebar';
import { 
  FiUser,
  FiMail,
  FiMapPin,
  FiCalendar,
  FiEdit2,
  FiSave,
  FiX,
  FiCamera,
  FiLogOut,
  FiSettings,
  FiHelpCircle,
  FiTrendingUp,
  FiCheckCircle,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    bio: 'Productivity enthusiast',
    location: 'San Francisco, CA',
    joinDate: 'Joined Jan 2024',
    avatar: '',
  });
  const [editData, setEditData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    joinDate: 'Joined Jan 2024',
    avatar: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    if (user) {
      const userData = {
        name: user.name || '',
        email: user.email || '',
        bio: 'Productivity enthusiast',
        location: 'San Francisco, CA',
        joinDate: 'Joined Jan 2024',
        avatar: '',
      };
      setProfile(userData);
      setEditData(userData);
    }
  }, [user, authLoading, router]);

  // Simple stats
  const stats = {
    total: 6,
    completed: 1,
    inProgress: 3,
    pending: 2,
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfile(editData);
      setIsEditing(false);
      toast.success('Profile updated! 🎉');
    } catch (error) {
      toast.error('Failed to update');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-3 text-gray-500 text-sm">Loading...</p>
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
        <main className="flex-1 p-4 md:p-6 ml-0 md:ml-16 mt-14 sm:mt-16">
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="mb-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Profile</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Manage your personal info</p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 overflow-hidden"
            >
              <div className="p-6 text-center border-b border-gray-200/50 dark:border-gray-700/50">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-3xl mx-auto">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <button className="absolute bottom-0 right-0 p-1.5 bg-indigo-600 rounded-full border-2 border-white dark:border-gray-800">
                    <FiCamera className="w-3 h-3 text-white" />
                  </button>
                </div>
                <h2 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
                  {profile.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">{profile.bio}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{profile.joinDate}</p>
              </div>
              <div className="p-4 space-y-3">
                {/* Name */}
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{profile.name}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{profile.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location}
                      onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <FiMapPin className="w-4 h-4 text-gray-400" />
                      {profile.location}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Bio</label>
                  {isEditing ? (
                    <textarea
                      rows={2}
                      value={editData.bio}
                      onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                      className="w-full mt-1 px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-400">{profile.bio}</p>
                  )}
                </div>
              </div>
              <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
                <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  Task Stats
                </h3>
                <div className="grid grid-cols-4 gap-2">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{stats.total}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Total</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.completed}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Done</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{stats.inProgress}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Progress</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">{stats.pending}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400">Pending</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50 flex flex-col gap-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all text-sm font-medium disabled:opacity-50"
                    >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <FiSave className="w-4 h-4" />
                          Save
                        </>
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditData(profile);
                      }}
                      className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all text-sm font-medium"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-all text-sm font-medium"
                    >
                      <FiEdit2 className="w-4 h-4" />
                      Edit Profile
                    </button>
                    <button
                      onClick={() => router.push('/dashboard/settings')}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-700/30 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-sm"
                    >
                      <FiSettings className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={logout}
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-all text-sm font-medium"
                    >
                      <FiLogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}