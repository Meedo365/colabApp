import React, { useContext, useEffect, useState } from "react";
import Navv from "../components/nav";
import SingleEvent from "../components/singleEvent";
import { Store } from "../context/store";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function AllEvents() {
    let store = useContext(Store);
    let [location, SetLocation] = useState([]);
    let [myevents, SetAllEvents] = useState([]);
    let [tags, SetTags] = useState([]);
    let [eventdate, SetEventDate] = useState([]);

    useEffect(() => {
        loadEvents();
        loadTags();
        loadDate();
        loadLocation();
    }, [])

    let loadEvents = () => {
        let url = "https://colab-endpoints.herokuapp.com/events";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                SetAllEvents(res)
            });
    };

    let loadTags = () => {
        let url = "https://colab-endpoints.herokuapp.com/tags";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                SetTags(res)
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


    return <>
        <div className="cen" >
            <Navv />
            <div style={{
                width: '466px', height: '77px', fontWeight: '800', paddingTop: '120px', marginLeft: '472px',
                fontSize: '31px', lineHeight: '42.35px', color: '#464646'
            }}>
                Do some new things, Make some new friends.
            </div>
            <div>
                <div style={{ marginLeft: "472px", marginTop: '128px' }} className="interest">
                    <select name="interest" style={{ width: '415px', height: '35px', paddingLeft: '20px' }}>
                        {location.map((e, i) => {
                            return <option>{e.location}</option>
                        })}

                    </select>
                </div>
            </div>
            <div style={{ marginLeft: '188px', marginRight: '188px' }}>
                <div style={{
                    width: '345px', height: '38px', fontSize: '31px', color: '#464646', marginTop: '114px', lineHeight: '42.35px'
                }}>
                    Popular This Week
                </div>
                <div className="flex">
                    <div style={{ marginTop: '36px' }} className="interest">
                        <select name="interest">
                            <option>What are you interested in?</option>
                            {tags.map((e, i) => {
                                return <option>{e.tagName}</option>
                            })}

                        </select>
                    </div>
                    <div style={{ marginTop: '36px', marginLeft: '20px' }} className="interest">
                        <select name="date">
                            <option>Date</option>
                            {eventdate.map((e, i) => {
                                let day = new Date(e.date).getDate();
                                let month = new Date(e.date).toLocaleDateString('en-us', { month: 'long' });
                                let year = new Date(e.date).getFullYear();
                                let dates = month + ' ' + day + ', ' + year;
                                return <option>{dates}</option>
                            })}
                            {/* <option>2</option> */}
                        </select>
                    </div>
                    <p className="resetfilter" style={{ marginTop: '40px', marginLeft: '20px' }}>
                        Reset Filters
                    </p>
                </div>
                <div style={{ marginTop: '155px' }}>
                    {myevents.map((e, i) => {
                        let day = new Date(e.date).getDate();
                        let dayName = new Date(e.date).toLocaleDateString('en-us', { weekday: 'short' });
                        let month = new Date(e.date).toLocaleDateString('en-us', { month: 'long' });
                        let year = new Date(e.date).getFullYear();
                        let dates = month + ' ' + day + ', ' + year;
                        let dates1 = dayName + ', ' + month + ' ' + day + ', ' + year;
                        return <SingleEvent
                            key={e._id}
                            id={e._id}
                            date={dates}
                            date1={dates1}
                            image={e.image}
                            title={e.title}
                            host={e.host}
                            time={e.time}
                            location={e.location}
                            attendees={e.attendees}
                            comment={e.comment_no}
                        />
                    })}

                </div>

            </div>



        </div>
    </>
}

export default AllEvents;