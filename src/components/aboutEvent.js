import React, { useContext } from "react";
import { Store } from "../context/store";
import { Icon } from '@iconify/react';
import { Link } from "react-router-dom";

function AboutEvent(props) {
    let store = useContext(Store);
    let route = '/event/' + props.id
    return <>
        <div>
            {/* <div className="flex"> */}
            <div style={{
                width: '522px', height: '411px', marginRight: '50px', fontSize: '16px',
                lineHeight: '28px'
            }}> {props.about}
            </div>

            {/* </div> */}
        </div>
    </>
}

export default AboutEvent;