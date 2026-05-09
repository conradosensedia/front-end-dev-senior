export const ICON_COLOR_MAP: Record<string, string> = {
    '#2563eb': 'bg-blue-50 text-blue-600',
    '#f59e0b': 'bg-amber-50 text-amber-600',
    '#10b981': 'bg-emerald-50 text-emerald-600',
    '#ef4444': 'bg-red-50 text-red-600',
    '#6366f1': 'bg-indigo-50 text-indigo-600',
    '#1e293b': 'bg-slate-100 text-slate-700',
};

export const getIconColorClasses = (hex: string): string => {
    return ICON_COLOR_MAP[hex] || 'bg-gray-50 text-gray-600';
};

export const AVAILABLE_COLORS = Object.keys(ICON_COLOR_MAP);