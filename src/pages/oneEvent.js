import React, { useEffect, useState } from "react";
import Navv from "../components/nav";
import SingleEventOne from "../components/singleEventOne";
import { useNavigate, useParams } from 'react-router-dom';
import AboutEvent from "../components/aboutEvent";
import Attendees from "../components/attendeeEvent";
import SayingEvent from "../components/sayingEvent";
import MyVerticallyCenteredModal from "../components/modal";

function OneEvent() {
    let [, SetLocation] = useState([]);
    let [myevents, SetAllEvents] = useState([]);
    let [mycomments, SetAllComments] = useState([]);
    let [attending, SetAttending] = useState([]);
    let [, SetEventDate] = useState([]);
    let [none, SetNone] = useState('none');
    let [none1, SetNone1] = useState('');
    let [none2, SetNone2] = useState('none');
    let [block, SetBlock] = useState('inline');
    let [block1, SetBlock1] = useState('inline');
    let [attendId, SetAttend] = useState('');

    let id = useParams();
    let [modalShow, setModalShow] = useState(false);
    let navigate = useNavigate()
    let [user_id, setUser] = useState(localStorage.getItem("user_id"));
    let [event_id, setEvent] = useState(id.id);
    let [commentText, setComment] = useState('');
    let [onHide, setOnHide] = useState('none');

    useEffect(() => {
        loadEvent();
        loadAttending();
        loadDate();
        loadLocation();
        loadComment();
        loadAttend();
    }, [])
    function createComment() {
        let url = "https://colab-endpoints.herokuapp.com/createcomment";
        let data = { user_id, event_id, commentText };
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
        }

    };
    let loadEvent = () => {
        let url = "https://colab-endpoints.herokuapp.com/events";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                SetAllEvents(res)
            });
    };

    let loadComment = () => {
        let url = "https://colab-endpoints.herokuapp.com/comments";
        fetch(url)
            .then(e => e.json())
            .then(res => {
                SetAllComments(res)
            });
    };

    let loadAttending = () => {
        let url = "https://colab-endpoints.herokuapp.com/attend";
        fetch(url)
            .then(e => e.json())
            .then(res => {
                SetAttending(res)
            });
    };

    let loadDate = () => {
        let url = "https://colab-endpoints.herokuapp.com/events";

        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                let arr = []
                let result = []

                res.map(e => {
                    if (!arr.includes(e.date)) {
                        result.push(e)
                        arr.push(e.date)
                    }
                })
                return result
            })
            .then((res) => {
                SetEventDate(res)
            })
    };

    let loadAttend = () => {
        let url = "https://colab-endpoints.herokuapp.com/attend";
        let user = localStorage.getItem('user_id');
        let event = id.id;
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                let result = [];

                res.map(e => {
                    if (user === e.user_id._id && event === e.event_id._id) {
                        // return (
                        SetNone1('none')
                        SetNone2('inline')
                        SetAttend(e._id)
                    }
                })
                return result
            })
    };

    let loadLocation = () => {
        let url = "https://colab-endpoints.herokuapp.com/events";

        fetch(url)
            .then((e) => e.json())
            .then((res) => {
                let arr = []
                let result = []

                res.map(e => {
                    if (!arr.includes(e.location)) {
                        result.push(e)
                        arr.push(e.location)
                    }
                })
                return result
            })
            .then((res) => {
                SetLocation(res)
            })
    };

    let sendAttend = (e) => {
        let url = "https://colab-endpoints.herokuapp.com/attend";
        let user_id = localStorage.getItem('user_id');
        let event_id = e;
        let data = { user_id, event_id }
        if (user_id === null) {
            alert('You have to Login')
        } else {
            fetch(url, {
                headers: {
                    "content-type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
            })
                .then(res => res.json())
            setModalShow(true)
            SetNone1('none')
            SetNone2('')
        }
    };

    let deleteAttend = () => {
        let url = "https://colab-endpoints.herokuapp.com/attend/" + attendId;
        if (window.confirm('Are you sure?')) {
            fetch(url, {
                headers: {
                    "content-type": "application/json"
                },
                method: "DELETE",
                // body: JSON.stringify(data)
            })
                .then(res => res.json())
            SetNone1('')
            SetNone2('none')
        };

    };

    let showUp = () => {
        let x = localStorage.getItem('user_id')
        if (x === null) {
            alert('ONLY ATTENDEES CAN VIEW')
        } else {
            SetBlock('none')
            SetNone('inline')
        }
    };

    let showDown = () => {
        SetBlock('inline')
        SetNone('none')
    };

    let loginPage = () => {
        let user = localStorage.getItem('user_id')
        if (user === '' || user === ' ') {
            navigate('/login')
        } else {
            setOnHide('inline')
        }
    };

    // let commentSize = () => {
    //     SetWhitee('normal');
    // };

    return <>
        <div className="cen" >
            <Navv />
            <div style={{ marginLeft: '188px', marginRight: '188px' }}>
                <div style={{ paddingTop: '120px', marginBottom: '230px' }}>
                    {myevents.map((e) => {
                        let day = new Date(e.date).getDate();
                        let dayName = new Date(e.date).toLocaleDateString('en-us', { weekday: 'short' });
                        let month = new Date(e.date).toLocaleDateString('en-us', { month: 'long' });
                        let year = new Date(e.date).getFullYear();
                        let dates = month + ' ' + day + ', ' + year;
                        let dates1 = dayName + ', ' + month + ' ' + day + ', ' + year;

                        if (id.id === e._id) {
                            return (
                                <SingleEventOne
                                    key={e._id}
                                    date={dates}
                                    date1={dates1}
                                    image={e.image}
                                    title={e.title}
                                    host={e.host}
                                    time={e.time}
                                    location={e.location}
                                    attendees={e.attendees}
                                    comment={e.comment_no}
                                    attendEvent={() => sendAttend(e._id)}
                                    cancelEvent={() => deleteAttend()}
                                    show1={none1}
                                    hide1={none2}
                                />
                            )
                        }
                    })}

                </div>

                <div>
                    <div style={{ display: block }}>
                        <div className="flex aboutTab" style={{ justifyContent: 'space-evenly', marginBottom: '80px' }}>
                            <p style={{ color: '#7B93BF', borderBottom: '3px solid #7B93BF' }} >About</p>
                            <p style={{ borderBottom: '1.5px solid gray', color: '#464646' }} onClick={() => showUp()}>Attendees</p>
                        </div>

                        <h3 id="aboutheader">About this Event</h3>
                        <div className="flex">
                            <div>
                                {myevents.map((e) => {
                                    if (id.id === e._id) {
                                        return (
                                            <AboutEvent
                                                key={e._id}
                                                about={e.about}
                                            />
                                        )
                                    }
                                })
                                }
                            </div>
                            <div>
                                <h5 style={{ marginBottom: '24px', color: '#464646' }}>What attendees of this event are saying</h5>
                                <div style={{ display: onHide }}>
                                    <textarea id="comm" rows="4" cols="50" placeholder="Contribute to the Convo" name="commentText" value={commentText} onChange={(e) => setComment(e.target.value)} /><br />
                                    <input type="text" placeholder="user id" name="user_id" value={user_id} onChange={(e) => setUser(e.target.value)} style={{ display: 'none' }} /><br />
                                    <input type="text" placeholder="event id" name="event_id" value={event_id} onChange={(e) => setEvent(e.target.value)} style={{ display: 'none' }} />
                                    <button id="createBtn" onClick={() => createComment()} >POST</button>
                                </div>
                                {mycomments.map((e, i) => {
                                    if (id.id === e.event_id._id) {
                                        console.log(e.user_id)
                                        return (
                                            <SayingEvent
                                                key={e._id}
                                                id={e.user_id._id}
                                                pic={e.user_id.image}
                                                alt={e.user_id.fullname[0]}
                                                comment={e.commentText}
                                                name={e.user_id.fullname}
                                            // white={whitee}
                                            // read={() => commentSize()}
                                            />
                                        )

                                    }
                                })
                                }

                                <div>
                                    <br />
                                    <button id="join" onClick={() => loginPage()}>Join The Conversation</button>
                                </div>
                            </div>

                        </div>
                    </div>


                    <div style={{ display: none }}>
                        <div className="flex aboutTab" style={{ justifyContent: 'space-evenly', marginBottom: '80px' }}>
                            <p style={{ color: '#464646', borderBottom: '1.5px solid grey' }} onClick={() => showDown()}>About</p>
                            <p style={{ borderBottom: '3px solid #7B93BF', color: '#7B93BF' }} >Attendees</p>
                        </div>
                        <div style={{ marginBottom: '36px' }}>
                            <h3>Looks like you're not the only one going!</h3>
                            <p>Get to know some of your fellow attendees</p>
                        </div>
                        {attending.map((e) => {
                            if (id.id === e.event_id._id) {
                                return (
                                    <Attendees
                                        key={e._id}
                                        name={e.user_id.fullname}
                                        age={e.user_id.age}
                                        gender={e.user_id.gender}
                                        fun={e.user_id.funFacts}
                                        image={e.user_id.url}
                                    />
                                )
                            }
                        })
                        }
                    </div>
                </div>

                <div>
                    {myevents.map((e) => {
                        let day = new Date(e.date).getDate();
                        let dayName = new Date(e.date).toLocaleDateString('en-us', { weekday: 'short' });
                        let month = new Date(e.date).toLocaleDateString('en-us', { month: 'long' });
                        let year = new Date(e.date).getFullYear();
                        let dates = month + ' ' + day + ', ' + year;
                        let dates1 = dayName + ', ' + month + ' ' + day + ', ' + year;

                        if (id.id === e._id) {
                            return (
                                <MyVerticallyCenteredModal
                                    key={e._id}
                                    date={dates}
                                    time={e.time}
                                    title={e.title}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    eventId={id.id}
                                />
                            )
                        }
                    })}

                </div>

            </div>



        </div>
    </>
}

export default OneEvent;