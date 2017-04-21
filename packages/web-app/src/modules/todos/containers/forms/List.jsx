import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Button } from 'semantic-ui-react';
import * as actions from '../../redux/actionCreators';
import TodoListForm from '../../forms/List';

class TodoListFormContainer extends Component {
  static propTypes = {
    createOne: PropTypes.func.isRequired,
  };

  state = {
    isFormVisible: false,
  };

  handleSubmit = data =>
    this.props
      .createOne(data)
      .then(() => {
        this.form.reset();
      })
      .catch(({ error }) => {
        throw new SubmissionError({ _error: error.response.data.message });
      });

  render() {
    const { isFormVisible } = this.state;

    if (!isFormVisible) {
      return (
        <Button size="tiny" primary onClick={() => this.setState({ isFormVisible: true })}>
          Add a new list
        </Button>
      );
    }

    return (
      <TodoListForm
        ref={form => {
          this.form = form;
        }}
        onSubmit={this.handleSubmit}
        onCancel={() => this.setState({ isFormVisible: false })}
      />
    );
  }
}

export default connect(null, actions.lists)(TodoListFormContainer);
