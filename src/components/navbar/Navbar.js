import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/auth.service';
class Navbar extends Component {
  logoutUser = () => {
    authService.logout().then(() => {
      this.props.getUser(null, false);
    });
  };

  render() {
    const { userIsLoggedIn, userData } = this.props;
    
    if (userIsLoggedIn) {
      return (
        <div>
          <h1 className="logo">🧁CAKE FACTORY🧁</h1>
        <nav className="nav-style">
          <ul>
          {userIsLoggedIn && <li className="welcome">Welcome, {userData.username}</li>}
            <div className="right-nav">
            <li>
              <Link to="/products" style={{ textDecoration: 'none', color:'deeppink', fontSize:'20px'}}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/orders" style={{ textDecoration: 'none', color:'deeppink', fontSize:'20px'}}>
                Orders
              </Link>
            </li>
            <li>
            <Link to="/orders/shoppingcart" style={{ textDecoration: 'none', color:'deeppink', fontSize:'20px'}}>
            Your Shopping 🛒
              </Link>
            </li>
            <li>
              <Link to="/">
                <button className="logout" onClick={() => this.logoutUser()}>Logout</button>
              </Link>
            </li>
            </div>
          </ul>
        </nav>
        </div>
      );
    } else {
      return (
        <div>
           <h1 className="logo">🧁CAKE FACTORY🧁</h1>
          <nav className="nav-style">
         
            {/* <ul>
              <li>
                <Link to="/" style={{ textDecoration: 'none' }}>
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                  Signup
                </Link>
              </li>
            </ul> */}
          </nav>
        </div>
      );
    }
  }
}

export default Navbar;