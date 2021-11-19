import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class OrderDetails extends Component {

  state = {
    itemsOrdered: []
  }

  getSingleOrder = () => {

    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_API_URL}/orders/${params.id}`, { withCredentials: true })
      .then(responseFromApi => {
        const theOrder = responseFromApi.data;
        this.setState(theOrder);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  componentDidMount() {
    this.getSingleOrder();
  }

  render() {
    console.log("that", this.state.itemsOrdered)
    return (
      <div className="container2">
        <h1 className="label-black">Your Order Details</h1>
        <div className="items-list">
          {this.state.itemsOrdered.map((element) => {
            return (
              <div className="item">
                <h3 className="label-grey">Name: {element.productId.name}</h3>
                <h3 className="label-grey">Quantity: {element.quantity}</h3>
              </div>
            )
          })}
        </div>


        <div className="button">
          <div className="inner"></div>
          <button><Link to={'/orders'} style={{ textDecoration: 'none', color: 'white', fontWeight: 'bolder' }}>See all Orders</Link></button>
        </div>

      </div>

    )
  }
}


export default OrderDetails;