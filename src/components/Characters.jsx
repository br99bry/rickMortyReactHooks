import React, { useState, useEffect, useContext, useReducer, useMemo } from 'react';
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
        case 'DELETE_FROM_FAVORITE' :
          console.log(action.payload.id)
          return {
            ...state,
            favorites: state.favorites.filter( favorite => favorite.id!==action.payload.id )
          }
          default: 
          return state;
          
        }
      }
      
      
      
      
      const [ favorites, dispatch ] = useReducer( favoriteReducer, initialState );
      
      const [characters, setCharacters] = useState([]);
      const [ search, setSearch ] = useState('')

      const { background } = useContext(ThemeContext);

      const handleClick = (favorite,e) => {
        if(e.target.innerText==='Eliminar de favoritos'){
          dispatch({ type: 'DELETE_FROM_FAVORITE', payload: favorite })
        }else{
          dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
        }
      }

      const handleSearch = (event) => {
        setSearch(event.target.value);
      }
      
      useEffect( () => {
        fetch('https://rickandmortyapi.com/api/character/')
        .then(response => response.json())
        .then(data => setCharacters(data.results));
      }, [] ); 

      const filteredUsers = characters.filter( (user) => {
        return user.name.toLowerCase().includes(search.toLowerCase())
      } )
      
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
              <button className="btn btn-danger"
              type="button"
              onClick={ (e) => handleClick(favorite,e) }
              >Eliminar de favoritos
              </button>
            </div>
          </div>
        ) ) }

        <section className="Search">
          <input type="text" placeholder="Busca un Personaje"  value={search} onChange={ handleSearch } />
          <h1 className="Characters__title" >Resultado de la busqueda</h1>
          {console.log(filteredUsers)}
          { filteredUsers.map( character => (
            <div key={character.id} className="Characters__card">
              <img src={character.image} alt={`Imagen de ${character.name}`} />
              <div className="Characters__card-infoContainer">
                <h3> {character.name} </h3>
                <p> <strong>Status: </strong> {character.status} </p>
                <p> <strong>Gender: </strong> {character.gender} </p>
                <p> <strong>Specie: </strong> {character.species} </p>
                <button
                type="button"
                onClick={ (e) => handleClick(character,e) }
                className="btn btn-outline-light"
                >
                  Agregar a favoritos
                </button>
              </div>
            </div>
          ) ) }
        </section>
        
        <h1 className="Characters__title" >Personajes Rick and Morty</h1>
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
              onClick={ (e) => handleClick(character,e) }
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