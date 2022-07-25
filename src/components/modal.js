import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

function MyVerticallyCenteredModal(props) {
    let [commentText, setComment] = useState('');
    let [user_id, setUser] = useState(localStorage.getItem("user_id"));
    let [event_id, setEvent] = useState(props.eventId);

    function createComment() {
        let url = "https://colab-endpoints.herokuapp.com/createcomment";
        let data = { user_id, event_id, commentText };
        let x = props.onHide
        if (commentText !== "" || commentText !== " ") {
            fetch(url, {
                headers: {
                    "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(res => res.json())
            setComment('')
            x();
        }

    };

    return (

        <Modal
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    You're going!
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{props.title}</p>
                <p><b>{props.date}, {props.time}</b></p>
                <hr />

                <div style={{ margin: 'auto', width: '90%', textAlign: 'center' }}>
                    <h4>So What's Next?</h4>
                    <p style={{ color: '#464646', fontSize: '16px' }}>
                        Looking for someone to go with? Introduce yourself to your fellow attendees and find yourself an event buddy
                    </p>
                    <p style={{ color: '#807979', fontSize: '12px', paddingTop: '8px' }}>Your post will be added to the comments for this event, where others can see</p>
                    <div>
                        <textarea id="comm" rows="4" cols="50" placeholder="Contribute to the Convo" name="commentText" value={commentText} onChange={(e) => setComment(e.target.value)} /><br />
                        <input type="text" placeholder="user id" name="user_id" value={user_id} onChange={(e) => setUser(e.target.value)} style={{ display: 'none' }} /><br />
                        <input type="text" placeholder="event id" name="event_id" value={event_id} onChange={(e) => setEvent(e.target.value)} style={{ display: 'none' }} />
                        <button id="createBtn" onClick={() => createComment()} >POST</button>
                    </div>
                </div>
            </Modal.Body>
            {/* <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer> */}
        </Modal>

    );
}

export default MyVerticallyCenteredModal;