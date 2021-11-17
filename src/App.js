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


class App extends Component {

  state = {
    isLoggedIn: false,
    user: null,
    listOfProducts: [],
    listOfOrders: [],
    shoppingCart: []
  };


  addToCart =(newProduct)=>{ 
 
    this.setState(prevState => ({
      shoppingCart: [ ...prevState.shoppingCart, newProduct ]
    }))
  
  
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
           render={props =>{
                // console.log('props', {...props})
                // console.log('match ',this.props.match)
                // console.log('pID', props.match.params.id)
             const productObj = this.state.listOfProducts.find((product)=>{
              return product._id === props.match.params.id
             })
           
             return <ProductDetails  {...props}  addToCart={this.addToChart} newProduct = {productObj} />
           }} 
           />
        </Switch>
      </div>
    );
  }
}

export default App;
