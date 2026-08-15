'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useTheme } from '../../../context/ThemeContext';
import Header from '../../../components/layout/Header';
import Sidebar from '../../../components/layout/Sidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, 
  FiMail, 
  FiMoon, 
  FiSun, 
  FiSave, 
  FiShield, 
  FiBell, 
  FiLock,
  FiGlobe,
  FiMonitor,
  FiSmartphone,
  FiCheckCircle,
  FiAlertCircle,
  FiEdit2,
  FiLogOut,
  FiTrash2,
  FiClock,
  FiDatabase,
  FiRefreshCw,
  FiArrowRight,
  FiChevronRight,
  FiDroplet,
  FiEye,
  FiEyeOff,
  FiKey,
  FiUserCheck,
  FiUserX
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile State
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    bio: '',
    location: '',
    website: '',
  });
  
  // Password State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Notification State
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    weeklyReports: false,
    marketingEmails: false,
  });

  // Appearance State
  const [appearance, setAppearance] = useState({
    theme: theme || 'light',
    fontSize: 'medium',
    compactView: false,
    animations: true,
  });

  // Privacy State
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showOnlineStatus: true,
    allowSearch: true,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        bio: '',
        location: '',
        website: '',
      });
    }
  }, [user, authLoading, router]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Profile updated successfully! 🎉');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success('Password updated successfully! 🔒');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast.error('Failed to update password');
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Notification preferences updated! 🔔');
    } catch (error) {
      toast.error('Failed to update notifications');
    } finally {
      setIsSaving(false);
    }
  };

  const handleAppearanceUpdate = async () => {
    setIsSaving(true);
    try {
      // Update theme
      if (appearance.theme !== theme) {
        toggleTheme();
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Appearance updated! 🎨');
    } catch (error) {
      toast.error('Failed to update appearance');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrivacyUpdate = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Privacy settings updated! 🔒');
    } catch (error) {
      toast.error('Failed to update privacy');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone!')) {
      const confirm = window.prompt('Type "DELETE" to confirm:');
      if (confirm === 'DELETE') {
        toast.success('Account deleted successfully');
        logout();
      }
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50/50 to-purple-50/30 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'security', label: 'Security', icon: FiLock },
    { id: 'notifications', label: 'Notifications', icon: FiBell },
    { id: 'appearance', label: 'Appearance', icon: FiMonitor },
    { id: 'privacy', label: 'Privacy', icon: FiShield },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50/50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-3 sm:p-4 md:p-6 lg:p-8 ml-0 md:ml-56 lg:ml-64 mt-14 sm:mt-16">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Settings
              </h1>
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
                Manage your account preferences and settings
              </p>
            </motion.div>

            {/* Tabs - Mobile Scrollable */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 overflow-x-auto scrollbar-hide"
            >
              <div className="flex gap-1 sm:gap-2 min-w-max p-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl transition-all whitespace-nowrap text-xs sm:text-sm font-medium ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="hidden xs:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === 'profile' && (
                  <ProfileSettings
                    profileData={profileData}
                    setProfileData={setProfileData}
                    handleProfileUpdate={handleProfileUpdate}
                    isSaving={isSaving}
                  />
                )}
                {activeTab === 'security' && (
                  <SecuritySettings
                    passwordData={passwordData}
                    setPasswordData={setPasswordData}
                    handlePasswordUpdate={handlePasswordUpdate}
                    showCurrentPassword={showCurrentPassword}
                    setShowCurrentPassword={setShowCurrentPassword}
                    showNewPassword={showNewPassword}
                    setShowNewPassword={setShowNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    setShowConfirmPassword={setShowConfirmPassword}
                    isSaving={isSaving}
                    handleDeleteAccount={handleDeleteAccount}
                  />
                )}
                {activeTab === 'notifications' && (
                  <NotificationSettings
                    notifications={notifications}
                    setNotifications={setNotifications}
                    handleNotificationUpdate={handleNotificationUpdate}
                    isSaving={isSaving}
                  />
                )}
                {activeTab === 'appearance' && (
                  <AppearanceSettings
                    appearance={appearance}
                    setAppearance={setAppearance}
                    handleAppearanceUpdate={handleAppearanceUpdate}
                    isSaving={isSaving}
                    theme={theme}
                    toggleTheme={toggleTheme}
                  />
                )}
                {activeTab === 'privacy' && (
                  <PrivacySettings
                    privacy={privacy}
                    setPrivacy={setPrivacy}
                    handlePrivacyUpdate={handlePrivacyUpdate}
                    isSaving={isSaving}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

// ============== Profile Settings Component ==============

function ProfileSettings({ profileData, setProfileData, handleProfileUpdate, isSaving }: any) {
  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
          <FiUser className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Profile Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Update your personal information</p>
        </div>
      </div>

      <form onSubmit={handleProfileUpdate} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full px-4 py-2.5 text-sm sm:text-base border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="w-full px-4 py-2.5 text-sm sm:text-base border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
            Bio
          </label>
          <textarea
            rows={3}
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            className="w-full px-4 py-2.5 text-sm sm:text-base border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            placeholder="Tell us a little about yourself..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Location
            </label>
            <input
              type="text"
              value={profileData.location}
              onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
              className="w-full px-4 py-2.5 text-sm sm:text-base border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="City, Country"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Website
            </label>
            <input
              type="url"
              value={profileData.website}
              onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
              className="w-full px-4 py-2.5 text-sm sm:text-base border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSaving}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <FiSave className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </form>
    </div>
  );
}

// ============== Security Settings Component ==============

function SecuritySettings({
  passwordData,
  setPasswordData,
  handlePasswordUpdate,
  showCurrentPassword,
  setShowCurrentPassword,
  showNewPassword,
  setShowNewPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  isSaving,
  handleDeleteAccount,
}: any) {
  return (
    <div className="space-y-6">
      {/* Change Password */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <FiLock className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Change Password</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Update your password to keep your account secure</p>
          </div>
        </div>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                className="w-full px-4 py-2.5 pr-12 text-sm sm:text-base border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showCurrentPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                className="w-full px-4 py-2.5 pr-12 text-sm sm:text-base border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showNewPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Password must be at least 6 characters</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                className="w-full px-4 py-2.5 pr-12 text-sm sm:text-base border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                {showConfirmPassword ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FiSave className="w-4 h-4" />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>

      {/* Delete Account */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-red-200/50 dark:border-red-800/30 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-xl">
            <FiTrash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-red-600 dark:text-red-400">Delete Account</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Once you delete your account, there is no going back. All your data will be permanently removed.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all font-medium"
        >
          <FiTrash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>
    </div>
  );
}

// ============== Notification Settings Component ==============

function NotificationSettings({ notifications, setNotifications, handleNotificationUpdate, isSaving }: any) {
  const notificationOptions = [
    { id: 'emailNotifications', label: 'Email Notifications', description: 'Receive notifications via email', icon: FiMail },
    { id: 'pushNotifications', label: 'Push Notifications', description: 'Receive push notifications on your device', icon: FiBell },
    { id: 'taskReminders', label: 'Task Reminders', description: 'Get reminded about upcoming tasks', icon: FiClock },
    { id: 'weeklyReports', label: 'Weekly Reports', description: 'Receive weekly summary of your tasks', icon: FiDatabase },
    { id: 'marketingEmails', label: 'Marketing Emails', description: 'Receive updates about new features', icon: FiGlobe },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
          <FiBell className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Notification Preferences</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Manage how you receive notifications</p>
        </div>
      </div>

      <div className="space-y-4">
        {notificationOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white dark:bg-gray-700 rounded-lg">
                  <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{option.label}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{option.description}</p>
                </div>
              </div>
              <div className="mt-3 sm:mt-0">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications[option.id]}
                    onChange={(e) => setNotifications({ ...notifications, [option.id]: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleNotificationUpdate}
        disabled={isSaving}
        className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <FiSave className="w-4 h-4" />
            Save Preferences
          </>
        )}
      </button>
    </div>
  );
}

// ============== Appearance Settings Component ==============

function AppearanceSettings({ appearance, setAppearance, handleAppearanceUpdate, isSaving, theme, toggleTheme }: any) {
  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
  ];

  const themeOptions = [
    { value: 'light', label: 'Light', icon: FiSun },
    { value: 'dark', label: 'Dark', icon: FiMoon },
    { value: 'system', label: 'System', icon: FiMonitor },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
          <FiMonitor className="w-5 h-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Appearance Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Customize how TaskFlow looks</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Theme Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = appearance.theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => {
                    setAppearance({ ...appearance, theme: option.value });
                    if (option.value !== theme) toggleTheme();
                  }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/25'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`} />
                  <span className={`text-sm font-medium ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Font Size</label>
          <div className="flex gap-2">
            {fontSizes.map((size) => (
              <button
                key={size.value}
                onClick={() => setAppearance({ ...appearance, fontSize: size.value })}
                className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  appearance.fontSize === size.value
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Compact View</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Reduce spacing for more content</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={appearance.compactView}
                onChange={(e) => setAppearance({ ...appearance, compactView: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Animations</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Enable smooth transitions and animations</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={appearance.animations}
                onChange={(e) => setAppearance({ ...appearance, animations: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={handleAppearanceUpdate}
        disabled={isSaving}
        className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <FiSave className="w-4 h-4" />
            Save Appearance
          </>
        )}
      </button>
    </div>
  );
}

// ============== Privacy Settings Component ==============

function PrivacySettings({ privacy, setPrivacy, handlePrivacyUpdate, isSaving }: any) {
  const visibilityOptions = [
    { value: 'public', label: 'Public', description: 'Anyone can view your profile' },
    { value: 'private', label: 'Private', description: 'Only you can view your profile' },
    { value: 'contacts', label: 'Contacts Only', description: 'Only your contacts can view your profile' },
  ];

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 p-4 sm:p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-xl">
          <FiShield className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Privacy Settings</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Control your privacy and visibility</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Profile Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Profile Visibility</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {visibilityOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setPrivacy({ ...privacy, profileVisibility: option.value })}
                className={`p-4 rounded-xl border-2 text-left transition-all ${
                  privacy.profileVisibility === option.value
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg shadow-blue-500/25'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <p className={`font-medium ${
                  privacy.profileVisibility === option.value ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  {option.label}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{option.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Options */}
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Show Email</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Display your email on your profile</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.showEmail}
                onChange={(e) => setPrivacy({ ...privacy, showEmail: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Show Online Status</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Display when you're online</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.showOnlineStatus}
                onChange={(e) => setPrivacy({ ...privacy, showOnlineStatus: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50/50 dark:bg-gray-700/30 rounded-xl border border-gray-200/50 dark:border-gray-700/50">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Allow Search</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to find you by email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={privacy.allowSearch}
                onChange={(e) => setPrivacy({ ...privacy, allowSearch: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>

      <button
        onClick={handlePrivacyUpdate}
        disabled={isSaving}
        className="mt-6 w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSaving ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <FiSave className="w-4 h-4" />
            Save Privacy Settings
          </>
        )}
      </button>
    </div>
  );
}