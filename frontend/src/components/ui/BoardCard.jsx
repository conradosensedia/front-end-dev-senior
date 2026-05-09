import { MoreHorizontal, MessageSquare, Map, Megaphone, Wrench, Users, Calendar, CheckSquare } from 'lucide-react';
import { getIconColorClasses } from '../../utils/colors';

const iconMap = {
  megaphone: { icon: Megaphone },
  map: { icon: Map },
  wrench: { icon: Wrench },
  users: { icon: Users },
  feedback: { icon: MessageSquare },
};

export default function BoardCard({ name, description, tasks_count, created_at, icon_key, theme_color, tag }) {
  const IconData = iconMap[icon_key] || iconMap.wrench;
  const IconComponent = IconData.icon;
  const colorClasses = getIconColorClasses(theme_color);

  return (
    <div className="bg-white p-6 rounded-l border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col h-full">

      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${colorClasses}`}>
          <IconComponent size={24} />
        </div>
        <button className="text-slate-400 hover:text-slate-600 transition-colors">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          {tag && (
            <span className="bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              {tag}
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-4 pt-4 border-t border-slate-50 mt-auto">
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
          <CheckSquare size={14} />
          <span>{tasks_count} {tasks_count === 1 ? 'Task' : 'Tasks'}</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
          <Calendar size={14} />
          <span>{created_at}</span>
        </div>
      </div>
    </div>
  );
}
