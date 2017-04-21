import { createActionCreators } from 'lib/redux/crud';
import * as actionTypes from './actionTypes';

const pathPrefix = '/todo/lists';

const lists = createActionCreators({
  actionTypes: actionTypes.lists,
  pathPrefix,
});

const items = createActionCreators({
  actionTypes: actionTypes.items,
  pathPrefix: '',
});

Object.keys(items).forEach(actionType => {
  const action = items[actionType];
  items[actionType] = (listId, ...args) => {
    const config = action(...args);
    config.payload.request.url = `${pathPrefix}/${listId}/items${config.payload.request.url}`;
    Object.assign(config.payload, {
      listId,
    });
    return config;
  };
});

items.toggle = (listId, id) => ({
  types: actionTypes.items.TOGGLE,
  payload: {
    request: {
      url: `${pathPrefix}/${listId}/items/${id}/toggle`,
      method: 'post',
    },
    listId,
    id,
  },
});

lists.findWithStats = () => ({
  types: actionTypes.lists.FIND_WITH_STATS,
  payload: {
    request: {
      url: `${pathPrefix}/find-with-stats`,
      method: 'GET',
    },
  },
});

export { lists, items };
