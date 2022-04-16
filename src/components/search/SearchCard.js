import React from "react";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

function SearchCard({id, poster}) {
    const storeState = useSelector(state => {
        return state
    })

    return (
        <Link to={`/user/${storeState.auth.user.uid}/watch/${id}`} className='cds--col-max-3 cds--col-xlg-3 cds--col-lg-3 cds--col-md-2 cds--col-sm-4'>
            <div className="searchPage_card" style={{  
                backgroundImage: `url(${poster})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}>
            </div>
        </Link>
    )
}

export default SearchCard