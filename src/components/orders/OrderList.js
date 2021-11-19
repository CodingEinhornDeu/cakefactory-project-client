import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class OrderList extends Component {
  
  render() {
    return (
      <div>
         <div className="container">
         <h1 className="label-black">🧾Order List🧾</h1>
          {this.props.allOrderList.map(order => {
            return (
              <div key={order._id}>
                <Link to={`/orders/${order._id}`} style={{textDecoration:'none',color:'white'}}>
                  <h3 className="label">{order.owner.username}</h3>
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