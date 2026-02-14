import React from 'react';
import { FaThLarge, FaTasks, FaCheckCircle, FaSpinner, FaUsers, FaTrashAlt, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../firebase';

const Sidebar = ({ activeFilter, onFilterChange, isOpen, onClose }) => {
    // const location = useLocation(); // No longer needed for logic, but maybe for clean up

    const handleLogout = () => {
        auth.signOut();
    };

    const navItems = [
        { name: 'Tasks', icon: <FaTasks />, filter: 'all' },
        { name: 'Completed', icon: <FaCheckCircle />, filter: 'completed' },
        { name: 'In Progress', icon: <FaSpinner />, filter: 'in_progress' },
        { name: 'Trash', icon: <FaTrashAlt />, filter: 'trash' },
    ];

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={onClose}
                ></div>
            )}

            <div className={`
                fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out
                md:translate-x-0 md:static md:h-screen md:flex md:flex-col
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">T</div>
                        <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">TaskMaster</span>
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="md:hidden text-gray-500 hover:text-gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 overflow-y-auto py-4">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.name} className="px-4 mb-2">
                                <button
                                    onClick={() => {
                                        onFilterChange(item.filter);
                                        onClose(); // Close sidebar on selection (mobile)
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeFilter === item.filter
                                        ? 'bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {item.icon}
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <FaSignOutAlt />
                        Logout
                    </button>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
