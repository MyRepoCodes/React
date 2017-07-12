import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import Signup from './signup';
import Signin from './signin';
import ForgotPassword from './forgot_password';
import Register from './register';

class App extends Component {
	constructor(props) {
    super(props);
  }

	render() {
  	return (

      	<div className="scroll flex">
        		{
              this.props.location.pathname === '/' ? <Signup history={this.props.history}/> :
              this.props.location.pathname === '/forgot-password' ? <ForgotPassword history={this.props.history}/> :
              this.props.location.pathname === '/signin' ? <Signin history={this.props.history}/> :
              this.props.location.pathname === '/register' ? <Register /> :
              <Signup/>
            }
      	</div>

    );
	}
}

export default App;
