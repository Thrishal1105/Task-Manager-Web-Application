import React from 'react';
import TaskCard from './TaskCard';
import { FaPlus } from 'react-icons/fa';

const BoardView = ({ tasks, onStatusChange, onEdit, onDelete, onRestore, onAddNew, columns = [
    { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
    { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-500' },
    { id: 'completed', title: 'Completed', color: 'bg-green-500' },
] }) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full overflow-x-auto pb-4">
            {columns.map((column) => (
                <div key={column.id} className="flex flex-col h-full">
                    {/* Column Header */}
                    <div className="flex items-center justify-between mb-4 bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
                        <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${column.color}`}></div>
                            <h2 className="font-semibold text-gray-700 dark:text-gray-200">{column.title}</h2>
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300 text-xs font-bold px-2 py-0.5 rounded-full transition-colors duration-200">
                                {tasks.filter(t => (t.status || 'todo') === column.id).length}
                            </span>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                            <FaPlus />
                        </button>
                    </div>

                    {/* Task List */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                        {tasks
                            .filter((task) => (task.status || 'todo') === column.id)
                            .map((task) => (
                                <div key={task._id}>
                                    <TaskCard
                                        task={task}
                                        onStatusChange={onStatusChange}
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                        onRestore={onRestore}
                                    />
                                </div>
                            ))}

                        {/* Add Task Button at bottom of column */}
                        <button
                            onClick={() => onAddNew(column.id)}
                            className="w-full py-2 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl text-gray-400 dark:text-gray-500 font-medium hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-500 dark:hover:text-gray-400 transition-colors flex items-center justify-center gap-2"
                        >
                            <FaPlus /> Add Task
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default BoardView;
