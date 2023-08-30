import { useState } from 'react';

export const usePagination = ({page, pages, perPage}) => {
    const [pagination, setPagination] = useState({
        page: page,
        pages: pages,
        perPage: perPage,
    });

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.pages) {
            setPagination(prevPagination => ({
                ...prevPagination,
                page: newPage,
            }));
        }
    };

    const handlePageSizeChange = (size) => {
        setPagination(prevPagination => ({
            ...prevPagination,
            perPage: size,
            page: 1,
        }));
    };

    return { pagination, setPagination, handlePageChange, handlePageSizeChange };
};
