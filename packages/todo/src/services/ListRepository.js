import Boom from 'boom';
import { CRUDServiceContainer } from 'octobus-crud';
import { decorators } from 'octobus.js';
import listSchema from '../schemas/list';

const { service } = decorators;

class ListRepository extends CRUDServiceContainer {
  constructor({ store }) {
    super(store, listSchema);
  }

  setServiceBus(serviceBus) {
    super.setServiceBus(serviceBus);
    const List = serviceBus.extract('ListRepository');

    serviceBus.subscribe('user.User.didSignUp', ({ message }) => {
      const { account } = message.data;
      List.createOne({
        name: 'inbox',
        accountId: account._id,
      });
    });
  }

  @service()
  async deleteOne(params) {
    const ItemRepository = this.extract('ItemRepository');
    const { query } = params;
    const list = await this.findOne({ query });
    const result = await CRUDServiceContainer.prototype.deleteOne.call(
      this,
      params,
    );

    await Promise.all([
      ItemRepository.deleteMany({
        query: {
          listId: list._id,
        },
      }),
    ]);

    return result;
  }

  @service()
  async createOne(data) {
    const { name, accountId } = data;
    if (name && accountId) {
      const existingList = await this.findOne({
        query: {
          name,
          accountId,
        },
      });

      if (existingList) {
        throw Boom.badRequest('Name already used!');
      }
    }

    return CRUDServiceContainer.prototype.createOne.call(this, data);
  }

  @service()
  async findManyWithStats(params) {
    const ItemRepository = this.extract('ItemRepository');
    const lists = await this.findMany(params).then(c => c.toArray());
    const listIds = lists.map(({ _id }) => _id);

    const [items, checkedItemsPerList] = await Promise.all([
      ItemRepository.findMany({
        query: {
          listId: {
            $in: listIds,
          },
          isChecked: false,
        },
      }).then(c => c.toArray()),
      ItemRepository.aggregate({
        pipeline: [
          {
            $match: {
              listId: {
                $in: listIds,
              },
              isChecked: true,
            },
          },
          {
            $group: {
              _id: '$listId',
              count: {
                $sum: 1,
              },
            },
          },
        ],
      }).then(c => c.toArray()),
    ]);

    return {
      lists,
      items,
      checkedItemsPerList,
    };
  }
}

export default ListRepository;
