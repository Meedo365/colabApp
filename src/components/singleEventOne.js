import React from "react";
import { Icon } from '@iconify/react';

function SingleEventOne(props) {
    return <>
        <div className="eventcardmain">
            <div className="eventcard flex">
                <img src={props.image} alt="" style={{ width: '350px', height: '250px' }} />
                <div style={{ marginLeft: '128px' }}>
                    <p className="eventTitle">{props.title}</p>
                    <p className="eventHost">Hosted by: {props.host}</p>
                    <p className="eventDate"><Icon icon="bi:calendar2-date-fill" color="#4a5e84" /> {props.date1}</p>
                    <p className="eventTime"><Icon icon="bx:time-five" color="#4a5e84" /> {props.time} EDT</p>
                    <p className="eventLocation"><Icon icon="akar-icons:location" color="#4a5e84" /> {props.location}</p>
                    <div className="flex" style={{ paddingTop: '25px', marginBottom: '10px' }}>
                        <div className="flex">
                            <Icon icon="bi:people-fill" style={{ width: '30.67px', height: '23px', marginRight: '4.33px', color: '#464646' }} />
                            <p style={{ width: '94x', height: '20px', color: '#464646', fontSize: '16px', lineHeight: '24px' }}> {props.attendees} attendees</p>
                        </div>
                        <div className="flex" style={{ marginLeft: '44px' }}>
                            <Icon icon="entypo:new-message" style={{ width: '23px', height: '23px', marginRight: '8px', color: '#464646' }} />
                            <p style={{ width: '121px', height: '20px', color: '#464646', fontSize: '16px', lineHeight: '24px' }}>{props.comment} comments</p>
                        </div>
                    </div>
                    <button onClick={props.attendEvent} style={{ display: props.show1 }}>Attend</button>
                    <button disabled style={{ display: props.hide1, background: '#9fa5b1' }}>You are going !!!</button> <br /> <br />
                    <p onClick={props.cancelEvent} style={{ display: props.hide1, textDecoration: 'underline', cursor: 'pointer' }}>Cancel Reservation</p>
                </div>
                <hr />
            </div>
        </div>
    </>
}

export default SingleEventOne;