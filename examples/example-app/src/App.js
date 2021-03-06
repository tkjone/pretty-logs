import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import plog from 'pretty-logs/src/index';

class App extends Component {
  render() {
    plog({
      level: 'debug',
      message: 'Login debug',
      extra: { category: 'AUTH' }
    });
    plog({
      level: 'info',
      message: 'Login debug',
      extra: { category: 'AUTH' }
    });
    plog({
      level: 'warn',
      message: 'Login debug',
      extra: { category: 'AUTH' }
    });
    plog({
      level: 'error',
      message: 'Login debug',
      extra: { category: 'AUTH' }
    });

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
