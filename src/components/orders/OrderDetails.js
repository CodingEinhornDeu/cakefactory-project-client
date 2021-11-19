import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
class OrderDetails extends Component {




  componentDidMount() {
    this.getSingleOrder();
  }

  getSingleOrder = () => {

    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_API_URL}/orders/${params.id}`, { withCredentials: true })
      .then(responseFromApi => {
        const theOrder = responseFromApi.data;
        this.setState(theOrder);
        console.log("THE", theOrder)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="container2">
        <h1 className="label-blacky">Your Order Details</h1>
        <h3 className="label-blacky">productID:</h3>
        <h3 className="label-blacky">Quantity:</h3>
        <div className="button">
          <div className="inner"></div>
          <button><Link to={'/orders'} style={{textDecoration:'none',color:'white', fontWeight:'bolder'}}>See all Orders</Link></button>
        </div>

      </div>

    )
  }
}


export default OrderDetails;