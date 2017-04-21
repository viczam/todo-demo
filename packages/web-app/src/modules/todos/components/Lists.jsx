import React, { PropTypes } from 'react';
import List from '../components/List';

const Lists = ({ lists, workspaceId }) => (
  <div>
    {lists.map((list) => (
      <List
        key={list._id}
        list={list}
        workspaceId={workspaceId}
      />
    ))}
  </div>
);

Lists.propTypes = {
  lists: PropTypes.array,
  workspaceId: PropTypes.string.isRequired,
};

Lists.defaultProps = {
  lists: [],
};

export default Lists;
