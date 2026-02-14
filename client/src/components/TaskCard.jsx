import React, { useState, useRef, useEffect } from 'react';
import { FaEllipsisH, FaEdit, FaTrash, FaCalendarAlt, FaUndo } from 'react-icons/fa';

const TaskCard = ({ task, onEdit, onDelete, onRestore }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const priorityColors = {
        high: 'bg-red-50 text-red-600 border-red-100',
        medium: 'bg-yellow-50 text-yellow-600 border-yellow-100',
        low: 'bg-blue-50 text-blue-600 border-blue-100',
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer mb-4 relative group">
            <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full border ${priorityColors[task.priority] || priorityColors.medium}`}>
                    {(task.priority || 'medium').toUpperCase()}
                </span>

                <div className="relative" ref={menuRef}>
                    <button
                        onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }}
                        className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <FaEllipsisH />
                    </button>

                    {showMenu && (
                        <div className="absolute right-0 top-6 w-32 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-100 dark:border-gray-700 z-20 py-1 overflow-hidden">
                            {task.status === 'trash' ? (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowMenu(false); onRestore(task._id); }}
                                        className="w-full text-left px-4 py-2 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 flex items-center gap-2"
                                    >
                                        <FaUndo size={12} /> Restore
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowMenu(false); onDelete(task._id); }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-2"
                                    >
                                        <FaTrash size={12} /> Delete Forever
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowMenu(false); onEdit(task); }}
                                        className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2"
                                    >
                                        <FaEdit size={12} /> Edit
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setShowMenu(false); onDelete(task._id); }}
                                        className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center gap-2"
                                    >
                                        <FaTrash size={12} /> Delete
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-200">{task.title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 transition-colors duration-200">{task.description}</p>

            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 text-xs font-medium mt-3 border-t border-gray-50 dark:border-gray-700 pt-3 transition-colors duration-200">
                <FaCalendarAlt />
                <span>{task.deadline ? new Date(task.deadline).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No Deadline'}</span>
            </div>
        </div>
    );
};

export default TaskCard;
