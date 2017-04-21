import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { Menu, Input, Label } from 'semantic-ui-react';
import TodoListFormContainer from 'modules/todos/containers/forms/List';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  margin-top: 10px;
  min-height: 100%;
  width: 220px;
`;

const Sidebar = ({ lists }) => (
  <Wrapper>
    <Menu vertical>
      <Menu.Item>
        <Input placeholder="Search..." />
      </Menu.Item>

      {lists.map(list => (
        <Menu.Item name="inbox" key={list._id}>
          <Label color="teal">1</Label>
          <Link to={`/admin/lists/${list._id}`}>
            {list.name}
          </Link>
        </Menu.Item>
      ))}
    </Menu>

    <TodoListFormContainer />
  </Wrapper>
);

Sidebar.propTypes = {
  lists: PropTypes.array,
};

Sidebar.defaultProps = {
  workspaces: [],
  lists: [],
};

export default Sidebar;
