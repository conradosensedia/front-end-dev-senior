import { Trash2 } from 'lucide-react';

export default function TaskCard({ task, onDelete }) {
    const isDone = task.status === 'done';

    const borderColor = isDone ? 'border-l-emerald-500' : 'border-l-blue-600';

    const handleDelete = (e) => {
        e.stopPropagation();
        if (window.confirm('Do you want to delete this task?')) {
            onDelete(task.id);
        }
    };

    return (
        <div className={`
            relative group bg-white rounded-lg border border-slate-100 shadow-sm 
            flex flex-col transition-all overflow-hidden
            border-l-4 ${borderColor}
            ${isDone ? 'opacity-60' : 'opacity-100 hover:opacity-100'}
            hover:shadow-md hover:border-slate-200
        `}>
            <button
                onClick={handleDelete}
                className="absolute top-2 right-2 p-1.5 rounded-md text-slate-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                title="Delete Task"
            >
                <Trash2 size={14} />
            </button>

            <div className="p-4">
                <h4 className={`font-bold text-slate-800 text-[15px] leading-tight ${isDone ? 'line-through decoration-slate-400' : ''}`}>
                    {task.title}
                </h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {task.description}
                </p>
            </div>
        </div>
    );
}