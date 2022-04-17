import React from 'react';
import ReactPlayer from 'react-player';
import { useState, useEffect } from 'react';
import ProgressBar from 'carbon-components-react/lib/components/ProgressBar';

function MovieHomePreview({storeState, id, title, trailer, year, duration, summary, genre, casts}) {
    // console.log('CHeck me', hovered)
    const [mute, setMute] = useState(true);
    const [play, setPlay] = useState(false);
    // const {title, trailer, year, duration, summary, genre} = hovered[0];

    // For progress bar
    const movieDuration = Object.keys(storeState.auth.user).length ? Object.keys(storeState.auth.user.continueWatching).length && storeState.auth.user.continueWatching.hasOwnProperty(id) ? storeState.auth.user.continueWatching[id].hasOwnProperty('duration') ? storeState.auth.user.continueWatching[id].duration : null : null : null

    const movieStarted = Object.keys(storeState.auth.user).length ? Object.keys(storeState.auth.user.continueWatching).length && storeState.auth.user.continueWatching.hasOwnProperty(id) ? storeState.auth.user.continueWatching[id].hasOwnProperty('started') ? storeState.auth.user.continueWatching[id].started : null : null : null

    const movieProgress = Object.keys(storeState.auth.user).length ? Object.keys(storeState.auth.user.continueWatching).length && storeState.auth.user.continueWatching.hasOwnProperty(id) ? storeState.auth.user.continueWatching[id].hasOwnProperty('progress') ? storeState.auth.user.continueWatching[id].progress : null : null : null

    const movieEnded = Object.keys(storeState.auth.user).length ? Object.keys(storeState.auth.user.continueWatching).length && storeState.auth.user.continueWatching.hasOwnProperty(id) ? storeState.auth.user.continueWatching[id].hasOwnProperty('ended') ? storeState.auth.user.continueWatching[id].ended : null : null : null
    // For progress bar end

    const genreList = genre.map(gen => {
        return <li style={{color: 'white'}} key={Date.now() + Math.random()}>{gen}</li>
    })
    // const castsList = casts ? casts.map(cast => {
    //     return <li style={{color: 'white'}} key={Date.now() + Math.random()}>{cast}</li>
    // }) : null
    const castsList = casts ? casts.map(cast => {
        return cast
    }).join(", ") : null
    
    useEffect(() => {
        setPlay(true)
        return () => {
            setPlay(false)
        };
    })

    return (
        <div className="movieHomePreview">
            <div className="previewDetails">
                <div className='previewDetails_logoContainer'><img src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-N-Symbol-logo-red-transparent-RGB-png.png" alt="" /> <span>COPYCAT - FILM</span></div>
                <h1 className='previewDetails_title'>{title}</h1>
                <div className='previewDetails_yearDuration'>
                    <span className='year'>{year}</span>
                    <span className='duration'>{duration}</span>
                </div>
                <p className='previewDetails_summary'>{summary}</p>
                <ul className='previewDetails_genre'>
                    {genreList}
                </ul>
                {castsList && <p className='previewDetails_cast'><span>Cast: </span>{castsList}</p>}
                {
                    movieEnded
                    ? 
                        <p className='previewDetails_watched'>Watched</p>
                    :
                        null
                }
                <div className="previewDetails_progress">
                    {
                        movieProgress > 0 && movieProgress < movieDuration
                        ?
                            <>
                                <ProgressBar className='progress' max={movieDuration} size='small' type='inline' value={storeState.auth.user.continueWatching[id].progress} label='' />
                                <span className='percent'>{Math.floor(movieProgress / movieDuration * 100)} %</span>
                            </>
                        :
                            null

                    }
                </div>
            </div>
            <div className='playerWrapperContainer'>
                <div className='playerWrapper'>
                    <ReactPlayer height='100%' width='100%' url={trailer} playing={play} className='reactPlayer' />
                    {/* <ReactPlayer config={{youtube: {playerVars: { autoplay: 1 }}}} height='100%' width='100%' url={trailer} className='reactPlayer' /> */}
                </div>
            </div>
        </div>
    );
}

export default MovieHomePreview;