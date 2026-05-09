import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

export function useKanban(boardId) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [boardName, setBoardName] = useState('');
    const [boardDesc, setBoardDesc] = useState('');

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            const response = await api.get(`/boards/${boardId}/tasks`);
            setBoardName(response.data.data.name);
            setBoardDesc(response.data.data.description);
            setTasks(response.data.data.tasks);
            setError(null);
        } catch (err) {
            setError('Error loading tasks.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [boardId]);

    useEffect(() => {
        if (boardId) fetchTasks();
    }, [boardId, fetchTasks]);

    const addTask = async (taskData) => {
        try {
            const response = await api.post(`/tasks`, {
                ...taskData,
                board_id: parseInt(boardId)
            });

            setTasks(prev => [...prev, response.data.data]);
            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false };
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);

            setTasks(prev => prev.filter(t => t.id !== taskId));
            return { success: true };
        } catch (err) {
            console.error("Error in delete task:", err);
            return { success: false };
        }
    };

    const moveTask = async (taskId, newStatus) => {
        const previousTasks = [...tasks];

        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));

        try {
            // await api.patch(`/tasks/${taskId}`, { status: newStatus });
        } catch (error) {
            setTasks(previousTasks);
            alert("Error updating task. Reverting...");
        }
    };

    return {
        todoTasks: tasks.filter(t => t.status === 'todo'),
        inProgressTasks: tasks.filter(t => t.status === 'inprogress'),
        doneTasks: tasks.filter(t => t.status === 'done'),
        boardName: boardName,
        boardDesc: boardDesc,
        loading,
        error,
        refresh: fetchTasks,
        addTask,
        deleteTask,
        moveTask
    };
}