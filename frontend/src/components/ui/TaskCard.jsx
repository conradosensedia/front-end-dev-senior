export default function TaskCard({ task }) {
    const isDone = task.status === 'done';

    const borderColor = isDone ? 'border-l-emerald-500' : 'border-l-blue-600';

    return (
        <div className={`
        bg-white rounded-lg border border-slate-100 shadow-sm 
        flex flex-col transition-all overflow-hidden
        border-l-4 ${borderColor}
        ${isDone ? 'opacity-60' : 'opacity-100'}
      `}>
            <div className="p-4">
                <h4 className={`font-bold text-slate-800 text-[15px] leading-tight ${isDone ? 'line-through decoration-slate-400' : ''}`}>
                    {task.title}
                </h4>
                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {task.desc}
                </p>
            </div>
        </div>
    );
}