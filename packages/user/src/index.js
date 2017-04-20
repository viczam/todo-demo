import Joi from 'joi';
import * as MakeenUser from 'makeen-user';
import pkg from '../package.json';
import pluginOptionsSchema from './schemas/pluginOptions';

export async function register(server, options, next) {
  try {
    const pluginOptions = Joi.attempt(options, pluginOptionsSchema);

    await server.register([
      {
        register: MakeenUser.register,
        options: pluginOptions,
      },
    ]);

    next();
  } catch (err) {
    next(err);
  }
}

register.attributes = {
  pkg,
  dependencies: [],
};
