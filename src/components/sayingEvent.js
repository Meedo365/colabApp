import React from "react";
import { Link } from "react-router-dom";

function SayingEvent(props) {
    let route = '/profile/' + props.id;
    return <>
        <div style={{ width: '' }}>
            <hr style={{ marginBottom: '10px', color: '#464646', width: '410px' }} />
            <div className="flex comment" style={{ width: '366px' }}>
                <Link to={route}>
                    <img src={props.pic} alt={props.alt} />
                </Link>
                <div className="eachComment">
                    <div>
                        <p id="commentCard" style={{
                            lineHeight: '30px', textAlign: 'justify',
                            width: '350px', height: 'fit-content', marginBottom: '0px'
                        }}>
                            <Link to={route} style={{ textDecoration: 'none' }}>
                                <b>
                                    <p style={{ width: '191px', height: '21px', marginBottom: '8px' }}>{props.name}</p>
                                </b>
                            </Link>
                            {props.comment}
                        </p>
                    </div>

                </div>
            </div>

        </div>
    </>
}

export default SayingEvent;