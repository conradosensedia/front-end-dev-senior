import { useState, useEffect } from 'react';

export function AddTaskModal({ isOpen, onClose, onAdd, defaultStatus = 'todo' }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: defaultStatus
    });

    useEffect(() => {
        if (isOpen) {
            setFormData(prev => ({ ...prev, status: defaultStatus }));
        }
    }, [isOpen, defaultStatus]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await onAdd(formData);
        if (res.success) {
            setFormData({ title: '', description: '', status: defaultStatus });
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">New Task</h2>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Title</label>
                        <input
                            required
                            className="w-full border border-slate-200 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                            placeholder="What needs to be done?"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Description</label>
                        <textarea
                            className="w-full border border-slate-200 rounded-lg p-2.5 h-24 resize-none outline-none focus:ring-2 focus:ring-blue-500"
                            value={formData.description}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Kanban Status</label>
                        <select 
                            className="w-full border border-slate-200 rounded-lg p-2.5 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none appearance-none cursor-pointer"
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value})}
                        >
                            <option value="todo">To Do</option>
                            <option value="inprogress">In Progress</option>
                            <option value="done">Done</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}