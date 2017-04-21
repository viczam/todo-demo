import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Button } from 'semantic-ui-react';
import * as actions from '../../redux/actionCreators';
import ItemForm from '../../forms/Item';

class ItemFormContainer extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    createOne: PropTypes.func.isRequired,
  };

  state = {
    isFormVisible: false,
  };

  handleSubmit = data =>
    this.props
      .createOne(this.props.listId, data)
      .then(() => {
        this.form.reset();
      })
      .catch(({ error }) => {
        throw new SubmissionError({ _error: error.response.data.message });
      });

  render() {
    const { listId } = this.props;
    const { isFormVisible } = this.state;

    if (!isFormVisible) {
      return (
        <Button primary onClick={() => this.setState({ isFormVisible: true })}>
          Add a new item
        </Button>
      );
    }

    return (
      <ItemForm
        form={`todos.list${listId}.addItem`}
        ref={_form => {
          this.form = _form;
        }}
        onSubmit={this.handleSubmit}
        onCancel={() => this.setState({ isFormVisible: false })}
      />
    );
  }
}

export default connect(null, actions.items)(ItemFormContainer);
