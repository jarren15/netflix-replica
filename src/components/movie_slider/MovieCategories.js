import React from 'react';
import { useEffect } from 'react';
import MovieCategorySlider from './MovieCategorySlider';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getCategories, watchCategories } from '../../thunks/categoriesActionCreator';
import { getMovies, watchMovies } from '../../thunks/moviesActionCreator';


function MovieCategories({categories, movies, continueWatching, user}) {
    

    useEffect(()=>{
        
    }, []);


    // If continueWatching prop has entry but no in progress, return empty object. If continueWatching prop has no entry, return null
    // const filteredContinueWatchingKeys = Object.keys(continueWatching).length ? Object.fromEntries(
    //     Object.entries(continueWatching).filter(([key, value]) => value.ended !== true) 
    // ) : null
    const filteredContinueWatchingKeys = Object.keys(continueWatching).length ? Object.fromEntries(
        Object.entries(continueWatching).filter(([key, value]) => value.progress < value.duration) 
    ) : null


    const categoriesSliders = categories.map(category => {
        return (
            // category.movieCount ? 
            // <SwiperSlide key={category.id}>
            //     <MovieCategorySlider {...category} movies={movies} />
            // </SwiperSlide> : null
            category.catID !== 'continue_watching' 
            ?
                <SwiperSlide key={category.id}>
                    <MovieCategorySlider {...category} movies={movies} user={user} continueWatching={{}} />
                </SwiperSlide>
            :
                filteredContinueWatchingKeys
                ?
                    Object.keys(filteredContinueWatchingKeys).length
                    ?
                        <SwiperSlide key={category.id}>
                            <MovieCategorySlider {...category} movies={movies} user={user} continueWatching={filteredContinueWatchingKeys} />
                        </SwiperSlide>  
                    :
                        null
                :
                    null
        )
    });

    return (
        <div className="movieCategories">
            <Swiper spaceBetween={10} slidesPerView={1} loop={true} direction='vertical' className="movieCategoriesHorizontalSwiper">
                {categoriesSliders}
            </Swiper>
        </div>
    );
}

export default MovieCategories;