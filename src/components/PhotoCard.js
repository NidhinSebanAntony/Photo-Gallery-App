// PhotoCard is a component to show photos in card and will pop up on clicking the card

// importing React and useState hooks from react
import React, { useState } from 'react';

// importing Card and Modal components from react-bootstrap
import { Card, Modal } from 'react-bootstrap';

const Photos = (props) => {

    // initializing state for the modal to pop up
    const [showModal, setShowModal] = useState(false)

    // URL to fetch the photo from flickr
    let photoUrl = `https://live.staticflickr.com/${props.photo.server}/${props.photo.id}_${props.photo.secret}.jpg`

    return(
        <>

            {/* Displaying images in bootstrap card */}

            <Card className="photo-card" onClick={()=>setShowModal(true)}>
                <Card.Img variant="top" src={photoUrl} />
            </Card>


            {/* modal for showing photo */}

            <Modal show={showModal} onHide={()=>setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Card.Title>{props.photo.title}</Card.Title>
                </Modal.Header>
                <Modal.Body>
                    <Card>
                        <Card.Img variant="top" src={photoUrl} />
                    </Card>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default Photos