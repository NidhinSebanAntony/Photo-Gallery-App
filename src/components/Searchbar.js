// Searchbar component helps users to input the search query

// importing the React and useContext hook from react
import React,{ useContext } from 'react'


// importing InputGroup and FormControl from react-bootstrap
import { Button } from 'react-bootstrap';

import { ReactSearchAutocomplete } from 'react-search-autocomplete'


// importing the RootContext file from context folder
import { RootContext } from '../context/RootContext';

// importing css style 
import '../App.css'

// importing image icon
import searchIcon from '../assets/search.png'

const Searchbar = () => {

    // Accessing the state values in context using useContext hooks
    const { getSearchValue, searchValue, onEnterKeyPressed} = useContext(RootContext)
    // Handling the search key press for searching
    const onSearchBtnPress = (item) => {

      // getting data from localstorage
      let searchHistory = JSON.parse(localStorage.getItem('searchHistory'))

      // if localstorage already have data then compare the new search query with 
      // the new search query and if it is not in the list add it to the list
      if( searchHistory && searchHistory.length > 0) {
        let found = searchHistory.find(element => element.name === item.name);
        if(!found) {
          let arr = []
          searchHistory.map((i) => {
            arr.push(i)
          })
          arr.push(item)
          localStorage.setItem('searchHistory', JSON.stringify(arr))
        }
      }

      // if the localstorage is empty create a new list for storing search queries
      else {
        let arr = []
        arr.push(item)
        localStorage.setItem('searchHistory', JSON.stringify(arr))
      }

      // trigger search api call
      onEnterKeyPressed(true)

    }

    const handleOnSearch = (string, results) => {

      // onSearch will have as the first callback parameter
      // the string searched and for the second the results.

      // prevent default calling of search api
      onEnterKeyPressed(false)

      // updating state value named searchValue using a callback function
      getSearchValue(string)
    }

    const handleOnSelect = (item) => {

      // updating state value named searchValue using a callback function
      getSearchValue(item.name)

      //triggering search button press
      onSearchBtnPress(item)

    }
    return(

        <div className="search-component">
          <div className="search-input-custom-width">
            <ReactSearchAutocomplete

              // fetch search queries from localstorage otherwise returns an empty array
              items={
                (
                  JSON.parse(localStorage.getItem('searchHistory')) 
                  && JSON.parse(localStorage.getItem('searchHistory')).length>0) ? 
                  JSON.parse(localStorage.getItem('searchHistory')) : []
              }

              onSearch={handleOnSearch}
              onSelect={handleOnSelect}
              onClear = {()=>window.location.reload()}
              autoFocus
              styling = {
                {
                  borderRadius: "5px",
                }
              }
            />
          </div>

          {/* Search button */}
          <Button variant="light" style={{marginLeft: 5}} onClick={()=>onSearchBtnPress({name: searchValue})}>
            <img src={searchIcon} alt="" width="20px" />
          </Button>

        </div>
        
    )
}

export default Searchbar