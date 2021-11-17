import './App.css';
import { Switch, Route } from 'react-router-dom';
import React, { Component } from 'react';
import ProductList from './components/products/ProductList';
import ProductDetails from './components/products/ProductDetails';
import axios from 'axios';
import AddProduct from './components/products/AddProduct';
import authService from './services/auth.service';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from './components/navbar/Navbar';
import OrderList from './components/orders/OrderList';
// import OrderDetails from './components/orders/OrderDetails';
import ShoppingCart from './components/orders/ShoppingCart';

class App extends Component {

  state = {
    isLoggedIn: false,
    user: null,
    listOfProducts: [],
    listOfOrders: [],
    shoppingCart: [],
  };


  addToCart = (productId) => {

    this.setState(prevState => {
      const productInShoppingCart = prevState.shoppingCart.find((elm) => elm._id === productId);

      if (productInShoppingCart) {
        productInShoppingCart.quantity++;
      } else {
        const productDetails = this.state.listOfProducts.find(elm => elm._id === productId);
        const productDetailsCopy = JSON.parse(JSON.stringify(productDetails)); //we create a copy to avoid mutating state
        productDetailsCopy.quantity = 1;
        prevState.shoppingCart.push(productDetailsCopy);
      }

      return {
        shoppingCart: prevState.shoppingCart
      };
    });

  }

  getTheUser = (userObj, loggedIn) => {
    this.setState({
      isLoggedIn: loggedIn,
      user: userObj
    });
  };

  fetchUser = () => {
    if (this.state.user === null) {
      authService
        .loggedin()
        .then((data) => {
          // console.log(data)
          if (data) {
            this.setState({
              user: data,
              isLoggedIn: true,
            });
          } else {
            this.setState({
              user: null,
              isLoggedIn: false,
            });
          }

        })

        .catch(err => {
          this.setState({
            user: null,
            isLoggedIn: false
          });
        });
    }
  };


  componentDidMount() {
    this.fetchUser();
    this.getAllProducts();
    this.getAllOrders();
  }



  getAllProducts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/products`)
      .then(responseFromApi => {
        this.setState({
          listOfProducts: responseFromApi.data
        })

      })
  }

  getAllOrders = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/orders`)
      .then(apiResponse => {
        this.setState({
          listOfOrders: apiResponse.data
        })
      })
  }





  render() {
console.log('cart', this.state.shoppingChart)
    return (
      <div className="App">
        <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
        <Switch><Route exact path="/" render={props => <Login {...props} getUser={this.getTheUser} />} />
          <Route exact path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
          <Route exact path="/products/add" render={props => <AddProduct getData={() => this.getAllProducts()}   />} />
          <Route exact path="/products" render={props => <ProductList allProductList={this.state.listOfProducts} />} />
          <Route exact path="/orders" render={props => <OrderList allOrderList={this.state.listOfOrders} />} />
          <Route
            exact path="/products/:id"
            render={props => {
              return <ProductDetails  {...props} addToCart={this.addToCart} />
            }}
          />
             return <ProductDetails  {...props}  addToCart={this.addToChart} newProduct = {productObj} />
           }} 
           />
        </Switch>
      </div>
    );
  }
}

export default App;
