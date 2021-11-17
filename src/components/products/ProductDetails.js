import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProductDetails extends Component {
  state = {}

  componentDidMount() {
      this.getSingleProduct();
  }

  handleAddToCart = (e) => {
      e.preventDefault();
      this.props.addToCart(this.props.newProduct)

  }

  getSingleProduct = () => {
      const { params } = this.props.match;
      axios.get(`${process.env.REACT_APP_API_URL}/products/${params.id}`, { withCredentials: true })
          .then(responseFromApi => {
              const theProduct = responseFromApi.data;
              this.setState(theProduct);
          })
          .catch((err) => {
              console.log(err)
          })
  }

  render() {
    //console.log(this.props.match.params.id)
      return (
          <div>
              <h1>{this.state.name}</h1>
              <p>Description: {this.state.description}</p>
              <p>Price: ${this.state.price}</p>
              <br />
              {/* TODO Adding to the basket functionality */}
              <button onClick={this.handleAddToCart}>Add to basket</button> 
              <br /><br />
              <Link to={'/products'}>Back to products</Link>
          </div>
      )
  }
}


export default ProductDetails;