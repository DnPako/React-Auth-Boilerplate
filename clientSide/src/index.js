import React from 'react';
import { render } from 'react-dom';
// Redux connection & Router
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route, browserHistory } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
// Components
import App from './components/app';
import Home from './components/Home';
import Signin from './components/auth/Signin';
import Signout from './components/auth/Signout';
import Signup from './components/auth/Signup';
import RequireAuth from './components/auth/RequireAuth';
import Feature from './components/Feature';
// Reducers
import reducers from './reducers';
// Action type
import { AUTH_USER } from './actions/types';

// composeWithDevTools to show states on Redux DevTools
const createStoreWithMiddleware = composeWithDevTools(applyMiddleware(reduxThunk))(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');
// Check the existence of the token
// Then consider the user to be signed in
if(token){
    // Set state value 'authenticated'
    store.dispatch({type: AUTH_USER});
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <App>
            <Route exact path="/" component={Home}/>
            <Route path="/signin" component={Signin}/>
            <Route path="/signout" component={Signout}/>
            <Route path="/signup" component={Signup}/>
            <Route path="/feature" component={RequireAuth(Feature)}/>
        </App>
    </Router>
  </Provider>
  , document.querySelector('.container'));
