import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrderList extends Component {
  
  render() {
    return (
      <div>
        <div style={{ width: '60%', float: "right" }}>
          <h1>Order List</h1>
          {this.props.allOrderList.map(order => {
            return (
              <div key={order._id}>
                <Link to={`/orders/${order._id}`}>
                  <h3>{order.owner.username}</h3>
                </Link>
                
              </div>
            )
          })
          }

        </div>

      </div>
    )
  }
}








export default OrderList;