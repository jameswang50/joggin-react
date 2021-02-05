import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Visibility, Menu, Message } from 'semantic-ui-react';
import { setGlobalNotification } from 'containers/App/redux/actions';
import { makeSelectNotification } from 'containers/App/redux/selectors';

import './style.scss';

class Notification extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      fixedStyle: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification.get('visible') !== this.props.notification.get('visible')) {
      if (nextProps.notification.get('visible')) {
        this.timeout = setTimeout(() => {
          this.onDismiss();
        }, 5000);
      } else {
        clearTimeout(this.timeout);
      }
    }
  }

  onDismiss = () => {
    this.props.setNotification('', '', false);
  }

  stickNotification = () => this.setState({ fixedStyle: true })

  unstickNotification = () => this.setState({ fixedStyle: false })

  render() {
    const { notification, className } = this.props;
    const { fixedStyle } = this.state;
    const type = notification.get('type');

    if (!notification.get('visible')) {
      return null;
    }

    return (
      <Visibility
        className={className}
        onBottomPassed={this.stickNotification}
        onBottomVisible={this.unstickNotification}
        once={false}
      >
        <Menu
          borderless
          fixed={fixedStyle ? 'top' : undefined}
          className={fixedStyle ? 'fixed-notification' : 'sticky-notification'}
        >
          <Message
            className="notification-message"
            info={type === 'info'}
            success={type === 'success'}
            error={type === 'error'}
            header={notification.get('heading')}
            content={notification.get('message')}
            onDismiss={this.onDismiss}
          />
        </Menu>
      </Visibility>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),
});

const mapDispatchToProps = {
  setNotification: setGlobalNotification,
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Notification);
