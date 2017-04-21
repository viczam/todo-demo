import Joi from 'joi';

export default {
  _id: Joi.object(),
  accountId: Joi.object().required(),
  listId: Joi.object().required(),

  title: Joi.string().trim().required(),
  isChecked: Joi.boolean().default(false),

  createdBy: Joi.object(),
  startDate: Joi.date(),
  dueDate: Joi.date(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
};
