import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieSlide from './MovieSlide';

function MovieCategorySlider({id, name, catID, movies, continueWatching, user}) {
    const categorySpecificMovies = movies.filter(movie => {
        return movie.category == catID;
    });

    // const filteredContinueWatchingKeys = Object.keys(continueWatching).length ? Object.fromEntries(
    //     Object.entries(continueWatching).filter(([key, value]) => value.ended !== true) 
    // ) : null

    const mapMoviesToSlider = categorySpecificMovies.length ? categorySpecificMovies.map(movie => {
        return (
            // movie ? 
            // <SwiperSlide key={movie.id}><MovieSlide {...movie} /></SwiperSlide> : null
            <SwiperSlide key={movie.id}><MovieSlide {...movie} /></SwiperSlide>
        );
    }) : null

    var continueWatchingKeysArr = []

    for (const property in continueWatching) {
        continueWatchingKeysArr.push(property);
    }

    const filteredContinueWatchingMovies = continueWatchingKeysArr.length 
        ?
            movies.filter((movie) => {
                return continueWatchingKeysArr.includes(movie.id)
            })
        :
            null
    
    const mapFilteredContinueWatchingMoviesToSlider = filteredContinueWatchingMovies 
    ? 
        filteredContinueWatchingMovies.map(movie => {
            return (
                // movie ? 
                // <SwiperSlide key={movie.id}><MovieSlide {...movie} /></SwiperSlide> : null
                <SwiperSlide key={movie.id}><MovieSlide {...movie} /></SwiperSlide>
            );
        })
    :
        null

    // useEffect(() => {
        
    // }, []);
    return (
        <div className="movieCategory">
            <h5 className="movieCategory_heading">{mapFilteredContinueWatchingMoviesToSlider ? `${name} for ${user.userName}` : name}</h5>
            {
                mapMoviesToSlider 
                &&
                <Swiper spaceBetween={5} slidesPerView={7} loop={true} className='movieCategory_slider'>
                    {mapMoviesToSlider}
                </Swiper>
            }
            
            {
                mapFilteredContinueWatchingMoviesToSlider 
                &&
                <Swiper spaceBetween={5} slidesPerView={7} loop={false} className='movieCategory_slider'>
                    {mapFilteredContinueWatchingMoviesToSlider}
                </Swiper>
            }
        </div>
    );
}

export default MovieCategorySlider;