import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './../actions/authActions';
import classnames from 'classnames';
import isValidateEmail from './../utils/validateEmail';
import isValidatePassword from './../utils/validatePassword';
import { Growl } from 'primereact/growl';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      validation: {},
      serverError: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.showError = this.showError.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value.trim() });
    if (e.target.name === "email") {
      this.setState({ validation: { ...this.state.validation, email: !isValidateEmail(e.target.value) } });
    } else if (e.target.name === "password") {
      this.setState({ validation: { ...this.state.validation, password: !isValidatePassword(e.target.value) } });
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/customer-list')
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/customer-list');
    } else if (nextProps.errors.error) {
      this.showError(nextProps.errors.error.user_message);
    }
  }

  showError(message) {
    this.growl.show({ severity: 'error', summary: 'Error Message', detail: message });
  }

  onSubmit(e) {
    e.preventDefault();
    let loginData = {
      session: {
        email: this.state.email,
        password: this.state.password
      }
    };
    if (isValidateEmail(this.state.email) && isValidatePassword(this.state.password)) {
      this.props.loginUser(loginData)
    } else {
      this.showError('Please enter correct email and password')
    }
  }

  render() {
    let { validation } = this.state;
    return (
      <div>
        <div id="container">
          <div className="panel panel-default">
            <div className="panel-heading">Login <span className="r-circle"><i className="glyphicon glyphicon-globe"></i></span></div>
            <div className="panel-body">
              <form noValidate onSubmit={this.onSubmit}>
                <div className="form-group">
                  <label>Email</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                    <input type="email" className={classnames('form-control', { 'is-invalid': validation.email })} name="email" placeholder="email" maxLength="255" value={this.state.email} onChange={this.onChange} />
                  </div>
                  {validation.email && (<div className="invalid-feedback">Invalid Email</div>)}
                </div>
                <br />
                <div className="form-group">
                  <label>Password</label>
                  <div className="input-group">
                    <span className="input-group-addon"><i className="glyphicon glyphicon-lock"></i></span>
                    <input type="password" name="password" className={classnames('form-control', { 'is-invalid': validation.password })} placeholder="Password" maxLength="40" value={this.state.password} onChange={this.onChange} />

                  </div>
                  {validation.password && (<div className="invalid-feedback">Password must be atleast 6 characters</div>)}
                </div>
                <br />
                <button type="submit" className="btn btn-primary pull-right">Login</button>
              </form>
            </div>
          </div>

        </div>
        <Growl ref={(el) => this.growl = el} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(LoginPage);