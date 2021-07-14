import React, { useState, useEffect, useContext } from 'react';
import ThemeContext from '../context/ThemeContext';
import './styles/Characters.scss';

const Characters = () => {

  const [characters, setCharacters] = useState([]);
  const { background } = useContext(ThemeContext)
  useEffect( () => {
    fetch('https://rickandmortyapi.com/api/character/')
    .then(response => response.json())
    .then(data => setCharacters(data.results));
  }, [] ); 

  return(
    <div className={`Characters ${background}`}>
      {console.log(characters)}
      { characters.map( character => (
        <div key={character.id} className="Characters__card">
          <img src={character.image} alt={`Imagen de ${character.name}`} />
          <div className="Characters__card-infoContainer">
            <h3> {character.name} </h3>
            <p> <strong>Status: </strong> {character.status} </p>
            <p> <strong>Gender: </strong> {character.gender} </p>
            <p> <strong>Specie: </strong> {character.species} </p>
          </div>
        </div>
      ) ) }
    </div>
  );
}

export default Characters;