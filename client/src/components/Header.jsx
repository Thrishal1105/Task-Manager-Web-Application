import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaPlus, FaUserCircle, FaKey, FaSignOutAlt, FaBars, FaSun, FaMoon } from 'react-icons/fa';
import { auth } from '../firebase';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ onSearch, onAddTask, onToggleSidebar }) => {
    const { currentUser } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const userMenuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = () => {
        auth.signOut();
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = await currentUser.getIdToken();
            await axios.post('http://localhost:5000/api/users/change-password',
                { newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Password updated successfully');
            setShowPasswordModal(false);
            setNewPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-8 py-4 transition-colors duration-200">
            <div className="flex items-center gap-4">
                <button onClick={onToggleSidebar} className="md:hidden text-gray-600 hover:text-gray-900">
                    <FaBars size={24} />
                </button>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800">Tasks</h1>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
                {/* Search Bar */}
                {/* Search Bar - Hidden on small mobile */}
                <div className="relative hidden sm:block">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 border-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:bg-white dark:focus:bg-gray-600 transition-all text-sm w-40 md:w-64 text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
                        onChange={(e) => onSearch(e.target.value)}
                    />
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 transition-colors"
                    title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
                >
                    {theme === 'light' ? <FaMoon size={20} /> : <FaSun size={20} className="text-yellow-400" />}
                </button>

                {/* Add Task Button */}
                <button
                    onClick={onAddTask}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 md:px-5 md:py-2.5 rounded-lg font-medium shadow-md shadow-blue-500/20 transition-all"
                >
                    <FaPlus />
                    <span className="hidden md:inline">Create Task</span>
                </button>

                {/* User Profile Dropdown */}
                <div className="relative" ref={userMenuRef}>
                    <button
                        onClick={() => setShowUserMenu(!showUserMenu)}
                        className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg hover:bg-blue-200 transition-colors"
                    >
                        {currentUser?.email?.charAt(0).toUpperCase() || 'U'}
                    </button>

                    {showUserMenu && (
                        <div className="absolute right-0 top-12 w-48 bg-white shadow-xl rounded-lg border border-gray-100 z-50 py-1 overflow-hidden">
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="text-sm font-semibold text-gray-800 truncate">{currentUser?.email}</p>
                            </div>
                            <button
                                onClick={() => { setShowUserMenu(false); setShowPasswordModal(true); }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                            >
                                <FaKey size={14} /> Change Password
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                                <FaSignOutAlt size={14} /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Change Password Modal */}
            {showPasswordModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Change Password</h2>
                        <form onSubmit={handleChangePassword}>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none mb-4"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                minLength={6}
                                required
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordModal(false)}
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {loading ? 'Updating...' : 'Update Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
