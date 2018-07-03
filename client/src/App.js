import React, { Component } from 'react';
import { Wrapper, Form, Intro, FormGroup, Button } from './AppCss';

import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  state = {
    address: '',
    phone: '',
    incoming: '0.000',
    outgoing: '0.000',
    validInputs: {
      address: true,
      phone: true,
      incoming: true,
      outgoing: true,
    },
    noErrors: true,
  };

  validateAddress = () => {
    if (this.state.address.substring(0, 2) === '0x') {
      return true;
    } else {
      return false;
    }
  };

  validatePhone = () => {
    // check if there 10 digits, numbers
    let phoneNumber = Number(this.state.phone.split('-').join(''));
    if (isNaN(phoneNumber) || phoneNumber.toString().length !== 10) {
      return false;
    }
    return true;
  };

  validateIncoming = () => {
    // check if its a number
    if (isNaN(this.state.incoming) || !this.state.incoming) {
      return false;
    }

    // check if number is less than 0.001

    if (
      Number(this.state.incoming) >= 0.001 ||
      Number(this.state.incoming) === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  validateOutgoing = () => {
    // check if its a number
    if (isNaN(this.state.outgoing) || !this.state.outgoing) {
      return false;
    }

    // check if number is less than 0.001

    if (
      Number(this.state.outgoing) >= 0.001 ||
      Number(this.state.outgoing) === 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  validate = () => {
    const validateInput = Object.assign({}, this.state.validInputs);

    // get the keys
    const keys = Object.keys(validateInput);
    // loop through the keys to validate each input
    keys.forEach(key => {
      switch (key) {
        case 'address':
          validateInput[key] = this.validateAddress();
          break;
        case 'phone':
          validateInput[key] = this.validatePhone();
          break;
        case 'incoming':
          validateInput[key] = this.validateIncoming();
          break;
        case 'outgoing':
          validateInput[key] = this.validateOutgoing();
          break;
        default:
          return;
      }
    });

    // now loop through the inputs and if any of them has an error, setState
    for (let i = 0; i < keys.length; i++) {
      if (validateInput[keys[i]]) {
        // valid data
      } else {
        // found an error so break
        this.setState({ noErrors: false, validInputs: validateInput });
        return false;
      }
    }
    return true;
  };
  inputChangeHandler = ({ target }) => {
    this.setState({
      ...this.state,
      [target.name]: target.value,
    });
  };

  invalidFeedback = entry => {
    return <div className="HasError">Invalid {entry}</div>;
  };

  // axios
  post = data => {
    console.log(data);
    this.setState({
      address: '',
      phone: '',
      incoming: '0.000',
      outgoing: '0.000',
      validInputs: {
        address: true,
        phone: true,
        incoming: true,
        outgoing: true,
      },
      noErrors: true,
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const res = this.validate(); // validate the inputs
    if (res) {
      const data = {
        address: this.state.address,
        phone: this.state.phone,
        incoming: this.state.incoming,
        outgoing: this.state.outgoing,
      };
      this.post(data);
    }
  };
  render() {
    return (
      <Wrapper>
        <Intro>
          <div className="wallet-watcher-header mt-4">WalletWatcher</div>
          <div className="sub-text mb-4">
            Monitor any ETH address & receive SMS messages on the go.
          </div>
        </Intro>
        <iframe
          className="chart mb-5"
          title="chartFrame"
          id="widget-ticker-preview"
          src="//www.coingecko.com/en/widget_component/ticker/ethereum/usd?id=ethereum"
          scrolling="no"
        />

        <Form onSubmit={this.submitHandler}>
          <FormGroup>
            <label htmlFor="address">Ethereum Address</label>
            <input
              // className={this.state.validInputs.address ? null : 'HasError'}
              id="address"
              name="address"
              value={this.state.address}
              // onFocus={() => {
              //   const validInputs = this.state.validInputs;
              //   // reset the error
              //   validInputs.address = true;
              //   this.setState({ noErrors: true, validInputs });
              // }}
              onChange={this.inputChangeHandler}
              placeholder="0x..."
              autoComplete="false"
            />
          </FormGroup>
          <div>
            {this.state.validInputs.address
              ? null
              : this.invalidFeedback('Address')}
          </div>
          <FormGroup>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={this.state.phone}
              onChange={this.inputChangeHandler}
              // className={this.state.validInputs.phone ? null : 'HasError'}
              placeholder="(xxx)-xxx-xxxx"
              //pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              autoComplete="false"
              // onFocus={() => {
              //   const validInputs = this.state.validInputs;
              //   // reset the error
              //   validInputs.phone = true;
              //   this.setState({ noErrors: true, validInputs });
              // }}
            />
          </FormGroup>
          <div>
            {this.state.validInputs.phone
              ? null
              : this.invalidFeedback('Number')}
          </div>
          <FormGroup>
            <label htmlFor="incoming">Incoming Transaction Limit</label>
            <input
              id="incoming"
              name="incoming"
              value={this.state.incoming}
              onChange={this.inputChangeHandler}
              // className={this.state.validInputs.incoming ? null : 'HasError'}
              placeholder="0.000 ETH"
              // onFocus={() => {
              //   const validInputs = this.state.validInputs;
              //   // reset the error
              //   validInputs.incoming = true;
              //   this.setState({ noErrors: true, validInputs });
              // }}
            />
          </FormGroup>
          <div>
            {this.state.validInputs.incoming
              ? null
              : this.invalidFeedback('Amount')}
          </div>
          <FormGroup>
            <label htmlFor="outgoing">Outgoing Transaction Limit</label>
            <input
              id="outgoing"
              name="outgoing"
              value={this.state.outgoing}
              onChange={this.inputChangeHandler}
              // className={this.state.validInputs.outgoing ? null : 'HasError'}
              placeholder="0.000 ETH"
              // onFocus={() => {
              //   const validInputs = this.state.validInputs;
              //   // reset the error
              //   validInputs.outgoing = true;
              //   this.setState({ noErrors: true, validInputs });
              // }}
            />
          </FormGroup>
          <div>
            {this.state.validInputs.outgoing
              ? null
              : this.invalidFeedback('Amount')}
          </div>
          <Button className="mt-3">Track</Button>
        </Form>
      </Wrapper>
    );
  }
}

export default App;
