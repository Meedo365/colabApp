import React, { useEffect, useState } from "react";
import Navv from "../components/nav";
import SingleEvent from "../components/singleEvent";

function AllEvents() {
    let [myEvents, SetAllEvents] = useState([]);
    let [myDates, setDates] = useState([]);
    let [tags, SetTags] = useState([]);
    let [myTags, setMyTags] = useState('all');
    let [hide, setHide] = useState('block');
    let [eventdate, SetEventDate] = useState([]);

    useEffect(() => {
        loadEvents();
        loadTags();
        loadDate();
        loadDates();
    }, []);

    let loadEvents = () => {
        let url = "https://colab-endpoints.herokuapp.com/events";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                SetAllEvents(res)
            });
    };

    let loadDates = () => {
        let url = "https://colab-endpoints.herokuapp.com/events";
        fetch(url)
            .then(e => e.json())
            .then((res) => {
                let arry = [];
                res.map(e => {
                    if (!arry.includes(e.date)) {
                        arry.push(e.date)
                    }
                })
                return arry
            })
            .then((res) => {
                setDates(res)
            });
    };

    let loadTags = () => {
        let url = "https://colab-endpoints.herokuapp.com/tags";

        fetch(url)
            .then(e => e.json())
            .then((res) => {
                let arr = [];
                let result = [];
                res.map(e => {
                    if (!result.includes(e.tagName)) {
                        arr.push(e)
                        result.push(e.tagName)
                    }
                })
                return arr
            })
            .then((res) => {
                SetTags(res)
            })
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

    let reset = () => {
        setHide('block');
        setMyTags('all');
    };

    return <>
        <div className="cen" >
            <Navv />
            <di className="flex" id='home_bg' >
                <div style={{
                    width: '466px', height: '77px', fontWeight: '800', paddingTop: '260px',
                    fontSize: '31px', lineHeight: '42.35px', color: '#464646'
                }}>
                    Do some new things, Make some new friends.
                </div>
                <div>
                    <img id="bg-home" src="https://s3-alpha-sig.figma.com/img/c1c9/69a2/e49f6e017d2c0396b237a7257244f4c7?Expires=1659916800&Signature=JxfT-k7Mhg4IB6k8uokpcPJewqKosY40g9u5swbnB9BuHqdqcl73R2gasgIcxC5lisYGKWXxsGDZWhzBrkMt4-kSMENFum719IefGUOqqqWehyh0OR1pUSDPo739VJN4df~gY0pHdXnBkYX7mN5Ibo-aMN9cdeNvCMhDy3q7zyGQQy2eTW5an25HjszgQkexZPuHWYgAlHvpv6h3jIAmGFzbdAB77rJwywSxFP7e2Z7wxmmwGJlEq9SuFFzW~vUlGD0jC5bhJknGPkcJ9QtxkAYsSQwNGeXfZ7XEP6bmOg1S55K3PCB~KWXt7oj0mIjaIuI8RAaTV6p-Ow2UXyw6gw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" />
                </div>
            </di>

            <div style={{ marginLeft: '188px', marginRight: '188px' }}>
                <div style={{
                    width: '345px', height: '38px', fontSize: '31px', color: '#464646', marginTop: '50px', lineHeight: '42.35px'
                }}>
                    Popular This Week
                </div>
                <div className="flex">
                    <div style={{ marginTop: '36px' }} className="interest">
                        <select name="interest" value={myTags} onChange={e => setMyTags(e.target.value)} onClick={() => setHide('none')} >
                            <option value={'all'}>What are you interested in?</option>
                            {tags.map((e, i) => {
                                return <option value={e._id}>{e.tagName}</option>
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
                    <p className="resetfilter" style={{ marginTop: '40px', marginLeft: '20px' }} onClick={() => reset()}>
                        Reset Filters
                    </p>
                </div>
                <div style={{ marginTop: '55px', marginBottom: '130px' }}>
                    {myDates.map((e, i) => {
                        let day = new Date(e).getDate();
                        let month = new Date(e).toLocaleDateString('en-us', { month: 'long' });
                        let year = new Date(e).getFullYear();
                        let dates = month + ' ' + day + ', ' + year;
                        return <div style={{ marginBottom: '30px' }}>
                            <div className="eventcardmain">
                                <h3 style={{ display: hide }}>
                                    {dates}
                                </h3>
                            </div>
                            {
                                myEvents.map((e, a) => {
                                    let day = new Date(e.date).getDate();
                                    let dayName = new Date(e.date).toLocaleDateString('en-us', { weekday: 'short' });
                                    let month = new Date(e.date).toLocaleDateString('en-us', { month: 'long' });
                                    let year = new Date(e.date).getFullYear();
                                    let dates = month + ' ' + day + ', ' + year;
                                    let dates1 = dayName + ', ' + month + ' ' + day + ', ' + year;
                                    if (e.tags_id.includes(myTags) === true && myDates[i] === e.date) {
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
                                    } else if (myTags === 'all' && myDates[i] == e.date) {

                                        return <SingleEvent
                                            key={e._id}
                                            id={e._id}
                                            date1={dates1}
                                            image={e.image}
                                            title={e.title}
                                            host={e.host}
                                            time={e.time}
                                            location={e.location}
                                            attendees={e.attendees}
                                            comment={e.comment_no}
                                        />
                                    }

                                })
                            }</div>
                    })}
                </div>

            </div>



        </div>
    </>
}

export default AllEvents;