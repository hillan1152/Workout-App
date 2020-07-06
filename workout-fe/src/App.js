import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

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
    </div>
  );
}

export default App;
