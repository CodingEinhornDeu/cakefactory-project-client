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

        this.props.getUser(createdUser,true);
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
        <h1>Signup</h1>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>

          <label>
            Password:
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>

          <button type="submit"> Signup </button>
        </form>
        {/* <button> <Link to={'/products'}> See the products</Link> </button> */}
        <p>
          Already have an account?
          <Link to={"/"}> Login</Link>
        </p>

      </div>
    )
  }

}

export default Signup;