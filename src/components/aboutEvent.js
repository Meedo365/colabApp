import React from "react";

function AboutEvent(props) {
    return <>
        <div>
            <div id="ate" style={{
                width: '522px', height: '411px', marginRight: '50px', fontSize: '16px',
                lineHeight: '50px'
            }}> {props.about}
            </div>
        </div>
    </>
}

export default AboutEvent;