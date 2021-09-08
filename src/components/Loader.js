// Loader is a component to show a custom loader during api calls

// importing useContext hooks 
import React, { useContext } from 'react'

// custom css for loader
import { css } from "@emotion/react";

// importing SyncLoader from npm js for showing a loader during api calls
import SyncLoader from "react-spinners/SyncLoader";

// importing the context
import { RootContext } from '../context/RootContext';

// custom style definition for loader
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const Loader = () => {

    // Accessing the state values in context using useContext hooks
    const {loading} = useContext(RootContext)

    return(

        <div style={{padding: 40}}>
            <SyncLoader color='#212529' loading={loading} css={override} size={10} />
        </div>
        
    )
}

export default Loader