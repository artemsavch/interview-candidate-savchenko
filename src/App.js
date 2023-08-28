import { useState, useEffect } from 'react';
import {
  Header,
  Icon,
  Loader,
  Popup,
} from 'semantic-ui-react'
import { DataTable } from './components/DataTable'
import { Pagination } from './components/Pagination'
import { gql, useQuery } from '@apollo/client';

const data = [
  { iconExample: true }, {}, {}, {}, {}, {}, {}, {}, {}, {},
]

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

const columns = [
  {
    id: 'status',
    render: (row) => row.iconExample && <UpdateInProgressIcon />,
    collapsing: true
  },
  {
    id: 'user',
    header: 'User',
    render: (row) => (
      <>
        {'my@email.com'}
        &nbsp;
        {row.iconExample && <UnauthorizedUserIcon />}
      </>
    ),
  },
  {
    id: 'name',
    header: 'Name',
    render: (row) => 'My Device',
  },
  {
    id: 'version',
    header: 'Firmware',
    render: (row) => '1.0.0',
  },
  {
    id: 'updated',
    header: 'Last Updated',
    render: (row) => '2021/06/27',
  },
]

function App() {
  return (
    <DataTable
      data={data}
      sortBy="user"
      columns={columns}
      sort={(columnId) => console.log({ columnId })}
      header={<Header>Devices to Update</Header>}
      footer={
        <Pagination
          current={1}
          total={2}
          size={10}
          sizes={[10, 25, 50]}
          setCurrent={(current) => console.log({ current })}
          setSize={(size) => console.log({ size })}
        />
      }
    />
  );
}

export default App;
