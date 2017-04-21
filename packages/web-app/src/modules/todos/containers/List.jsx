import omit from 'lodash/omit';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Header, Icon } from 'semantic-ui-react';
import ListForm from '../forms/List';
import * as actions from '../redux/actionCreators';

class ListContainer extends Component {
  static propTypes = {
    list: PropTypes.object.isRequired,
    workspaceId: PropTypes.string.isRequired,
    updateOne: PropTypes.func.isRequired,
  };

  state = {
    isEditMode: false,
  };

  handleSubmit = (data) => (
    this.props.updateOne(
      this.props.workspaceId,
      this.props.list._id,
      omit(data, ['_id']),
    )
      .then(() => {
        this.setState({ isEditMode: false });
      })
      .catch(({ error }) => {
        throw new SubmissionError({ _error: error.response.data.message });
      })
  )

  renderViewMode() {
    const { list } = this.props;

    return (
      <div>
        <Header as="h2">
          {list.name}
          <a
            href=""
            onClick={(ev) => {
              ev.preventDefault();
              this.setState({ isEditMode: true });
            }}
            style={{ marginLeft: 10 }}
          >
            <Icon size="small" name="edit" />
          </a>
        </Header>

        {list.description &&
          <Header.Subheader dangerouslySetInnerHTML={{ __html: list.description }} /> // eslint-disable-line
        }
      </div>
    );
  }

  render() {
    const { isEditMode } = this.state;

    if (!isEditMode) {
      return this.renderViewMode();
    }

    return (
      <ListForm
        ref={(form) => { this.form = form; }}
        onSubmit={this.handleSubmit}
        onCancel={() => this.setState({ isEditMode: false })}
        initialValues={this.props.list}
      />
    );
  }
}

export default connect(null, actions.lists)(ListContainer);
