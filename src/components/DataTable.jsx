import React from "react";
import { Table } from "semantic-ui-react";

export const DataTable = (props) => (
  <Table sortable celled>
    <Table.Header>
      {!!props.header && (
        <Table.Row>
          <Table.HeaderCell colSpan={props.columns.length}>
            {props.header}
          </Table.HeaderCell>
        </Table.Row>
      )}
      <Table.Row>
        {props.columns.map((column) => (
          <Table.HeaderCell
            key={column.id}
            sorted={
              props.sortBy.columnId === column.id ? "ascending" : undefined
            }
            onClick={() => props.sort(column.id)}
            collapsing={column.collapsing}
          >
            {column.header}
          </Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {props.data.map((item) => (
        <Table.Row key={item.id}>
          {props.columns.map((column) => (
            <Table.Cell
              key={column.id}
              collapsing={column.collapsing}
            >
              {column.render(item)}
            </Table.Cell>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
    <Table.Footer>
      {!!props.footer && (
        <Table.Row>
          <Table.HeaderCell colSpan={props.columns.length}>
            {props.footer}
          </Table.HeaderCell>
        </Table.Row>
      )}
    </Table.Footer>
  </Table>
);
