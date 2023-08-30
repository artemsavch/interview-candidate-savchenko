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
    render: row => row.firmware_version,
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

  const fetchTableData = async () => {
    try {
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
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    fetchTableData();
  }, [sort, pagination.page, pagination.perPage]);

  return (
    <DataTable
      data={tableData}
      sortBy="user"
      columns={columns}
      sort={columnId => handleSort(columnId)}
      header={<Header>Devices to Update</Header>}
      footer={
        <Pagination
          current={pagination.page}
          total={pagination.pages}
          size={pagination.perPage}
          sizes={[10, 25, 50]}
          setCurrent={current => handlePageChange(current)}
          setSize={size => handlePageSizeChange(size)}
        />
      }
    />
  );
}

export default App;
