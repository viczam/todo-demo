import { Plugin } from 'makeen-core';
import ItemRepositoryService from './services/ItemRepository';
import ListRepositoryService from './services/ListRepository';
import ItemsRouter from './routers/Items';
import ListsRouter from './routers/Lists';

class Todo extends Plugin {
  async boot(server) {
    const ListRepository = new ListRepositoryService({
      store: this.createStore({ collectionName: 'TodoList' }),
    });

    const listsRouter = new ListsRouter(ListRepository);

    this.createResource('List', {
      repository: ListRepository,
      router: listsRouter,
    });

    const ItemRepository = new ItemRepositoryService({
      store: this.createStore({ collectionName: 'TodoItem' }),
    });

    const itemsRouter = new ItemsRouter({ ListRepository, ItemRepository });

    this.createResource('Item', {
      repository: ItemRepository,
      router: itemsRouter,
    });

    server.bind({
      ItemRepository,
      ListRepository,
    });
  }
}

export const { register } = new Todo();
