import { useState, useEffect } from 'react';
import api from '../services/api';

export function useDashboard() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBoards = async () => {
        try {
            setLoading(true);
            const response = await api.get('/boards');
            setBoards(response.data.data);
            setError(null);
        } catch (err) {
            setError('Error loading boards. Check the server connection.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const createBoard = async (data) => {
        try {
            setLoading(true);
            const payload = {
                name: data.name,
                description: data.description,
                theme_color: data.theme_color,
                icon_key: data.icon_key,
                tag: data.tag
            };

            await api.post('/boards', payload);
            await fetchBoards();
            return { success: true };
        } catch (err) {
            console.error(err);
            return { success: false, error: 'Erro ao criar board.' };
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    return { boards, loading, error, refresh: fetchBoards, createBoard };
}