import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';

export default function CreateBoard() {
    const { boardId } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            navigate('/');
        }, 1500);
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-8">

                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Link to="/" className="hover:text-blue-600">Workspace</Link>
                    <ChevronRight size={14} />
                    <span className="font-medium text-slate-900">Developer Sprint #42</span>
                    <ChevronRight size={14} />
                    <span className="font-medium text-slate-900">New Task</span>
                </nav>

                <h1 className="text-3xl font-bold text-slate-900">Create New Task</h1>
                <p className="text-slate-500 mb-8">Create a new task in Developer Sprint #42 board</p>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-4xl">
                    <div className="space-y-6">

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700">
                                Task Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                placeholder="e.g. Q4 Marketing Strategy"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700">
                                Description <span className="text-slate-400 font-normal">(optional)</span>
                            </label>
                            <textarea
                                rows="4"
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all resize-none"
                                placeholder="What is the goal of this board?"
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <button
                            disabled={!formData.name || loading}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                        >
                            {loading && <Loader2 className="animate-spin" size={18} />}
                            Create Task
                        </button>
                        <Link to={`/board/${boardId}`} className="px-8 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-center">
                            Cancel
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
}