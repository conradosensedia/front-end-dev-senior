import React from 'react';
import { MoreVertical, Rocket, BarChart3, Megaphone, Layout, Bug, Palette, Calendar, CheckSquare, Trash2 } from 'lucide-react';
import { getIconColorClasses } from '../../utils/colors';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  rocket: { icon: Rocket },
  chart: { icon: BarChart3 },
  layout: { icon: Layout },
  megaphone: { icon: Megaphone },
  bug: { icon: Bug },
  palette: { icon: Palette },
};

export default function BoardCard({ id, name, description, tasks_count, created_at, icon_key, theme_color, tag, onDelete }) {
  const IconData = iconMap[icon_key] || iconMap.wrench;
  const IconComponent = IconData.icon;
  const colorClasses = getIconColorClasses(theme_color);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);

  const handleCardClick = () => {
    navigate(`/board/${id}`);
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm(`Do you really want to delete the board "${name}"?`)) {
      onDelete(id);
    }
    setShowMenu(false);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white p-6 rounded-l border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col h-full"
    >

      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-xl ${colorClasses}`}>
          <IconComponent size={24} />
        </div>
        <div className="relative">
          <button
            onClick={toggleMenu}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-50 transition-all"
          >
            <MoreVertical size={20} />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-slate-100 shadow-xl rounded-lg z-10 py-1 overflow-hidden">
              <button
                onClick={handleDelete}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 size={16} />
                Delete Board
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-slate-800 text-lg leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {name}
          </h3>
          {tag && (
            <span className={`${colorClasses} text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider truncate max-w-[100px]`}>
              {tag}
            </span>
          )}
        </div>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-4 min-h-[40px]">
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
