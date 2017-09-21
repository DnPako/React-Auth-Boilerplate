// Actions using redux-thunk

import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from './types';

// Server API
const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }, history) {
    return (dispatch) => {
        // Submit email and password to server
        axios.post(`${ROOT_URL}/signin`,{ email, password })
             .then(response => {// SUCESS
                        // Save token
                        localStorage.setItem('token', response.data.token);
                        // Update state to indicate authentication
                        dispatch({ type: AUTH_USER });
                        // Redirect to feature page
                        history.push('/feature');
                 })
             .catch(() => { // ERROR
                //  dispatch error message
                dispatch(authError('Bad Login infos!!!'));
             });
    };
}

export function signupUser({ email, password}, history) {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/signup`,{ email, password })
             .then( response => {
                 dispatch({ type: AUTH_USER});
                 localStorage.setItem('token', response.data.token);
                 history.push('/feature');
             })
             .catch(error => {
                dispatch(authError(error.response.data.error)) ;
             });
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    return {type: UNAUTH_USER};
}

// Action to return error message
export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}
