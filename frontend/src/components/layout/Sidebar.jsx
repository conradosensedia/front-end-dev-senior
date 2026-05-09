import { LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="hidden lg:flex flex-col w-64 z-40 bg-white border-r border-slate-200 h-screen fixed left-0 top-0">

            <div className="p-6 flex items-center gap-3">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                    <LayoutDashboard className="text-white w-6 h-6" />
                </div>
                <div>
                    <h2 className="font-bold text-slate-800 leading-tight">KanbanFlow</h2>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Productivity Workspace</p>
                </div>
            </div>

            <nav className="mt-4 flex-1">
                <ul className="space-y-1">
                    <li>
                        <Link to={`/`}>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-6 py-3 text-blue-600 bg-blue-50/50 border-l-4 border-blue-600 transition-all font-medium"
                            >
                                <LayoutDashboard size={20} />
                                <span>Dashboard</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}