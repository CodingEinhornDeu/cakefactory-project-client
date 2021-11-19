import React, { Component } from 'react';
import axios from 'axios';


class ProductDetails extends Component {
    state = {}

    componentDidMount() {
        this.getSingleProduct();
    }

    handleAddToCart = (e) => {
        e.preventDefault();
        this.props.addToCart(this.props.match.params.id)
    }

    getSingleProduct = () => {
        const { params } = this.props.match;
        axios.get(`${process.env.REACT_APP_API_URL}/products/${params.id}`, { withCredentials: true })
            .then(responseFromApi => {
                const theProduct = responseFromApi.data;
                this.setState(theProduct);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="container">
                <h1 className="label-blacky">{this.state.name}</h1>
                <p className="labelDetail"><b>Description: </b><br/>{this.state.description}</p>
                <p className="labelDetail"><b>Price: </b> ${this.state.price}</p>
                <br />
                <div className="button">
            <div className="inner"></div>
            <button onClick={this.handleAddToCart}>Add to basket</button>
          </div>
               
            </div>
        )
    }
}


export default ProductDetails;