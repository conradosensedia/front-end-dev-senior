import { MoreHorizontal, Plus, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { DndContext, pointerWithin, KeyboardSensor, PointerSensor, useSensor, useSensors, useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Sidebar from '../components/layout/Sidebar';
import { useParams } from 'react-router-dom';
import { useKanban } from '../hooks/useKanban';
import { AddTaskModal } from '../components/modals/AddTaskModal';
import SortableTaskCard from '../components/ui/SortableTaskCard';

const Column = ({ id, title, status, tasks, count, onAddClick, onDeleteTask }) => {
    const { setNodeRef, isOver } = useDroppable({ id: status });

    return (
        <div
            ref={setNodeRef}
            className={`bg-slate-50/50 rounded-2xl p-4 flex flex-col gap-4 min-w-[320px] w-full transition-colors ${isOver ? 'bg-blue-50 border-2 border-dashed border-blue-200' : ''}`}
        >
            <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-700">{title}</h3>
                    <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">
                        {count}
                    </span>
                </div>
                <MoreHorizontal className="text-slate-400 cursor-pointer" size={18} />
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
                <SortableContext
                    items={tasks.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map(task => (
                        <SortableTaskCard
                            key={task.id}
                            task={task}
                            onDelete={onDeleteTask}
                        />
                    ))}
                </SortableContext>
                <button
                    onClick={() => onAddClick(status)}
                    className="flex items-center justify-center gap-2 w-full py-3 text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors mt-2 border border-dashed border-slate-300 hover:border-blue-400 rounded-xl group"
                >
                    <Plus size={16} className="group-hover:scale-125 transition-transform" />
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default function KanbanBoard() {
    const { id } = useParams();
    const { todoTasks, inProgressTasks, doneTasks, boardName, boardDesc, addTask, loading, deleteTask, moveTask } = useKanban(id);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [defaultStatus, setDefaultStatus] = useState('todo');

    const handleOpenModal = (status) => {
        setDefaultStatus(status);
        setIsModalOpen(true);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }), // Evita disparar drag em cliques simples
        useSensor(KeyboardSensor)
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
    
        if (!over) return;
    
        const activeId = active.id;
        const overId = over.id;
    
        const sourceStatus = 
            todoTasks.find(t => t.id === activeId) ? 'todo' :
            inProgressTasks.find(t => t.id === activeId) ? 'inprogress' :
            doneTasks.find(t => t.id === activeId) ? 'done' : null;
    
        let destinationStatus = overId;
    
        if (typeof overId === 'number' || (typeof overId === 'string' && !['todo', 'inprogress', 'done'].includes(overId))) {
            destinationStatus = 
                todoTasks.find(t => t.id === overId) ? 'todo' :
                inProgressTasks.find(t => t.id === overId) ? 'inprogress' :
                doneTasks.find(t => t.id === overId) ? 'done' : null;
        }
    
        if (sourceStatus && destinationStatus && sourceStatus !== destinationStatus) {
            moveTask(activeId, destinationStatus);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-8">

                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Link to="/" className="hover:text-blue-600">Workspace</Link>
                    <ChevronRight size={14} />
                    {boardName}
                </nav>

                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{boardName}</h1>
                        <p className="text-slate-500">{boardDesc}</p>
                    </div>
                    <button onClick={() => handleOpenModal('todo')} className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                        Create New Task
                    </button>
                </header>

                <DndContext
                    sensors={sensors}
                    collisionDetection={pointerWithin}
                    onDragEnd={handleDragEnd}
                >
                    <div className="flex gap-6 overflow-x-auto pb-4">
                        <Column
                            title="To Do"
                            status="todo"
                            id="todo"
                            tasks={todoTasks}
                            count={todoTasks.length}
                            boardId={id}
                            onAddClick={handleOpenModal}
                            onDeleteTask={deleteTask}
                        />
                        <Column
                            title="In Progress"
                            status="inprogress"
                            id="inprogress"
                            tasks={inProgressTasks}
                            count={inProgressTasks.length}
                            boardId={id}
                            onAddClick={handleOpenModal}
                            onDeleteTask={deleteTask}
                        />
                        <Column
                            title="Done"
                            status="done"
                            id="done"
                            tasks={doneTasks}
                            count={doneTasks.length}
                            boardId={id}
                            onAddClick={handleOpenModal}
                            onDeleteTask={deleteTask}
                        />
                    </div>
                </DndContext>

                <AddTaskModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={addTask}
                    defaultStatus={defaultStatus}
                />
            </main>
        </div>
    );
}