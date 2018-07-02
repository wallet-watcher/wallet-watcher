import React, { Component } from 'react';
import { Wrapper, Content } from './AppCss';

class App extends Component {
  state = {
    address: '',
    phone: '',
    incoming: 0,
    outgoing: 0,
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value,
    });
  };

  render() {
    const { address, phone, incoming, outgoing } = this.state;
    return (
      <Wrapper>
        <Content>Hello</Content>

        <div>
          <label htmlFor="address">Enter your ETH. Address</label>
          <input
            id="address"
            name="address"
            value={address}
            onChange={this.inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="phone">Enter your phone #:</label>
          <input
            id="phone"
            name="phone"
            value={phone}
            onChange={this.inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="incoming">Incoming amount to receive text: </label>
          <input
            id="incoming"
            name="incoming"
            value={incoming}
            onChange={this.inputChangeHandler}
          />
        </div>
        <div>
          <label htmlFor="outgoing">Outgoing amount to receive text:</label>
          <input
            id="outgoing"
            name="outgoing"
            value={outgoing}
            onChange={this.inputChangeHandler}
          />
        </div>
      </Wrapper>
    );
  }
}

export default App;
