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
        })
        .catch((err) => {
            console.log(err)
        })
}



  render() {
    return (
      <div key={this.props.match.params.id}>
        <h1> Your Order Details</h1>
        <h3>Name:</h3>
        <h3>Quantity:</h3>
        
        <button><Link to={'/orders'}>All Orders</Link></button>
      </div>
       
    )
  }
}


export default OrderDetails;