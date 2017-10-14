import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {p} from 'pretty-logs/src/index';

class App extends Component {
  render() {
    // I am a function, which returns a console.log that know about the args below
    p.log({msg: "Registration failed", "details": {}});
    p.warn('warning hello')
    p.err('error warning')

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
