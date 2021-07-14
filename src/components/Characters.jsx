import React, { useState, useEffect, useContext, useReducer } from 'react';
import ThemeContext from '../context/ThemeContext';
import './styles/Characters.scss';

const Characters = () => {

  const initialState = {
    favorites: []
  }

  const favoriteReducer = (state,action) => {
    switch(action.type){
        case 'ADD_TO_FAVORITE' :
          return {
            ...state,
            favorites: [ ...state.favorites, action.payload ]
          }
        default: 
          return state;
    }
  }

  const handleClick = favorite => {
    dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
  }

  const [characters, setCharacters] = useState([]);
  const [ favorites, dispatch ] = useReducer( favoriteReducer, initialState );
  const { background } = useContext(ThemeContext);

  useEffect( () => {
    fetch('https://rickandmortyapi.com/api/character/')
    .then(response => response.json())
    .then(data => setCharacters(data.results));
  }, [] ); 

  return(
    <div className={`Characters ${background}`}>

      <h1 className="Characters__title" >Favoritos Rick and Morty</h1>
      { favorites.favorites.map( favorite => ( 
        <div key={favorite.id} className="Characters__card">
          <img src={favorite.image} alt={`Imagen de ${favorite.name}`} />
          <div className="Characters__card-infoContainer">
            <h3> {favorite.name} </h3>
            <p> <strong>Status: </strong> {favorite.status} </p>
            <p> <strong>Gender: </strong> {favorite.gender} </p>
            <p> <strong>Specie: </strong> {favorite.species} </p>
            <button
            type="button"
            onClick={ () => handleClick(favorite) }
            >
              Eliminar de favoritos
            </button>
          </div>
        </div>
       ) ) }
      <h1 className="Characters__title" >Personajes Rick and Morty</h1>
      {console.log(characters)}
      { characters.map( character => (
        <div key={character.id} className="Characters__card">
          <img src={character.image} alt={`Imagen de ${character.name}`} />
          <div className="Characters__card-infoContainer">
            <h3> {character.name} </h3>
            <p> <strong>Status: </strong> {character.status} </p>
            <p> <strong>Gender: </strong> {character.gender} </p>
            <p> <strong>Specie: </strong> {character.species} </p>
            <button
            type="button"
            onClick={ () => handleClick(character) }
            className="btn btn-outline-light"
            >
              Agregar a favoritos
            </button>
          </div>
        </div>
      ) ) }
    </div>
  );
}

export default Characters;