// Header component is the header part of the react application containing the header and the search bar

import React from 'react'

// importing Navbar component from react-bootstrap
import { Navbar } from 'react-bootstrap';

// importing Searchbar component from components folder
import Searchbar from './Searchbar';


const Header = () => {
    
    return(
        // using react-bootstrap navbar component
        <Navbar 
            bg="dark" 
            expand="lg" 
            // overriding bootstrap navbar styles with inline css
            style={{
                display: 'flex',
                justifyContent: 'center', 
                position: 'sticky', 
                left: 0, 
                top: 0, 
                zIndex: 1000
            }}>

            <div>

                {/* Navbar title */}
                <Navbar.Brand 
                    // overriding bootstrap navbar styles with inline css
                    style={{
                        color: '#fff', 
                        fontSize: '25px', 
                        fontStyle: 'bold'
                    }}>
                        Search Photos
                    </Navbar.Brand>

                {/* Using searchbar component inside header component */}
                <Searchbar />  
                
            </div>
        </Navbar>
    )
}

export default Header