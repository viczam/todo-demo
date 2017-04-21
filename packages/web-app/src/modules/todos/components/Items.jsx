import React, { PropTypes } from 'react';
import { List, Divider } from 'semantic-ui-react';
import Item from './Item';

const Items = ({ items, onItemToggle }) => {
  const activeItems = items.filter(({ isChecked }) => !isChecked);
  const completedItems = items.filter(({ isChecked }) => isChecked);

  return (
    <div>
      <List>
        {activeItems.map(item => (
          <Item
            key={item._id}
            title={item.title}
            isChecked={item.isChecked}
            onToggle={() => onItemToggle(item)}
          />
        ))}
      </List>
      {!activeItems.length && <p>No active items! Woo hoo!</p>}
      {!!completedItems.length && <Divider />}
      {!!completedItems.length &&
        <List style={{ marginBottom: 10 }}>
          {completedItems.map(item => (
            <Item
              key={item._id}
              title={item.title}
              isChecked={item.isChecked}
              onToggle={() => onItemToggle(item)}
            />
          ))}
        </List>}
    </div>
  );
};

Items.propTypes = {
  items: PropTypes.array.isRequired,
  onItemToggle: PropTypes.func.isRequired,
};

export default Items;
