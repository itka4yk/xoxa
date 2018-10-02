import React, { Component } from 'react';
import './App.css';
import socket from 'socket.io-client';
// var middleware = require('socketio-wildcard')();


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sendMessages: [],
      receivedMessages: [],
      inputValue: 'sample',
    }
    this.socket = socket('localhost:3000', {query: 'username=example@gmail.com&password=123456'});
    var patch = require('socketio-wildcard')(socket.Manager);
    patch(this.socket);

    this.socket.on('*', console.log);
    this.socket.on('hej', res => {
      this.setState(p => ({ receivedMessages: [...p.receivedMessages, res] }));
    });
  }
  render() {
    return (
      <div className="App">
        <input value={this.state.inputValue} onChange={e => this.setState({ inputValue: e.target.value })} />
        <button onClick={() => {
          this.socket.emit('message', { data: this.state.inputValue });
          this.setState(p => ({ sendMessages: [...p.sendMessages, { type: 'message', data: this.state.inputValue }] }));
        }}>Send</button>
        <div className="row">
          <div className="column">
            SENT:
            {this.state.sendMessages.map((m, i) => (<p key={i}>{JSON.stringify(m)}</p>))}
          </div>
          <div className="column">
            RECEIVED:
            {this.state.receivedMessages.map((m, i) => (<p key={i}>{JSON.stringify(m)}</p>))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
