import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class ProductDetails extends Component {
  state = {}

  componentDidMount() {
      this.getSingleProduct();
  }

  getSingleProduct = () => {
      const { params } = this.props.match;
      axios.get(`http://localhost:5005/api/products/${params.id}`, { withCredentials: true })
          .then(responseFromApi => {
              const theProduct = responseFromApi.data;
              this.setState(theProduct);
          })
          .catch((err) => {
              console.log(err)
          })
  }

  render() {
      return (
          <div>
              <h1>{this.state.name}</h1>
              <p>Description: {this.state.description}</p>
              <p>Price: ${this.state.price}</p>
              <br />
              {/* TODO Adding to the basket functionality */}
              <button>Add to basket</button> 
              <br /><br />
              <Link to={'/products'}>Back to products</Link>
          </div>
      )
  }
}


export default ProductDetails;