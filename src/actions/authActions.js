import { SET_CURRENT_USER } from './types';
import { GET_ERRORS } from './types';
import {BASE_URL} from './../configuration/config';
import axios from 'axios';
import setAuthToken from './../utils/setAuthToken';

export const loginUser = loginData => dispatch => {
  axios.post(`${BASE_URL}/account/v1/login`, loginData).then(res => {
    let { access_token } = res.data;
    let { user } = res.data;

    localStorage.setItem('currentUser',JSON.stringify(user));
    localStorage.setItem('remember_token', access_token);

    setAuthToken(access_token);
    dispatch(setCurrentUser(user))
  }).catch(err => {  
    let serverError = {error:{}};
      try {
        serverError = err.response.data        
      } catch (error) {
        serverError = {error:{user_message:"Network error occured."}};        
      }  
    dispatch({
      type: GET_ERRORS,
      payload: serverError
    })
  });
}

export const setCurrentUser = (userData) => {
  return {
    type: SET_CURRENT_USER,
    payload: userData
  }
}

export const logoutUser = () => dispatch => {  
  localStorage.removeItem('remember_token');
  localStorage.removeItem('currentUser');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}