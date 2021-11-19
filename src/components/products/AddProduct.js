import React, { Component } from 'react';
import axios from 'axios';

class AddProduct extends Component {
  state = { name: "", description: "", price: "" }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const description = this.state.description;
    const price = this.state.price;

    axios.post(`${process.env.REACT_APP_API_URL}/products`, { name, description, price },{withCredentials:true})
      .then(() => {
        this.props.getData();
        this.setState({ name: "", description: "", price: "" });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
     
      <div className="container">
          <label className="labelo">🧁 Create a new 🧁</label>
        <form onSubmit={this.handleFormSubmit}>
      
          <label className="label">Name</label>
         
          <input className="input-field" type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
          <label className="label">Description</label>
          <textarea className="input-field" name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
          <label className="label">Price</label>
          <input className="input-field" type="text" name="price" value={this.state.price} onChange={e => this.handleChange(e)} />
          <div className="button">
            <div className="inner"></div>
            <button type="submit">Submit</button>
          </div>
          
      </form>
      </div >
    )
  }
}

export default AddProduct;
