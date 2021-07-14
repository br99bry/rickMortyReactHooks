import React, { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import './styles/Header.scss';

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  const {background , setBackground} = useContext(ThemeContext);
  
  const handleClick = () => {
    setDarkMode(!darkMode);
    if(background==='bg-light'){
      setBackground('bg-dark');
    }else{
      setBackground('bg-light');
    }
  }
  return (
    <>
    <div className={`Header ${background}`}>
      <h1 className="Header__title" >ReactHooks</h1>
      <button 
      onClick={ handleClick } 
      type="button" > 
        { darkMode ? 'Dark Mode' : 'Light Mode' } 
      </button>
    </div>
    </>
  )
}

export default Header;