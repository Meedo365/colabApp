import React, { useContext } from "react";
import Navv from "../components/nav";
import { Store } from "../context/store";

function AllEvents() {
    let store = useContext(Store);
    return <>
        <div>
            <Navv />
            <div className="flex">
            </div>
            
        </div>
    </>
}

export default AllEvents;