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
            <div>
                <h1>{this.state.name}</h1>
                <p>Description: {this.state.description}</p>
                <p>Price: ${this.state.price}</p>
                <br />
                {/* TODO Adding to the basket functionality */}
                <button onClick={this.handleAddToCart}>Add to basket</button>
            </div>
        )
    }
}


export default ProductDetails;