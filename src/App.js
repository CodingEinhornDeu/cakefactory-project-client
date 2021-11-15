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






  render(){
  return (
    <div className="App">
  <Switch>
    <Route exact path="/products" render = {props => <ProductList  allProductList={this.state.listOfProducts}  />} />
    <Route exact path="/products/:id" component={ProductDetails} />
    <Route exact path="/add" render={props => <AddProduct getData={()=> this.getAllProducts()} />}  />
    </Switch>
    </div>
  );
  }
}

export default App;
