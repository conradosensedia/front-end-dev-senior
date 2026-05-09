import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Rocket, BarChart3, Layout, Megaphone, Bug, Palette, Loader2 } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import { useDashboard } from '../hooks/useDashboard';
import { AVAILABLE_COLORS } from '../utils/colors';

const ICONS = [
    { id: 'rocket', icon: Rocket },
    { id: 'chart', icon: BarChart3 },
    { id: 'layout', icon: Layout },
    { id: 'megaphone', icon: Megaphone },
    { id: 'bug', icon: Bug },
    { id: 'palette', icon: Palette },
];

export default function CreateBoard() {
    const { createBoard } = useDashboard();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        color: AVAILABLE_COLORS[0],
        icon_key: 'rocket',
        tag: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await createBoard({
            name: formData.name,
            description: formData.description || '',
            theme_color: formData.color,
            icon_key: formData.icon_key,
            tag: formData.tag || ''
        });

        if (result.success) {
            navigate('/');
        } else {
            alert(result.error);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />
            <main className="flex-1 lg:ml-64 p-8">

                <nav className="flex items-center gap-2 text-sm text-slate-500 mb-4">
                    <Link to="/" className="hover:text-blue-600">Workspace</Link>
                    <ChevronRight size={14} />
                    <span className="font-medium text-slate-900">Boards</span>
                </nav>

                <h1 className="text-3xl font-bold text-slate-900">Create New Board</h1>
                <p className="text-slate-500 mb-8">Design a new space for your team's workflow.</p>

                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-4xl">
                    <div className="space-y-6">

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-700">
                                Board Name <span className="text-red-500">*</span>
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
                                Tag <span className="text-slate-400 font-normal">(optional)</span>
                            </label>
                            <input
                                className="w-full px-4 py-3 rounded-lg border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                                placeholder="e.g. urgent, marketing, design"
                                value={formData.tag}
                                onChange={e => setFormData({ ...formData, tag: e.target.value })}
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

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-semibold text-slate-700">Theme Color</label>
                            <div className="flex flex-wrap gap-4">
                                {AVAILABLE_COLORS.map(color => (
                                    <button
                                        key={color}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, color })}
                                        title={`Selecionar cor ${color}`}
                                        className={`
                                        w-10 h-10 rounded-full transition-all duration-200
                                        ${formData.color === color
                                                ? 'ring-4 ring-offset-2 scale-110'
                                                : 'opacity-70 hover:opacity-100 hover:scale-105'}
                                    `}
                                        style={{
                                            backgroundColor: color,
                                            boxShadow: formData.color === color ? `0 0 0 4px white, 0 0 0 6px ${color}` : 'none'
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-semibold text-slate-700">Board Icon</label>
                            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                                {ICONS.map(({ id, icon: Icon }) => (
                                    <button
                                        key={id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, icon_key: id })}
                                        className={`flex justify-center items-center p-4 rounded-xl border-2 transition-all h-16 ${formData.icon_key === id ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-400'}`}
                                    >
                                        <Icon size={24} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex gap-4">
                        <button
                            disabled={!formData.name || loading}
                            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                        >
                            {loading && <Loader2 className="animate-spin" size={18} />}
                            Create Board
                        </button>
                        <Link to="/" className="px-8 py-3 bg-white text-slate-600 border border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition-all text-center">
                            Cancel
                        </Link>
                    </div>
                </form>
            </main>
        </div>
    );
}