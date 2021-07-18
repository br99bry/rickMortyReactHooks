import React from 'react'
import { RiUserSearchLine } from 'react-icons/ri';

const Search = ({search, searchInput, handleSearch}) => {
  return(
  <div className="Search">
    <div className="SearchWrapper">
      <RiUserSearchLine />
      <input 
      type="text" 
      placeholder="Filter Characters . . ." 
      ref={searchInput}  
      value={search} 
      onChange={ handleSearch } />
    </div>
  </div>
  )
}

export default Search;