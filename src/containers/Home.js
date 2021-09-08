// Home is a container for showing recent photos

// importing useEffect and useContext hooks
import React, { useEffect, useContext } from 'react'

// importing the context
import { RootContext } from '../context/RootContext';

// importing custom build scroller component
import Scroller from '../components/Scroller';

// requiring axios for api calls
const axios = require('axios');

const Photos = () => {

    // accessing global state values and callback functions
    const { currentPage, getPhotos, getCurrentPage, checkHasMore, getLoadingStatus, searchValue} = useContext(RootContext)
   
    // triggering recent images api call inside useEffect
    useEffect(()=>{
        if(searchValue === '')
            getRecentImages()
    },[])



    // function definition for recent images api call 
    const getRecentImages = async() => {
        getLoadingStatus(true)
        const apiUrl = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=4c6819cd6ef85784da413a2b4dbf484c&page=${currentPage}&format=json&nojsoncallback=1`
        try {
            const response = await axios.get(apiUrl);
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

        <Scroller 
            getRecentImages = {getRecentImages}
        />
        
    )
}

export default Photos