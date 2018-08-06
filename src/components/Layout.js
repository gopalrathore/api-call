import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'

import CustomerListingPage from './CustomerListingPage';
import LoginPage from './LoginPage';
import NavBar from './NavBar';
import NotFoundPage from './NotFoundPage';

class Layout extends Component {
  render() {
    return (
      <Router>
      <div>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => (
              this.props.auth.isAuthenticated ? (
                <Redirect to="/customer-list" />
              ) : (
                  <Redirect to="/login" />
                )
            )} />
            <Route exact path="/login" component={LoginPage}></Route>
            <Route exact path="/customer-list" component={CustomerListingPage}></Route>
            <Route component={NotFoundPage}></Route>
          </Switch>
          </div>
          </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Layout);