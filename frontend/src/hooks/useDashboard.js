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

    useEffect(() => {
        fetchBoards();
    }, []);

    return { boards, loading, error, refresh: fetchBoards };
}