import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { getSuccess } from '../../actions/login';
import { AUTH_CONST, AUTHTOKEN } from '../../actions/constants';

export default function requireAuths(Component) {

  class Authenticate extends React.Component {
    componentWillMount() {
      this.checkAuth(this.props.isAuthenticated);
    }

    componentWillReceiveProps(nextProps) {
      alert(1);
      this.checkAuth(nextProps.isAuthenticated);
    }

    checkAuth(isAuthenticated) {

      if (!isAuthenticated) {
        let token = this.props.token
          ? this.props.token
          : AUTHTOKEN;
        console.log('tokenAuth - ', this.props.token, 'tokenLocalStorage - ', AUTHTOKEN);

        if (token) {
          this.props.getSuccess(AUTH_CONST.LOGIN_SUCCESS, {
            response: {
              statusCode: 200,
              statusText: 'You are logged in successfully.',
              token: token
            }
          });

        } else {
          alert("ds");
          let redirectAfterLogin = this.props.location.pathname;
          console.log(redirectAfterLogin);
          //browserHistory.push('/');
        }
      }
    }

    render() {
      return (
        <div>
          {this.props.isAuthenticated === true
            ? <Component {...this.props}/>
            : null
}
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({ token: state.signup.token, isAuthenticated: state.signup.isAuthenticated});

  return connect(mapStateToProps, {getSuccess})(Authenticate);
}
