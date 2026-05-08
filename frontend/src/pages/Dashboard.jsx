import Sidebar from '../components/layout/Sidebar';
import BoardCard from '../components/ui/BoardCard';
import CreateBoardCard from '../components/ui/CreateBoardCard';
import { useDashboard } from '../hooks/useDashboard';

export default function Dashboard() {
    const { boards, loading } = useDashboard();

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className="flex min-h-screen bg-slate-50">
            <Sidebar />

            <main className="flex-1 lg:ml-64 p-8 transition-all">
                <header className="mb-10">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Your Dashboards</h1>
                    <p className="text-slate-500 mt-2 text-lg">Manage and create your project boards here.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    <CreateBoardCard />
                    
                    {boards.map((board) => (
                        <BoardCard key={board.id} {...board} />
                    ))}
                </div>
            </main>
        </div>
    );
}