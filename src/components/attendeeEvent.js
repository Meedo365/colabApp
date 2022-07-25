import React from "react";

function Attendees(props) {
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