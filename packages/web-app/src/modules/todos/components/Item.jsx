import React, { PropTypes } from 'react';
import { List, Checkbox, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import classNames from 'classnames';

const Wrapper = styled(List.Item)`
  .edit-btn {
    margin-left: 10px;
    display: none;
  }

  &.isChecked label {
    text-decoration: line-through;
  }

  &:hover .edit-btn {
    display: inline-block;
  }
`;

const Item = ({ title, isChecked, onToggle }) => (
  <Wrapper className={classNames({ isChecked })}>
    <List.Content>
      <Checkbox label={title} checked={isChecked} onChange={onToggle} />
      {!isChecked &&
        <Link to="/admin" className="edit-btn">
          <Icon name="edit" />
        </Link>}

    </List.Content>
  </Wrapper>
);

Item.propTypes = {
  title: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Item;
