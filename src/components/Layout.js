import React from "react";
import Nav from "./nav/Nav";
import { useSelector } from "react-redux";

function Layout({children}) {
    const storeAuth = useSelector(state => {
        return state.auth;
    })
    return (
        <div className="layoutContainer">   
            <Nav storeAuth={storeAuth} />
            {children}
        </div>
    )
}

export default Layout