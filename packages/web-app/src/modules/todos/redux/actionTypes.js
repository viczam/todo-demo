import { createActionTypes } from 'lib/redux/crud';
import { createAPIActionTypes } from 'lib/redux/helpers';

const namespace = 'todos';

export const lists = {
  ...createActionTypes(`${namespace}/lists`),
  FIND_WITH_STATS: createAPIActionTypes({ namespace, type: 'FIND_WITH_STATS' }),
};

export const items = {
  ...createActionTypes(`${namespace}/items`),
  TOGGLE: createAPIActionTypes({ namespace, type: 'ITEM_TOGGLE' }),
};
