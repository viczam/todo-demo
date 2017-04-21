import { combineReducers } from 'redux';
import { createEntitiesReducers, createIdsReducerMap } from 'lib/redux/crud';
import { createReducer } from 'lib/redux/helpers';
import update from 'immutability-helper';
import * as actionTypes from './actionTypes';

const listsCRUDReducer = combineReducers(
  createEntitiesReducers({ actionTypes: actionTypes.lists }),
);

const lists = (
  state = {
    entities: {},
    ids: [],
  },
  action,
) => {
  switch (action.type) {
    case actionTypes.lists.FIND_WITH_STATS[1]:
      return {
        ...state,
        entities: action.payload.data.lists.reduce(
          (acc, item) => ({
            ...acc,
            [item._id]: item,
          }),
          state.entities,
        ),
        ids: state.ids.concat(
          action.payload.data.lists
            .filter(item => !state.ids.includes(item._id))
            .map(({ _id }) => _id),
        ),
      };
    default:
      return listsCRUDReducer(state, action);
  }
};

const itemsCRUDReducer = combineReducers(
  createEntitiesReducers({ actionTypes: actionTypes.items }),
);

const items = (
  state = {
    entities: {},
    ids: [],
  },
  action,
) => {
  switch (action.type) {
    case actionTypes.items.TOGGLE[1]:
      return update(state, {
        entities: {
          [action.meta.previousAction.payload.id]: {
            isChecked: {
              $set: action.payload.data.isChecked,
            },
          },
        },
      });
    case actionTypes.lists.FIND_WITH_STATS[1]:
      return {
        ...state,
        entities: action.payload.data.items.reduce(
          (acc, item) => ({
            ...acc,
            [item._id]: item,
          }),
          state.entities,
        ),
        ids: state.ids.concat(
          action.payload.data.items
            .filter(item => !state.ids.includes(item._id))
            .map(({ _id }) => _id),
        ),
      };
    default:
      return itemsCRUDReducer(state, action);
  }
};

const defaultItemIdsByListId = createIdsReducerMap({
  key: 'listId',
  actionTypes: actionTypes.items,
});

const itemIdsByListId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.lists.FIND_WITH_STATS[1]:
      return action.payload.data.items.reduce(
        (acc, item) => ({
          ...acc,
          [item.listId]: [...(acc[item.listId] || []), item._id],
        }),
        state,
      );
    default:
      return defaultItemIdsByListId(state, action);
  }
};

const sortedItemIds = createReducer(
  {},
  {
    [actionTypes.items.GET_SORTED]: (state, action) => ({
      ...state,
      [action.meta.previousAction.payload.listId]: action.payload.data,
    }),
    [actionTypes.lists.FIND_WITH_STATS[1]]: (state, action) =>
      action.payload.data.sortedItemIds.reduce(
        (acc, { listId, itemIds }) => ({
          ...acc,
          [listId]: itemIds,
        }),
        state,
      ),
  },
);

export default combineReducers({
  lists,
  items,
  itemIdsByListId,
  sortedItemIds,
});
