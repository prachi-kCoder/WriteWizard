import './App.css'
import React from 'react';
import PredictionForm from './components/PredictionForm';
import logo from './assets/word-scribe-logo.png'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Word Scribe Logo" className="App-logo" />
        <h1 className="App-title">WRITE WIZARD</h1>
      </header>
      <PredictionForm />
    </div>
  );
}

export default App;