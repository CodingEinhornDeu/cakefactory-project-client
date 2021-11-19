import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductList extends Component {

  render() {
    return (
      <div>

        <div className="container2">
          <h1 className="label-black">Product List</h1>
          {this.props.allProductList.map(product => {
            return (
              <div style={{ marginBottom: '25px' }} key={product._id}>
                <Link to={`/products/${product._id}`} style={{ textDecoration: 'none', textAlign: 'center' }}>
                  <h3 className="label">🎂{product.name} </h3>

                </Link>

              </div>
            )
          })
          }
          <div className="button">
            <div className="inner"></div>
            <button ><Link to={'/products/add'} style={{ textDecoration: 'none', color: 'white', fontWeight: 'bolder' }}>add new product</Link></button>
          </div>
        </div>

      </div>
    )
  }
}








export default ProductList;