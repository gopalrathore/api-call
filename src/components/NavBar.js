import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from './../actions/authActions';
// import { Link } from 'react-dom';

class NavBar extends Component {

  constructor(){
    super();

    this.onLogout = this.onLogout.bind(this);
  }

  onLogout(){
    this.props.logoutUser();
  }

  render() {
    return (      
      <nav className="header">
        <ul>
        <li className="brand"><a >Moka POS</a></li>
        { this.props.auth.isAuthenticated && <li onClick={this.onLogout}><a>Logout</a></li> }
        </ul>
      </nav>
      
    )
  }
}

const mapStateToProps = (state)=>({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(NavBar);