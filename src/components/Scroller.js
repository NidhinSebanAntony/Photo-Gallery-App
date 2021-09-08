// Scroller component facilitates the inifinite scroll of photos in home page and on search

// importing context hooks
import React, { useContext } from 'react'

// importing Container, Row and Col components from react-bootstrap
import { Container, Row, Col } from 'react-bootstrap';

// importing custom made PhotoCard component for displaying photo in react-bootstrap card
import PhotoCard from './PhotoCard';

// importing InfiniteScroll library from npm js for implimenting infinite scroll
import InfiniteScroll from 'react-infinite-scroll-component';

// custom css for loader
import { css } from "@emotion/react";

// importing SyncLoader from npm js for showing a loader during api calls
import SyncLoader from "react-spinners/SyncLoader";

// importing the context
import { RootContext } from '../context/RootContext';

// importing styles
import '../App.css'
import Loader from './Loader';

// custom style definition for loader
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Scroller = (prop) => {

    // Accessing the state values in context using useContext hooks
    const {photos, hasMore, loading, remainingItems, searchValue} = useContext(RootContext)

    return(

        <Container>

            {photos.length>0&&
                <InfiniteScroll
                    dataLength={remainingItems} //This is important field to render the next data
                    next={()=>setTimeout(searchValue ? prop.onSearch : prop.getRecentImages, 2000)}
                    hasMore={hasMore}
                    endMessage={
                        <>
                            <p className="end-message">
                                <b>You have reached at the end</b>
                            </p>
                        </>
                    }
                >
                    <Row>
                        {photos.length>0&&photos.map((photo)=>{
                            return(
                                <Col xs={12} sm={6} md={4}>
                                    <PhotoCard photo={photo}/>
                                </Col>
                            )
                        })}
                    </Row>
                </InfiniteScroll>}
            {loading && <Loader />}
        </Container>
    )
}

export default Scroller