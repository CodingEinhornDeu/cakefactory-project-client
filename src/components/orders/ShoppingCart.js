import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {



  handleSendOrderDB = (e) => {
    e.preventDefault();

    axios.post(`${process.env.REACT_APP_API_URL}/orders`, { withCredentials: true })

  }


  render() {
    const { newOrder } = this.props;
    
    return (
      <div>
        <h1> Your Order Details</h1>
        {newOrder.map((item) => {
          return (
            <div key={item._id}>
              <p>Name: {item.name}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity:{item.quantity}</p>
              <hr></hr>
            </div>
          )
        })}
        <button><Link to={'/orders'}>Checkout</Link></button>
      </div>
    )
  }
}


export default ShoppingCart;