import { useState, useEffect } from 'react';

export function useDashboard() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBoards = () => {
            const data = [
                {
                    id: 1,
                    title: 'Marketing Launch',
                    desc: 'Q4 Campaign execution and asset tracking.',
                    tasks: 24,
                    date: 'Oct 12',
                    iconType: 'megaphone',
                },
                {
                    id: 2,
                    title: 'Product Roadmap',
                    desc: 'Strategic planning for version 2.0 release.',
                    tasks: 48,
                    date: 'Oct 10',
                    iconType: 'map',
                },
                {
                    id: 3,
                    title: 'Customer Feedback',
                    desc: 'User interviews and feature requests backlog.',
                    tasks: 12,
                    date: 'Oct 14',
                    iconType: 'feedback',
                    tag: 'URGENT',
                },
                {
                    id: 4,
                    title: 'Technical Debt',
                    desc: 'Backend refactoring and legacy code updates.',
                    tasks: 31,
                    date: 'Sep 28',
                    iconType: 'wrench',
                },
                {
                    id: 5,
                    title: 'HR Onboarding',
                    desc: 'Standard procedures for new engineering hires.',
                    tasks: 15,
                    date: 'Oct 05',
                    iconType: 'users',
                },
            ];

            setBoards(data);
            setLoading(false);
        };

        fetchBoards();
    }, []);

    return { boards, loading };
}