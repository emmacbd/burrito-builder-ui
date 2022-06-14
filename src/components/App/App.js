import React, { Component } from 'react';
import './App.css';
import { getOrders, postOrder } from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      orders: [],
      error:''
    }
  }

  componentDidMount() {
    getOrders()
      .then(data => this.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
  }


  sendOrder = (newOrder) => {
    postOrder(newOrder)
      .then(result => {
        if(result.id){
          this.setState({ orders: [...this.state.orders, result], error:'' })
        } else {
          this.setState({orders:[...this.state.orders], error: 'Please try again!'})
        }
      
      })
  }


  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm sendOrder={this.sendOrder} />
        </header>

        <Orders orders={this.state.orders} />
      </main>
    );
  }
}


export default App;
