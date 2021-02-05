import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { Header, Segment, Container, Form, Button, Dimmer, Loader, Dropdown } from 'semantic-ui-react';
import { makeSelectCurrentUser } from 'containers/App/redux/selectors';
import {
  userLoadRequest,
  updateUserField,
  userSaveRequest,
  loadNewUser,
} from '../redux/actions';
import { makeSelectUser, makeSelectUserLoading } from '../redux/selectors';

class UserPage extends Component {
  componentWillMount() {
    this.loadUser(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.loadUser(nextProps.match.params.id);
    }
  }

  onSubmit = () => {
    this.props.userSave();
  }

  onUpdateField = (field) => (evt) => {
    this.props.updateField(field, evt.target.value);
  }

  onUpdateDropdown = (field) => (evt, data) => {
    this.props.updateField(field, data.value);
  }

  loadUser = (id) => {
    const { userLoad } = this.props;
    if (id === 'new') {
      this.props.loadNewUser();
    } else {
      userLoad(id);
    }
  }

  render() {
    const { currentUser, user, loading } = this.props;
    const roleOptions = [{
      key: 'user',
      value: 'user',
      text: 'user',
    }, {
      key: 'manager',
      value: 'manager',
      text: 'manager',
    }, {
      key: 'admin',
      value: 'admin',
      text: 'admin',
    }];

    return (
      <Container fluid>
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <Header as="h2" content={user.get('_id') ? 'Edit User' : 'New User'} />
        <Form onSubmit={this.onSubmit}>
          <Segment>
            <Header as="h4" content="Basic Info" dividing />
            <Form.Input label="First Name" required value={user.get('firstName') || ''} onChange={this.onUpdateField('firstName')} />
            <Form.Input label="Last Name" required value={user.get('lastName') || ''} onChange={this.onUpdateField('lastName')} />
            <Form.Input label="Email" type="email" required value={user.get('email') || ''} onChange={this.onUpdateField('email')} />
            <Form.Input label="Password" type="password" value={user.get('password') || ''} onChange={this.onUpdateField('password')} />
            {currentUser.get('role') === 'admin' && <Form.Field inline required>
              <label>Role</label>
              <Dropdown placeholder="Select Role" fluid selection options={roleOptions} value={user.get('role') || 'user'} onChange={this.onUpdateDropdown('role')} />
            </Form.Field>}
          </Segment>
          <Button color="blue">Save</Button>&nbsp;&nbsp;
          <Link to="/users">Cancel</Link>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectUserLoading(),
});

const mapDispatchToProps = {
  userLoad: userLoadRequest,
  updateField: updateUserField,
  userSave: userSaveRequest,
  loadNewUser,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(UserPage);
