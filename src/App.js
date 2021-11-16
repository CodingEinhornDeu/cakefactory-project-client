import './App.css';
import { Switch, Route} from 'react-router-dom';
import React, { Component } from 'react';
import ProductList from './components/products/ProductList';
import ProductDetails from './components/products/ProductDetails';
import axios from 'axios';
import AddProduct from './components/products/AddProduct';

class App extends Component {

  state = { listOfProducts: [] }

  getAllProducts = () => {
    axios.get(`http://localhost:5005/api/products`)
      .then(responseFromApi => {
        this.setState({
          listOfProducts: responseFromApi.data
        })
        
      })
  }
  componentDidMount() {
    this.getAllProducts();
  }







  render() {
    return (
      <div className="App">
        <h1>homepage</h1>
      </div>
    );

    // return (
    //   <div className="App">
    //     <Navbar userData={this.state.user} userIsLoggedIn={this.state.isLoggedIn} getUser={this.getTheUser} />
    //     <Switch>

    //       <Route exact path="/" render={props => <Login {...props} getUser={this.getTheUser} />} />
    //       <Route exact path="/signup" render={props => <Signup {...props} getUser={this.getTheUser} />} />
    //       {/* <Route exact path="/signup" component={Signup} /> */}
    //       <Route exact path="/products/add" render={props => <AddProduct getData={() => this.getAllProducts()} />} />
    //       <Route exact path="/products" render={props => <ProductList allProductList={this.state.listOfProducts} />} />
    //       <Route exact path="/orders" render={props => <OrderList allOrderList={this.state.listOfOrders} />} />
    //       <Route exact path="/products/:id" component={ProductDetails} />
    //       <Route exact path="/orders/:id" component={OrderDetails} />

    //     </Switch>
    //   </div>
    // );
  }
}

export default App;
