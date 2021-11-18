import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ShoppingCart extends Component {



  handleSendOrderDB = (e) => {
    e.preventDefault();

    const { newOrder } = this.props;
    // extracting from this.props only the id and quantity
    const itemsOrdered = newOrder.map((elm) => {
      return { productId: elm["_id"], quantity: elm['quantity'] };
    })
    axios.post(`${process.env.REACT_APP_API_URL}/orders`, { itemsOrdered }, { withCredentials: true })
      .then((response) => {
        this.props.getAllOrders();
      })
      .catch(error => console.log(error))




  }


  render() {
    const { newOrder } = this.props;

    return (
      <div>
        <h1> Your shopping details</h1>
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
        <button onClick={this.handleSendOrderDB}><Link to={'/orders'}>Checkout</Link></button>
      </div>
    )
  }
}


export default ShoppingCart;