import React, { createContext, useState } from 'react';
export const Store = createContext();
const StoreContext=({children})=>{
    let [user,SetUser]=useState('');
    let states = {
        userinfo:[user,SetUser]
    };
    return <Store.Provider value={states}>{children}</Store.Provider>
}
export default StoreContext;