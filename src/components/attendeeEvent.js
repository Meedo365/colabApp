import React, { useContext } from "react";
import { Store } from "../context/store";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

function Attendees(props) {
    let store = useContext(Store);
    let route = '/event/' + props.id
    return <>
        <div className="flex attendCard">
            <img src={props.image} />
            <div>
                <h4>{props.name}</h4>
                <p>Age: {props.age} years old</p>
                <p>Gender: {props.gender}</p>
                <p>Fun Fact: {props.fun}.</p>
            </div>
        </div>
    </>
}

export default Attendees;