import React from "react";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

function SingleEvent(props) {
    let route = '/event/' + props.id
    return <>
        <div className="eventcardmain">
            <h3>{props.date}</h3>
            <div className="eventcard flex">
                <Link to={route}>
                    <img src={props.image} alt="" />
                </Link>
                <div style={{ marginLeft: '20px' }}>
                    <p className="eventTitle">{props.title}</p>
                    <p className="eventHost">Hosted by: {props.host}</p>
                    <p className="eventDate">{props.date1}</p>
                    <p className="eventTime">{props.time} EDT</p>
                    <p className="eventLocation">{props.location}</p>
                    <div className="flex" style={{ paddingTop: '25px' }}>
                        <div className="flex">
                            <Icon icon="bi:people-fill" style={{ width: '30.67px', height: '23px', marginRight: '4.33px', color: '#464646' }} />
                            <p style={{ width: '94x', height: '20px', color: '#464646', fontSize: '16px', lineHeight: '24px' }}> {props.attendees} attendees</p>
                        </div>
                        <div className="flex" style={{ marginLeft: '44px' }}>
                            <Icon icon="entypo:new-message" style={{ width: '23px', height: '23px', marginRight: '8px', color: '#464646' }} />
                            <p style={{ width: '121px', height: '20px', color: '#464646', fontSize: '16px', lineHeight: '24px' }}>{props.comment} comments</p>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
            <hr />
        </div>
    </>
}

export default SingleEvent;