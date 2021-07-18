import React, { useState, useEffect, useContext, useReducer, useMemo, useRef, useCallback } from 'react';
import ThemeContext from '../context/ThemeContext';
import './styles/Characters.scss';
import { TiUserDelete } from 'react-icons/ti'
import Search from './Search';

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
          return {
            ...state,
            favorites: state.favorites.filter( favorite => favorite.id!==action.payload.id )
          }
          default: 
          return state;
          
        }
      }
      
      
      const searchInput = useRef(null)
      
      const [ favorites, dispatch ] = useReducer( favoriteReducer, initialState );
      
      const [characters, setCharacters] = useState([]);
      const [ search, setSearch ] = useState('')

      const { background } = useContext(ThemeContext);

      const handleClick = (favorite,e) => {
        if(e.target.parentElement.className!=='Characters__card-infoContainer'){
          dispatch({ type: 'DELETE_FROM_FAVORITE', payload: favorite })
        }else{
          if(!favorites.favorites.includes(favorite)){
            dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
          }else{
            return null
          }
        }
      }

      // const handleSearch = (event) => {
      //   setSearch(event.target.value);
      // }
      
      // const handleSearch = () => {
      //   setSearch(searchInput.current.value);
      // }

      const handleSearch = useCallback( () => {
        setSearch(searchInput.current.value);
      },
        []
      )

      useEffect( () => {
        fetch('https://rickandmortyapi.com/api/character/')
        .then(response => response.json())
        .then(data => setCharacters(data.results));
      }, [] ); 

      // const filteredUsers = characters.filter( (user) => {
      //   return user.name.toLowerCase().includes(search.toLowerCase())
      // } )

      const filteredUsers = useMemo( () =>
        characters.filter( (user) => {
        return user.name.toLowerCase().includes(search.toLowerCase()) 
        }) ,
        [ characters, search ]
      )
      return(
        <section className={`Characters ${background}`}>

          <div className="Characters__favorites">
            { favorites.favorites.length>=1 && 
              <h4 className="Characters__title" >Favoritos Rick and Morty</h4>
            }
            { favorites.favorites.map( favorite => ( 
            <div key={favorite.id} className="Characters__card-radius">
              <img src={favorite.image} alt={`Imagen de ${favorite.name}`} />
              <div className="Characters__card-noFavorite">
                <button className="delete-fav btn btn-danger"
                type="button"
                onClick={ (e) => handleClick(favorite,e) }
                > <TiUserDelete />
                </button>
              </div>
            </div>
            ))}
          </div>

          <div className="Characters__filtered">
            <Search 
            search={search} 
            searchInput={searchInput} 
            handleSearch={handleSearch} />
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
          </div>

      </section>
  );
}

export default Characters;