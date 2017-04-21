import React, { PropTypes } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
// import CommentGroup from 'modules/comments/containers/CommentGroup';
import Items from '../containers/Items';
import ItemForm from '../containers/forms/Item';

const List = ({ list, workspaceId }) => (
  <Segment>
    <Header as="h3">
      <Link to={`/admin/ws/${workspaceId}/todos/${list._id}`}>{list.name}</Link>
      <Header.Subheader>
        {list.description}
      </Header.Subheader>
    </Header>
    <Items listId={list._id} workspaceId={workspaceId} />
    <ItemForm listId={list._id} workspaceId={workspaceId} />
    {/* <CommentGroup thread={`TodoList.${list._id}`} /> */}
  </Segment>
);

List.propTypes = {
  list: PropTypes.object.isRequired,
  workspaceId: PropTypes.string.isRequired,
};


export default List;
