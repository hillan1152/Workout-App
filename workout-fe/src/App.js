import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

import Login from './components/Login.js';

function App() {
  useEffect(() => {
    axios.get('https://weight-lifting-journal1.herokuapp.com/api/auth')
      .then(info => {
        console.log(info)
      })
      .catch(err => {
        console.log(err)
      })
  })
  return (
    <div className="App">
      <Login/>
    </div>
  );
}

export default App;
