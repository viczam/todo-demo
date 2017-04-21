import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actionCreators';
import Items from '../components/Items';

class ItemsContainer extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    findMany: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired,
    deleteOne: PropTypes.func.isRequired,
    items: PropTypes.array,
  };

  static defaultProps = {
    items: [],
  };

  componentDidMount() {
    this.props.findMany(this.props.listId);
  }

  componentWillReceiveProps({ listId }) {
    if (listId !== this.props.listId) {
      this.props.findMany(listId);
    }
  }

  handleRemoveItem = id => this.props.deleteOne(this.props.listId, id);

  handleItemToggle = item => {
    const { listId } = this.props;
    this.props.toggle(listId, item._id);
  };

  render() {
    return <Items items={this.props.items} onItemToggle={this.handleItemToggle} />;
  }
}

const mapStateToProps = ({ todos }, ownProps) => ({
  items: (todos.itemIdsByListId[ownProps.listId] || []).map(id => todos.items.entities[id]),
});

export default connect(mapStateToProps, actions.items)(ItemsContainer);
