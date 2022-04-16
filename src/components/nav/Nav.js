import React from "react";
import { Menu, Logout, Close } from '@carbon/icons-react'; 
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "../../thunks/authActionCreator";
import { useEffect, useState } from "react";

function Nav({storeAuth}) {
    const dispatch = useDispatch()
    const [showSidebar, setShowSidebar] = useState(false)
    const userInitials = storeAuth.user.userName.charAt(0).toUpperCase();
    const logOut = () => {
        dispatch(signOut())
    }
    const toggleSidebar = () => {
        setShowSidebar(!showSidebar)
    }
    return (
        <>
            <section className="headerContainer">
                <span className='headerContainer_menu' onClick={toggleSidebar}>
                    {!showSidebar ? <Menu />  : <Close />}  
                </span>
                <span onClick={logOut} className='headerContainer_signout'>
                    Sign Out
                    <Logout />
                </span>
            </section>
            <div className={ !showSidebar ? 'sidebarContainer sidebarContainer_close' : 'sidebarContainer sidebarContainer_open'}>
                <div className="sidebarLogo">
                    {userInitials}
                </div>
                <span className="sidebarUsername">{storeAuth.user.userName}</span>
                <ul>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? 'active' : '')} to={`/user/${storeAuth.user.uid}`}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? 'active' : '')} to={`/user/${storeAuth.user.uid}/search`}>Search</NavLink>
                    </li>
                    <li>
                        <NavLink className={(navData) => (navData.isActive ? 'active' : '')} to={`/user/${storeAuth.user.uid}/myList`}>My List</NavLink>
                    </li>
                    <li>
                        <span onClick={logOut}>Logout</span>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Nav