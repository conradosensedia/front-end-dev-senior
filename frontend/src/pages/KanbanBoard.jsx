import { MoreHorizontal, Plus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import TaskCard from '../components/ui/TaskCard';
import { useParams } from 'react-router-dom';
import { useKanban } from '../hooks/useKanban';


const Column = ({ title, tasks, count, onAdd, boardId }) => (
    <div className="bg-slate-50/50 rounded-2xl p-4 flex flex-col gap-4 min-w-[320px]">
        <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-700">{title}</h3>
                <span className="bg-slate-200 text-slate-600 text-xs px-2 py-0.5 rounded-full font-bold">
                    {count}
                </span>
            </div>
            <MoreHorizontal className="text-slate-400 cursor-pointer" size={18} />
        </div>

        <div className="flex flex-col gap-3 flex-1">
            {tasks.map(task => <TaskCard key={task.id} task={task} />)}

            <Link to={`/board/${boardId}/create-task`} className="w-full">
                <button className="flex items-center justify-center gap-2 w-full py-3 text-slate-500 hover:text-blue-600 font-medium text-sm transition-colors mt-2 border border-transparent hover:border-slate-200 rounded-xl">
                    <Plus size={16} /> Add Task
                </button>
            </Link>
        </div>
    </div>
);

export default function KanbanBoard() {
    const { id } = useParams();
    const { todoTasks, inProgressTasks, doneTasks } = useKanban(id);

    return (
        <div className="flex min-h-screen bg-white">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-8">

                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Link to="/" className="hover:text-blue-600">Workspace</Link>
                    <ChevronRight size={14} />
                    <Link to={`/board/${id}`} className="hover:text-blue-600">Board Name</Link>
                </nav>

                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Developer Sprint #42</h1>
                        <p className="text-slate-500">Simplified task management for active cycles.</p>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                        Create New Task
                    </button>
                </header>

                <div className="flex gap-6 overflow-x-auto pb-4">
                    <Column title="To Do" tasks={todoTasks} count={todoTasks.length} boardId={id} />
                    <Column title="In Progress" tasks={inProgressTasks} count={inProgressTasks.length} boardId={id} />
                    <Column title="Done" tasks={doneTasks} count={doneTasks.length} boardId={id} />
                </div>
            </main>
        </div>
    );
}