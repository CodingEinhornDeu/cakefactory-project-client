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
      <div className="container2">
        <h1 className="label-black"> Your Shopping Details</h1>
        <div className="items-list">
          {newOrder.map((item) => {
            return (
              <div className="item" key={item._id}>
                <p className="label-grey">Product: {item.name}</p>
                <p className="label-grey">Price: ${item.price}</p>
                <p className="label-grey">Quantity:{item.quantity}</p>
              </div>
            )
          })}
        </div>
        <div className="button">
          <div className="inner"></div>
          <button onClick={this.handleSendOrderDB}><Link to={'/orders'} style={{ textDecoration: 'none', color: 'white', fontWeight: 'bolder' }}>Checkout</Link></button>
        </div>
      </div>
    )
  }
}


export default ShoppingCart;