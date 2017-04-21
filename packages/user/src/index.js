/* eslint-disable class-methods-use-this */
import { Plugin } from 'makeen-core';
import * as MakeenUser from 'makeen-user';
import schema from './schemas/pluginOptions';

class User extends Plugin {
  constructor() {
    super({
      schema,
    });
  }

  async boot(server, options) {
    await server.register([
      {
        register: MakeenUser.register,
        options,
      },
    ]);
  }
}

export const { register } = new User();
