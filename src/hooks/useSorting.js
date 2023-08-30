import { useState } from 'react';

export const useSorting = (column, order) => {
    const [sort, setSort] = useState({
        column: column,
        order: order,
    });

    const handleSort = (column) => {
        setSort((prevSort) => ({
            column,
            order: prevSort.order === 'asc' ? 'desc' : 'asc',
        }));
    };

    return { sort, handleSort };
};
