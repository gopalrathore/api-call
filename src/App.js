import React, { Component } from 'react';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { Provider } from 'react-redux';
import store from './store';

import Layout from './components/Layout'

import 'primereact/resources/themes/omega/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './App.css';

if(localStorage.remember_token && localStorage.currentUser){
  setAuthToken(localStorage.remember_token);
  const currentUser = localStorage.getItem('currentUser');
  store.dispatch(setCurrentUser(JSON.parse(currentUser)));
}else {
  store.dispatch(logoutUser());
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
      <Layout></Layout>
      </Provider>
    );
  }
}



export default App;
