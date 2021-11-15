import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductList extends Component {
  
  render() {
    return (
      <div>
        <div style={{ width: '60%', float: "left" }}>
          <h1>Product List</h1>
          {this.props.allProductList.map(product => {
            return (
              <div key={product._id}>
                <Link to={`/products/${product._id}`}>
                  <h3>{product.name}</h3>
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








export default ProductList;