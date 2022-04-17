import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from 'react';
import SwiperCore, { Autoplay } from 'swiper';

function MovieHomePreviewNull({storeState}) {
    SwiperCore.use([Autoplay]);
    const filteredCategories = storeState.categories.length && storeState.auth.user.movies.length 
    ?
        storeState.categories.map(cat => {
            return cat.catID
        }).filter(cat => {
            return cat !== 'continue_watching'
        })
    :
        null

    const catNames = ['Children & Family', 'Documentaries', 'Classic', 'Sports', 'Comedies', 'Music', 'Horror', 'Action & Adventure', 'Anime', 'Dramas']
    const filteredMovies = []

    filteredCategories && filteredCategories.forEach(cat => {
            filteredMovies.push(storeState.auth.user.movies.find(movie => {
                return movie.category.toLowerCase().indexOf(cat) > -1
            }))
        })

    const mappedMovies = filteredMovies.map((movie, index) => {
        return (
            <SwiperSlide key={movie.id}>
                <div className="previewSlide" style={{  
                        backgroundImage: `url(${movie.poster})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        <span>{catNames[index]}</span>
                </div>
            </SwiperSlide>
        )
    })

    console.log(filteredMovies)


    return (
        <div className="movieHomePreview no-content">
            <Swiper autoplay={{delay: 2000}} loop={true}> 
                {mappedMovies}
            </Swiper>
        </div>
    );
}

export default MovieHomePreviewNull;