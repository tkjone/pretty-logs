import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { logInfo, logDebug, logWarn, logError } from 'pretty-logs/src/index';

class App extends Component {
  render() {
    logInfo('CATEGORY', 'This is a message', {});
    logDebug('CATEGORY', 'This is a message', {});
    logWarn('CATEGORY', 'This is a message', {});
    logError('CATEGORY', 'This is a message', {});

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
