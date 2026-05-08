import { MoreHorizontal, MessageSquare, Map, Megaphone, Wrench, Users, Calendar, CheckSquare } from 'lucide-react';

const iconMap = {
  megaphone: { icon: Megaphone, color: 'bg-blue-50 text-blue-600' },
  map: { icon: Map, color: 'bg-indigo-50 text-indigo-600' },
  wrench: { icon: Wrench, color: 'bg-slate-100 text-slate-600' },
  users: { icon: Users, color: 'bg-blue-50 text-blue-600' },
  feedback: { icon: MessageSquare, color: 'bg-orange-50 text-orange-600' },
};

export default function BoardCard({ title, desc, tasks, date, iconType, tag }) {
  const IconData = iconMap[iconType] || iconMap.wrench;
  const IconComponent = IconData.icon;

  return (
    <div className="bg-white p-6 rounded-l border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col h-full">

      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${IconData.color}`}>
          <IconComponent size={24} />
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          {tag && (
            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {tag}
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {desc}
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-slate-50 mt-auto">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
          <CheckSquare size={14} />
          <span>{tasks} Tasks</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
          <Calendar size={14} />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}

export function CreateBoardCard() {
    return (
      <div className="border-2 border-dashed border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[250px] hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
          <span className="text-slate-400 text-3xl group-hover:text-blue-600">+</span>
        </div>
        <span className="text-slate-500 font-semibold group-hover:text-blue-600">Create New Board</span>
      </div>
    );
  }