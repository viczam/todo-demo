import React, { PropTypes } from 'react';
import form from 'hoc/form';
import Field from 'components/form/Field';
import Form from 'components/form/Form';
import { Button } from 'semantic-ui-react';
import Joi from 'joi';

const ListForm = (
  {
    handleSubmit,
    onCancel,
    initialValues,
  },
) => (
  <Form onSubmit={handleSubmit}>
    <Field name="name" component="input" type="text" hideLabel placeholder="List name" autoFocus />
    <Button content={initialValues._id ? 'Update' : 'Create'} primary type="submit" />
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

ListForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
};

ListForm.defaultProps = {
  initialValues: {},
};

export default form({
  form: 'todos.list',
  schema: Joi.object().keys({
    name: Joi.string().trim().required(),
  }),
})(ListForm);
