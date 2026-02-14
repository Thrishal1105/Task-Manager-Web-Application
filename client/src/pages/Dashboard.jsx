import React, { useState, useEffect } from 'react';
import api from '../utils/api';
// ... other imports

export default function Dashboard() {
    const { currentUser } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    // Confirmation Modal State
    const [confirmation, setConfirmation] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        isDanger: false,
        confirmText: 'Confirm'
    });

    useEffect(() => {
        fetchTasks();
    }, []);

    const getAuthHeader = async () => {
        const token = await currentUser.getIdToken();
        return { headers: { Authorization: `Bearer ${token}` } };
    };

    const fetchTasks = async () => {
        try {
            const config = await getAuthHeader();
            const response = await api.get('/api/tasks', config);
            setTasks(response.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setLoading(false);
        }
    };

    // ...

    const handleSaveTask = async (taskData) => {
        try {
            const config = await getAuthHeader();
            if (taskToEdit && taskToEdit._id) {
                await api.put(`/api/tasks/${taskToEdit._id}`, taskData, config);
            } else {
                await api.post('/api/tasks', taskData, config);
            }
            fetchTasks();
            handleCloseModal();
        } catch (error) {
            console.error("Error saving task:", error);
            alert("Failed to save task");
        }
    };

    const handleDeleteTask = (taskId) => {
        const task = tasks.find(t => t._id === taskId);
        const isPermanent = task && task.status === 'trash';

        setConfirmation({
            isOpen: true,
            title: isPermanent ? 'Delete Task Forever?' : 'Move to Trash?',
            message: isPermanent
                ? 'This action cannot be undone. Are you sure you want to permanently delete this task?'
                : 'Are you sure you want to move this task to trash?',
            isDanger: true,
            confirmText: 'Delete',
            onConfirm: async () => {
                try {
                    const config = await getAuthHeader();
                    if (isPermanent) {
                        await api.delete(`/api/tasks/${taskId}`, config);
                    } else {
                        await api.put(`/api/tasks/${taskId}`, { status: 'trash' }, config);
                    }
                    fetchTasks();
                } catch (error) {
                    console.error("Error deleting task:", error);
                    alert("Failed to delete task");
                }
            }
        });
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            const config = await getAuthHeader();
            await api.put(`/api/tasks/${taskId}`, { status: newStatus }, config);
            fetchTasks();
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    const handleRestoreTask = (taskId) => {
        setConfirmation({
            isOpen: true,
            title: 'Restore Task?',
            message: 'Do you want to restore this task to your board?',
            isDanger: false,
            confirmText: 'Restore',
            onConfirm: async () => {
                try {
                    const config = await getAuthHeader();
                    await api.put(`/api/tasks/${taskId}`, { status: 'todo' }, config);
                    fetchTasks();
                } catch (error) {
                    console.error("Error restoring task:", error);
                    alert("Failed to restore task");
                }
            }
        });
    };

    // Filter tasks based on search
    // Filter tasks based on search
    const getFilteredTasks = () => {
        let filtered = tasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        if (filter === 'all') {
            return filtered.filter(t => t.status !== 'trash');
        } else {
            return filtered.filter(t => t.status === filter);
        }
    };

    const filteredTasks = getFilteredTasks();

    const getColumns = () => {
        if (filter === 'all') {
            return [
                { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
                { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-500' },
                { id: 'completed', title: 'Completed', color: 'bg-green-500' },
            ];
        } else if (filter === 'completed') {
            return [{ id: 'completed', title: 'Completed', color: 'bg-green-500' }];
        } else if (filter === 'in_progress') {
            return [{ id: 'in_progress', title: 'In Progress', color: 'bg-yellow-500' }];
        } else if (filter === 'trash') {
            return [{ id: 'trash', title: 'Trash', color: 'bg-red-500' }];
        }
        return [];
    };

    if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;



    // ... (hooks)

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden font-sans transition-colors duration-200">
            {/* Sidebar */}
            <Sidebar
                activeFilter={filter}
                onFilterChange={setFilter}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0">
                <Header
                    onSearch={setSearchTerm}
                    onAddTask={() => handleOpenModal()}
                    onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
                />

                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
                    <div className="mb-6 flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            {filter === 'all' ? 'Board View' :
                                filter === 'trash' ? 'Trash' :
                                    filter === 'completed' ? 'Completed Tasks' : 'In Progress'}
                        </h2>
                        <div className="flex gap-2">
                            {/* Filter and Sort removed */}
                        </div>
                    </div>

                    <div className="h-[calc(100vh-180px)]">
                        <BoardView
                            tasks={filteredTasks}
                            columns={getColumns()}
                            onStatusChange={handleStatusChange}
                            onEdit={handleOpenModal}
                            onDelete={handleDeleteTask}
                            onRestore={handleRestoreTask}
                            onAddNew={(status) => {
                                setTaskToEdit({ status }); // Preset status for new task
                                setIsModalOpen(true);
                            }}
                        />
                    </div>
                </main>
            </div>

            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSaveTask}
                taskToEdit={taskToEdit}
            />

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={confirmation.isOpen}
                onClose={() => setConfirmation({ ...confirmation, isOpen: false })}
                onConfirm={confirmation.onConfirm}
                title={confirmation.title}
                message={confirmation.message}
                isDanger={confirmation.isDanger}
                confirmText={confirmation.confirmText}
            />
        </div>
    );
}
