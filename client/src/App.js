import React, { Component } from 'react';
import { Wrapper, Form, Chart, Intro, FormGroup, Button } from './AppCss';

class App extends Component {
  state = {
    address: '',
    phone: '',
    incoming: '',
    outgoing: '',
  };

  inputChangeHandler = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value,
    });
  };

  submitHandler = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    const { address, phone, incoming, outgoing } = this.state;
    return (
      <Wrapper>
        <Intro>
          <h2>Wallet Watcher</h2>
          <p>
            This is a web app that allows a user to monitor any ETH address
            depending on the transaction criteria set:
          </p>
          <ul>
            <li>the system will send an SMS message to the user.</li>
            <li>
              Wallet Watcher provides a way to monitor activity without being
              tied to a computer.
            </li>
          </ul>
        </Intro>
        <Chart
          id="widget-ticker-preview"
          src="//www.coingecko.com/en/widget_component/ticker/ethereum/usd?id=ethereum"
          scrolling="no"
          frameborder="0"
          //allowTransparency="true"
        />
        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <label htmlFor="address">Enter your ETH. Address:</label>
            <input
              id="address"
              name="address"
              value={address}
              onChange={this.inputChangeHandler}
              placeholder="0x..."
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="phone">Enter your phone #:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={this.inputChangeHandler}
              placeholder="(xxx)-xxx-xxxx"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="incoming">Incoming amount to receive text: </label>
            <input
              id="incoming"
              name="incoming"
              value={incoming}
              onChange={this.inputChangeHandler}
              placeholder="0"
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="outgoing">Outgoing amount to receive text:</label>
            <input
              id="outgoing"
              name="outgoing"
              value={outgoing}
              onChange={this.inputChangeHandler}
              placeholder="0"
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </Wrapper>
    );
  }
}

export default App;
