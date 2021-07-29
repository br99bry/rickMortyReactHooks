import React, { useState, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import './styles/Header.scss';
import logo from '../assets/img/logoRicjAndMorty.png'
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
      <div className="Header__title" >
        <img src={logo} alt="logo de rick and morty" />
      </div>
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