import React, { PropTypes } from 'react';
import PassPropsRoute from 'components/routing/PassPropsRoute';
import { Route, Link } from 'react-router-dom';
import { Header, Divider } from 'semantic-ui-react';
import TodoLists from '../containers/Lists';
import ListForm from '../containers/forms/List';
import TodoList from './List';

const Todos = ({ workspaceId, pathname }) => (
  <div>
    <Header as="h2">
      <Link to={pathname}>Todos</Link>
    </Header>

    <Route
      exact
      path={`${pathname}`}
      render={() => (
        <div>
          <ListForm workspaceId={workspaceId} />
          <Divider />
          <TodoLists workspaceId={workspaceId} />
        </div>
      )}
    />

    <PassPropsRoute
      path={`${pathname}/:listId`}
      component={TodoList}
      passProps={{ workspaceId }}
    />
  </div>
);

Todos.propTypes = {
  workspaceId: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default Todos;
