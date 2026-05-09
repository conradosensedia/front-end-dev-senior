export interface Board {
    id: number;
    name: string;
    description: string | null;
    theme_color: string;
    icon_key: string;
    tasks_count: number;
    created_at: string;
}