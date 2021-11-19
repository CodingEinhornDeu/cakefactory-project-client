import React, { Component } from 'react';
import authService from '../../services/auth.service';
import { Link } from 'react-router-dom';

class Login extends Component {
  state = { username: '', password: '' };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;

    authService
      .login(username, password)
      .then(response => {
        this.setState({ username: '', password: '' });
        this.props.getUser(response, true);
        this.props.history.push('/products');
      })
      .catch(error => console.log(error));
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <label className="label">Username</label>
          <input autoComplete="off" className="input-field"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <label className="label">Password</label>
          <input className="input-field"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <div className="button">
            <div className="inner"></div>
            <button type="submit"><b>Login</b></button>
          </div>
        </form>

        <p className="signup">
          Don't have account?
          <Link to={'/signup'}> Signup</Link>
        </p>
      </div>
    );
  }
}

export default Login;
