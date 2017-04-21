import React, { PropTypes } from 'react';
import form from 'hoc/form';
import Field from 'components/form/Field';
import Form from 'components/form/Form';
import { Button } from 'semantic-ui-react';
import Joi from 'joi';

const ItemForm = (
  {
    handleSubmit,
    onCancel,
  },
) => (
  <Form onSubmit={handleSubmit}>
    <Field
      name="title"
      component="input"
      type="text"
      hideLabel
      placeholder="What to do?"
      autoFocus
    />
    <Button content="Add" primary type="submit" />
    {onCancel &&
      <a
        href=""
        onClick={ev => {
          ev.preventDefault();
          onCancel();
        }}
      >
        Cancel
      </a>}
  </Form>
);

ItemForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default form({
  form: 'todos.item',
  schema: Joi.object().keys({
    title: Joi.string().trim().required(),
  }),
})(ItemForm);
