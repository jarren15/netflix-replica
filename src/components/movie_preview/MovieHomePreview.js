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
    const castsList = casts ? casts.map(cast => {
        return <li style={{color: 'white'}} key={Date.now() + Math.random()}>{cast}</li>
    }) : null
    
    useEffect(() => {
        setPlay(true)
        return () => {
            setPlay(false)
        };
    })

    return (
        <div className="movieHomePreview">
            <div className="previewDetails">
                <div className='previewLogoContainer'><img src="https://www.edigitalagency.com.au/wp-content/uploads/Netflix-N-Symbol-logo-red-transparent-RGB-png.png" alt="" /> <span style={{color: 'white'}}>WANNABE - FILM</span></div>
                <h1 style={{color: 'white'}}>{title}</h1>
                <div>
                    <span style={{color: 'white'}}>{year}</span>
                    <span style={{color: 'white'}}>{duration}</span>
                </div>
                <p style={{color: 'white'}} className='previewSummary'>{summary}</p>
                <ul>
                    {genreList}
                </ul>
                <ul>
                    {castsList}
                </ul>
                {
                    movieEnded
                    ? 
                        <p style={{color: 'white'}}>Watched</p>
                    :
                        null
                }
                <div className="previewProgress">
                    {
                        movieProgress > 0 && movieProgress < movieDuration
                        ?
                            <>
                                <ProgressBar max={movieDuration} size='small' type='inline' value={storeState.auth.user.continueWatching[id].progress} label='Movie progress' /><span className='controlsContainer_progressPercent' style={{color:'#fff'}}>{Math.floor(movieProgress / movieDuration * 100)} %</span>
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