import React, { PropTypes } from 'react';
import withAsync from 'hoc/withAsync';
import { connect } from 'react-redux';
import { Divider } from 'semantic-ui-react';
import * as actions from '../redux/actionCreators';
import Items from '../containers/Items';
import ItemForm from '../containers/forms/Item';

const List = ({ list }) => (
  <div>
    <ItemForm listId={list._id} />
    <Divider />
    <Items listId={list._id} />
  </div>
);

List.propTypes = {
  list: PropTypes.object.isRequired,
};

const mapStateToProps = ({ todos: { lists } }, { match }) => ({
  list: lists.entities[match.params.listId],
});

export default connect(mapStateToProps, actions.lists)(
  withAsync(({ findById, match }) => findById(match.params.listId))(List),
);
