import Boom from 'boom';
import { ObjectID as objectId } from 'mongodb';
import omit from 'lodash/omit';
import { route, MongoResourceRouter, mongoHelpers } from 'makeen-router';
import itemSchema from '../schemas/item';

const { idValidator } = mongoHelpers;

class ItemsRouter extends MongoResourceRouter {
  constructor({ ItemRepository, ListRepository }, config = {}) {
    super(ItemRepository, {
      namespace: 'TodoItems',
      basePath: '/lists/{listId}/items',
      entitySchema: omit(itemSchema, [
        '_id',
        'accountId',
        'listId',
        'createdBy',
        'createdAt',
        'updatedAt',
      ]),
      baseRouteConfig: {
        pre: [
          {
            method: MongoResourceRouter.wrapHandler(request =>
              ListRepository.findOne({
                query: {
                  _id: objectId(request.params.listId),
                  accountId: objectId(request.auth.credentials.accountId),
                },
              })),
            assign: 'list',
          },
        ],
        validate: {
          params: {
            listId: idValidator,
          },
        },
      },
      ...config,
    });

    this.applyContext({
      generateContext: request => ({
        accountId: objectId(request.auth.credentials.accountId),
        listId: request.pre.list._id,
      }),
    });

    this.routes.createOne.config.pre.push({
      async method(request, reply) {
        Object.assign(request.pre.payload, {
          createdBy: objectId(request.auth.credentials.id),
        });

        reply();
      },
    });
  }

  @route.post({
    path: '/{id}/toggle',
    config: {
      validate: {
        params: {
          id: idValidator,
        },
      },
      description: 'Toggle an item status (checked / unchecked)',
    },
  })
  async toggle(request) {
    const item = this.Repository.findOne({
      query: {
        accountId: objectId(request.auth.credentials.accountId),
        listId: request.pre.list._id,
        id: objectId(request.params.id),
      },
    });

    if (!item) {
      throw Boom.notFound(`Unable to find entity with id ${request.params.id}`);
    }

    const isChecked = !item.isChecked;

    await this.Repository.updateOne({
      query: {
        _id: item._id,
      },
      update: {
        $set: { isChecked },
      },
    });

    return {
      ...item,
      isChecked,
    };
  }
}

export default ItemsRouter;
