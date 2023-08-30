import { useState, useEffect } from 'react';
import {
  Header,
  Icon,
  Loader,
  Popup,
} from 'semantic-ui-react'
import { DataTable } from './components/DataTable'
import { Pagination } from './components/Pagination'
import httpClient from "./axios";

const UpToDateIcon = () => {
  const icon = <Icon name="checkmark" color="green" />;
  return <Popup content="Up to Date" trigger={icon} />;
};

const UpdateInProgressIcon = () => {
  const icon = <Loader active inline size="tiny" />;
  return <Popup content="Update In Progress" trigger={icon} />;
}

const UnauthorizedUserIcon = () => {
  const icon = <Icon name="warning sign" color="yellow" />;
  return <Popup content="Not Authorized" trigger={icon} />;
}

const computedDate = (dateString) => {

  if (dateString === null) {
    return 'Update in progress';
  }

  const date = new Date(dateString);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  }

  return date.toDateString();
}

const computedStatus = (rowData) => {
  if (rowData.finish_date === null) {
    return <UpdateInProgressIcon/>
  }

  if (rowData.firmware_status === 'latest') {
    return <UpToDateIcon/>
  }
}

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
  const [tableData, setTableData] = useState([]);
  const [sort, setSort] = useState({
    column: 'device_name',
    order: 'asc'
  });
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 1,
    perPage: 10
  })

  const fetchTableData = async () => {
    try {
      const response = await httpClient.axios.get('/users-with-related-data', {
        params: {
          column: sort.column,
          order: sort.order,
          page: pagination.page,
          perPage: pagination.perPage
        }
      });
      console.log('response.data', response.data)
      setTableData(response.data.data);
      setPagination(prevPagination => ({
        ...prevPagination,
        pages: response.data.pages,
        total: response.data.total,
      }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSort = (column) => {
    setSort({
      column: column,
      order: sort.order === 'asc' ? 'desc' : 'asc'
    })
  };

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
