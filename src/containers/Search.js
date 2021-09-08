// Search is a container for showing search results

// importing useEffect, useContext and useState hooks
import React,{ useEffect, useContext, useState } from 'react'

// importing custom build scroller component
import Scroller from '../components/Scroller';

// importing the context
import { RootContext } from '../context/RootContext';

// requiring axios for api calls
const axios = require('axios');

const Search = () => {

    // accessing global state values and callback functions
    const { getLoadingStatus, getPhotos, getCurrentPage, currentPage, checkHasMore, searchValue, isEnterKeyPressed, photos, loading} = useContext(RootContext)
    
    // initializing a state for counting search results
    const [totalSearchResult, setTotalSearchResult] = useState(0)

    // triggering search api call inside useEffect
    useEffect(()=>{
        if(isEnterKeyPressed) {
            onSearch()
        }
    },[isEnterKeyPressed])

    // function definition for search api call 
    const onSearch = async() => {
        getLoadingStatus(true)
        const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=4c6819cd6ef85784da413a2b4dbf484c&text=${searchValue}&page=${currentPage}&format=json&nojsoncallback=1`
        try {
            const response = await axios.get(apiUrl);
            setTotalSearchResult(response.data.photos.total)
            response.data.photos.photo.map((photo) => {
                getPhotos(photo)
            })
            getLoadingStatus(false)
            checkHasMore(response.data.photos.page)
            getCurrentPage(response.data.photos.page + 1)
        } catch (error) {
            console.error(error);
        }
    }

    return(
        <>
            {photos && photos.length>0 &&!loading&&<p style={{textAlign: 'right', margin: 10}}>Found {totalSearchResult} results</p>}
            <Scroller 
                onSearch={onSearch}
            />
        </>

        
    )
}

export default Search