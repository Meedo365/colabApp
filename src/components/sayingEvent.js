import React, { useContext } from "react";
import { Store } from "../context/store";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

function SayingEvent(props) {
    let store = useContext(Store);
    let route = '/event/' + props.id
    return <>
        <div style={{ width: '' }}>
            <hr style={{ marginBottom: '36px', color: '#464646' }} />
            <div className="flex comment" style={{ width: '366px', height: '153px' }}>
                <img src={props.pic} alt={props.alt} />
                <div className="eachComment">
                    <b>
                        <p style={{ width: '191px', height: '21px', marginBottom: '8px' }}>{props.name}</p></b>
                    <div>
                        <p id="commentCard" style={{
                            overflow: 'hidden', whiteSpace: props.white,
                            width: '263px', height: 'fit-content', marginBottom: '8px'
                        }}>
                            {props.comment}
                        </p>
                        <p id="readmore" onClick={props.read} style={{
                            width: '67px', height: '20px'
                        }}>Read More</p>
                    </div>

                </div>
            </div>

        </div>
    </>
}

export default SayingEvent;