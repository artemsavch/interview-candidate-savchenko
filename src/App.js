import { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react'
import { DataTable } from './components/DataTable'
import { Pagination } from './components/Pagination'
import httpClient from "./services/httpClient";
import UnauthorizedUserIcon from "./components/icons/UnauthorizedUserIcon";
import { computedStatus, computedDate } from "./helper.js";
import {
  DEFAULT_SORT_COLUMN,
  DEFAULT_SORT_ORDER,
  DEFAULT_PAGINATION,
} from './shared/constants';
import { USERS_WITH_RELATED_DATA } from './shared/endpoints';
import { useSorting } from './hooks/useSorting';
import { usePagination } from './hooks/usePagination';
import PageLoader from "./components/loader/PageLoader.jsx";

const columns = [
  {
    id: 'status',
    render: row => computedStatus(row) ,
    collapsing: true
  },
  {
    id: 'email',
    header: 'User',
    render: row => (
      <>
        {row.email}
        &nbsp;
        {!row.is_admin && <UnauthorizedUserIcon />}
      </>
    ),
  },
  {
    id: 'device_name',
    header: 'Name',
    render: row => row.device_name,
  },
  {
    id: 'firmware_version',
    header: 'Firmware',
    render: row => row.firmware_label,
  },
  {
    id: 'finish_date',
    header: 'Last Updated',
    render: row => computedDate(row.finish_date),
  },
]

function App() {
  const { sort, handleSort } = useSorting(DEFAULT_SORT_COLUMN, DEFAULT_SORT_ORDER);
  const {
    pagination,
    setPagination,
    handlePageChange,
    handlePageSizeChange
  } = usePagination(DEFAULT_PAGINATION);

  const [tableData, setTableData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const response = await httpClient.axios.get(USERS_WITH_RELATED_DATA, {
        params: {
          column: sort.column,
          order: sort.order,
          page: pagination.page,
          perPage: pagination.perPage
        }
      });

      setTableData(response.data.data);

      setPagination(prevPagination => ({
        ...prevPagination,
        pages: response.data.pages,
        total: response.data.total,
      }));

      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('An error occurred while fetching data. Please try again.'); // Set the error state
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchTableData();
  }, [sort, pagination.page, pagination.perPage]);

  return (
      <>
        {isLoading && <PageLoader />}
        <DataTable
            data={tableData}
            sortBy={sort.column}
            sortDirection={sort.order}
            columns={columns}
            sort={columnId => handleSort(columnId)}
            itemsCount={pagination.total}
            header={<Header>Devices to Update</Header>}
            footer={
              <>
                {error && <div className="error-message">{error}</div>}
                <Pagination
                    current={pagination.page}
                    total={pagination.pages}
                    size={pagination.perPage}
                    sizes={[10, 25, 50]}
                    setCurrent={current => handlePageChange(current)}
                    setSize={size => handlePageSizeChange(size)}
                />
              </>
            }
        />
      </>
  );
}

export default App;
