//Parent Component App.js

// importing useState hooks
import React,{useState} from 'react'

// importing custom css
import './App.css';

//importing custom build components
import Header from './components/Header';
import Home from './containers/Home';
import Search from './containers/Search';

// importing the context
import {RootContext} from './context/RootContext'

function App() {

  // initializing the state values
  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [remainingItems, setRemainingItems] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [isEnterKeyPressed, setEnterKeyPressed] = useState(false)

  // function definition to push api calls response photos in an state array
  const getPhotos = (photo) => {
    setPhotos(photos => [...photos, photo])
  }

  // function definition to update the page no
  const getCurrentPage = (page) => {
    setCurrentPage(page)
  }

  // function definition to check whether there is more items in the api response
  const getHasMore = (items) => {
    setHasMore(items)
  }

  // function definition to set the remaining no. of items in the response
  const getRemainingItems = (items) => {
    setRemainingItems(items)
  }

  // function definition to update the loading status
  const getLoadingStatus = (status) => {
    setLoading(status)
  }

  // function definition to set the search query to a state value
  const getSearchValue = (search) => {
    setSearchValue(search)
  }

  // function definition to reset the state values
  const resetState = () => {
    setHasMore(false)
    setRemainingItems(null)
    setLoading(false)
    setPhotos([])
    setCurrentPage(1)
  }

  // function definition for triggering the calling of function for search api
  const onEnterKeyPressed = (value) => {
    resetState()
    setEnterKeyPressed(value)
  }

  // checking whether more items exist in response
  const checkHasMore = (a) => {
    let remaining = 1000 - a*100
    if(remaining > 0){
        getHasMore(true)
    } 
    else {
        getHasMore(false)
    } 
    getRemainingItems(remaining)
}

  return (
    
    <RootContext.Provider 

      // Passing all state values and callback functions as props
      value={{
        photos: photos, 
        currentPage: currentPage, 
        hasMore: hasMore, 
        remainingItems: remainingItems,
        loading: loading,
        searchValue: searchValue,
        isEnterKeyPressed: isEnterKeyPressed,
        getPhotos: getPhotos,
        getCurrentPage: getCurrentPage,
        getHasMore: getHasMore,
        getRemainingItems: getRemainingItems,
        getLoadingStatus: getLoadingStatus,
        getSearchValue: getSearchValue,
        onEnterKeyPressed: onEnterKeyPressed,
        checkHasMore: checkHasMore
      }}>

      <div className="App">

        <Header />


        {/* if search api call is triggred and search field contains
         search values then Search component is rendered otherwise 
         Home component is rendered */}

        {(isEnterKeyPressed&&searchValue)?<Search /> : <Home />}
      

      </div>

    </RootContext.Provider>
    
  );
}

export default App;
