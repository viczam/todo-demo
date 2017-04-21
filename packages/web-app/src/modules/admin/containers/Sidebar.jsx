import { connect } from 'react-redux';
import withAsync from 'hoc/withAsync';
import * as actions from 'modules/todos/redux/actionCreators';
import Sidebar from '../components/Sidebar';

const mapStateToProps = ({ todos: { lists } }) => ({
  lists: lists.ids.map(id => lists.entities[id]),
});

export default connect(mapStateToProps, actions.lists)(
  withAsync(({ findMany }) => findMany())(Sidebar),
);
