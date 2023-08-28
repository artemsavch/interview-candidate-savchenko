import { Menu, Icon } from "semantic-ui-react";

export const Pagination = (props) => (
  <>
    <Menu floated="right" pagination>
      <Menu.Item
        as="a"
        icon
        disabled={props.current === 1}
        onClick={() => props.setCurrent(1)}
      >
        <Icon name="angle double left" />
      </Menu.Item>
      <Menu.Item
        as="a"
        icon
        disabled={props.current === 1}
        onClick={() => props.setCurrent(props.current - 1)}
      >
        <Icon name="angle left" />
      </Menu.Item>
      <Menu.Item active>
        Page {props.current} of {props.total}
      </Menu.Item>
      <Menu.Item
        as="a"
        icon
        disabled={props.current === props.total}
        onClick={() => props.setCurrent(props.current + 1)}
      >
        <Icon name="angle right" />
      </Menu.Item>
      <Menu.Item
        as="a"
        icon
        disabled={props.current === props.total}
        onClick={() => props.setCurrent(props.total)}
      >
        <Icon name="angle double right" />
      </Menu.Item>
    </Menu>
    <Menu floated="right" pagination>
      <Menu.Item active>Items per page</Menu.Item>
      {props.sizes.map((size) => (
        <Menu.Item
          key={size}
          onClick={() => {
            props.setSize(size);
            props.setCurrent(1);
          }}
          header={size === props.size}
          name={`${size}`}
        />
      ))}
    </Menu>
  </>
);
