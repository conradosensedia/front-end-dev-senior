import { useState, useEffect } from 'react';

export function useKanban(boardId) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const mockTasks = [
            {
                id: 1,
                title: 'API Endpoint Refactoring',
                desc: 'Clean up the legacy controllers in the authentication module for better performance.',
                status: 'todo',
                priorityColor: 'bg-blue-600'
            },
            {
                id: 2,
                title: 'Docker Configuration',
                desc: 'Update Dockerfile to use a smaller alpine base image for faster CI/CD builds.',
                status: 'todo',
                priorityColor: 'bg-blue-600'
            },
            {
                id: 3,
                title: 'Unit Test Coverage',
                desc: 'Increase coverage to 85% for the core payment processing logic.',
                status: 'todo',
                priorityColor: 'bg-blue-600'
            },
            {
                id: 4,
                title: 'UI Design Implementation',
                desc: 'Translate the new design system components into Tailwind CSS utility classes.',
                status: 'inprogress',
                priorityColor: 'bg-blue-600'
            },
            {
                id: 5,
                title: 'Database Migration',
                desc: 'Upgrade Postgres instance to version 15 and optimize indexes.',
                status: 'done',
                priorityColor: 'bg-emerald-500'
            },
            {
                id: 6,
                title: 'SSL Certificate Renewal',
                desc: 'Renew production certificates and verify automated renewal scripts.',
                status: 'done',
                priorityColor: 'bg-emerald-500'
            }
        ];
        setTasks(mockTasks);
    }, [boardId]);

    const moveTask = async (taskId, newStatus) => {
        const previousTasks = [...tasks];

        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
        ));

        try {
            // await api.patch(`/tasks/${taskId}`, { status: newStatus });
        } catch (error) {
            setTasks(previousTasks);
            alert("Erro ao atualizar tarefa. Revertendo...");
        }
    };

    return {
        todoTasks: tasks.filter(t => t.status === 'todo'),
        inProgressTasks: tasks.filter(t => t.status === 'inprogress'),
        doneTasks: tasks.filter(t => t.status === 'done'),
        moveTask
    };
}