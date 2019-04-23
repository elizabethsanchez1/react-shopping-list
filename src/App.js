import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel } from '@fortawesome/free-solid-svg-icons'
import logo from './logo.svg';
import Card from './components/Card';
import './App.css';

library.add(faStroopwafel);

class App extends Component {

  render() {
    return (
      <div className="App">
    
        <Card />
      </div>
    );
  }
}

export default App;
