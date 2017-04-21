import { connect } from 'react-redux';
import withAsync from 'hoc/withAsync';
import * as actions from '../redux/actionCreators';
import Lists from '../components/Lists';

const mapStateToProps = ({ todos: { lists } }) => ({
  lists: lists.ids.map(id => lists.entities[id]),
});

export default connect(mapStateToProps, actions.lists)(
  withAsync(({ findMany }) => findMany())(Lists),
);
