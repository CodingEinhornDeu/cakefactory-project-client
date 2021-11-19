import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from "../../services/auth.service";

class Signup extends Component {

  state = { username: '', password: '' }

  handleFormSubmit = (event) => {
    event.preventDefault(); // to prevent the reloading the page
    const { username, password } = this.state;

    authService.signup(username, password)
      .then(createdUser => {

        //reset form
        this.setState({
          username: "",
          password: "",
        });

        this.props.getUser(createdUser, true);
        this.props.history.push('/products');
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }


  render() {

    return (
      <div className="container">
        <form onSubmit={this.handleFormSubmit}>
          <label className="label">Username</label>
          <input className="input-field"
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
            <button type="submit"><b>Signup</b></button>
          </div>
        </form>
        {/* <button> <Link to={'/products'}> See the products</Link> </button> */}
        <p className="signup">
          Already have an account?
          <Link to={"/"}> Login</Link>
        </p>

      </div>
    )
  }

}

export default Signup;