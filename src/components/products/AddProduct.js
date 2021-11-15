import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
class AddProject extends Component {
  state = { name: "", description: "", price: "" }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const name = this.state.name;
    const description = this.state.description;
    const price = this.state.price;

    axios.post("http://localhost:5005/api/products", { name, description, price })
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
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} />
          <label>Description:</label>
          <textarea name="description" value={this.state.description} onChange={e => this.handleChange(e)} />
          <label>Price:</label>
          <input type="text" name="price" value={this.state.price} onChange={e => this.handleChange(e)} />
          <input type="submit" value="Submit" />
         <button><Link to={'/products'}>Back to products</Link></button>
      </form>
      </div >
    )
  }
}

export default AddProject;
