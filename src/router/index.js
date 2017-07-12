import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import promise from 'redux-promise';
import createBrowserHistory from 'history/createBrowserHistory'
//import components
import reducers from '../reducers';
import App from '../App.js';
import Auth from '../components/auth';
import Dashboard from '../components/dashboard';
import Questionnaire from '../components/questionnaire';

// Authorization
// import Authenticate from '../components/auth/authorize'

const createStoreWithMiddleware = applyMiddleware(promise, thunkMiddleware)(createStore);
const history = createBrowserHistory();

export default(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={history}>
        <Switch>
          <Route exact path="/" component={Auth}/>
          <Route path="/dashboard" component={Dashboard}/>
          <Route exact path="/questionnaire" component={Questionnaire}/>
          <Route component={Auth} />
        </Switch>
    </Router>
  </Provider>
);
