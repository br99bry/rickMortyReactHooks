import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Characters from './components/Characters';
import ThemeContext from './context/ThemeContext';

function App() {
  const [ background, setBackground ] = useState('bg-light');
  return (
    <ThemeContext.Provider value={{background , setBackground}}>
      <div className="App">
        <Header />
        <Characters />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
