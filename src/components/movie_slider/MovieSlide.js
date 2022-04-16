import React, { useState, useEffect } from 'react';
import { SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { red } from '@carbon/colors';
import { useDispatch } from 'react-redux';
import { hoveredMovie } from '../../thunks/hoveredMovieActionCreator';
// import { Button } from 'carbon-components-react';
// import { ChevronRight32 } from '@carbon/icons-react';

export const movieContext = React.createContext();

function MovieSlide({title, poster, id, hovered}) {
    const dispatch = useDispatch();

    useEffect(() => {
        // Reset the hovered state of the movie
        dispatch({type: 'UNHOVERED_MOVIE'})
    }, []);

    return (
        <>
            {/* <Link to={`watch/${id}`} className='movieSlideLink'>
                <div className="movieSlideThumb" style={{  
                    backgroundImage: `url(${poster})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }} onMouseEnter={() => dispatch(hoveredMovie(id, hovered))} onMouseLeave={() => dispatch(unhoveredMovie(id, hovered))}>
                </div>
            </Link> */}

            <Link to={`watch/${id}`} className='movieSlideLink'>
                <div className="movieSlideThumb" style={{  
                    backgroundImage: `url(${poster})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }} onMouseEnter={() => dispatch(hoveredMovie(id))} onMouseLeave={() => dispatch({type: 'UNHOVERED_MOVIE'})}>
                </div>
            </Link>
        </>   
    );
}

export default MovieSlide;