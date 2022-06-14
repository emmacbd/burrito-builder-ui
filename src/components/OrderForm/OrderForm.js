import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ''
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.name) {
      this.setState({ error: 'Please Add Name to Your Order!' })
    } else if (this.state.name && this.state.ingredients.length === 0) {
      this.setState({ error: 'Please add at least one ingredient to your burrito!' })
    } else {
      const newOrder = {
        id: Date.now(),
        ...this.state
      }
      this.props.sendOrder(newOrder)
      this.clearInputs();
    }
  }



  handleIngredientChange = (event) => {
    event.preventDefault()
    if (this.state.ingredients < 0) {
      this.setState({ ingredients:[ event.target.name]})
    } else {
      this.setState({ ingredients: [...this.state.ingredients, event.target.name] })
    }
  }


  handleNameChange = (event) => {

    this.setState({ [event.target.name]: event.target.value })
  }


  clearInputs = () => {
    this.setState({ name: '', ingredients: [], error: '' });
  }

  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        {ingredientButtons}

        <p className="order-list">Order: {this.state.ingredients.join(', ') || 'Nothing selected'}</p>
        {this.state.error && <p>{this.state.error}</p>}
        <button className="order-submit" onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
