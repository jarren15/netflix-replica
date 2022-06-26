import React from 'react';
import { useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Button from 'carbon-components-react/lib/components/Button';
import { Add, Play, Subtract } from '@carbon/icons-react';
// import Sidebar from '../components/nav/Header';
import Layout from '../components/Layout';
import { addMovieToMyList, removeMovieToMyList, updateMovieDuration, updateMovieStartedProps, updateMovieProgress, updateMovieEnded } from '../thunks/authActionCreator';
import { ToastNotification } from 'carbon-components-react';
import ProgressBar from 'carbon-components-react/lib/components/ProgressBar';



function Watch() {
    const dispatch = useDispatch();
    const vidRef = useRef(null)
    const params = useParams();
    const pageID = params.id
    const storeState = useSelector(state => {
        return state;
    })
    
    const [addedNotif, setAddedNotif] = useState(false)
    const [removedNotif, setRemovedNotif] = useState(false)
    const [showVid, setShowVid] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    // const [vidState, setVidState] = useState({
    //     duration: null
    //     currentTime: null
    // })

    var movieIndex = ''

    const myList = Object.keys(storeState.auth.user).length ? storeState.auth.user.myList : []
    
    const movie = Object.keys(storeState.auth.user).length ? storeState.auth.user.movies.find((movie, index) => {
        movieIndex = index
        return movie.id == pageID;
    }) : {
        id: '',
        title: '',
        trailer: '',
        casts: '',
        year: '',
        duration: '',
        summary: '',
        poster: '',
        started: '',
        ended: ''    
    };

    const {id, title, trailer, casts, year, duration, summary, poster, progress, started, ended, genre} = movie

    const movieDuration = Object.keys(storeState.auth.user).length ? Object.keys(storeState.auth.user.continueWatching).length && storeState.auth.user.continueWatching.hasOwnProperty(id) ? storeState.auth.user.continueWatching[id].hasOwnProperty('duration') ? storeState.auth.user.continueWatching[id].duration : null : null : null

    const movieStarted = Object.keys(storeState.auth.user).length ? Object.keys(storeState.auth.user.continueWatching).length && storeState.auth.user.continueWatching.hasOwnProperty(id) ? storeState.auth.user.continueWatching[id].hasOwnProperty('started') ? storeState.auth.user.continueWatching[id].started : null : null : null

    const movieProgress = Object.keys(storeState.auth.user).length ? Object.keys(storeState.auth.user.continueWatching).length && storeState.auth.user.continueWatching.hasOwnProperty(id) ? storeState.auth.user.continueWatching[id].hasOwnProperty('progress') ? storeState.auth.user.continueWatching[id].progress : null : null : null

    const movieEnded = Object.keys(storeState.auth.user).length ? Object.keys(storeState.auth.user.continueWatching).length && storeState.auth.user.continueWatching.hasOwnProperty(id) ? storeState.auth.user.continueWatching[id].hasOwnProperty('ended') ? storeState.auth.user.continueWatching[id].ended : null : null : null

    // const castList = casts ? casts.map((cast) => {
    //     return (
    //         <span key={Date.now() + Math.random()}>{cast}</span>
    //     )
    // }) : null;
    const genreList = Object.keys(storeState.auth.user).length ? genre.map(gen => {
        return <li style={{color: 'white'}} key={Date.now() + Math.random()}>{gen}</li>
    }) : null
    const castsList = casts ? casts.map(cast => {
        return cast
    }).join(", ") : null
    // console.log('location', location)

    const playHandler = (movieID, authID, index) => {
        setShowVid(true)
        setIsPlaying(true)

        // firestore
        dispatch(updateMovieStartedProps(movieID, authID, index))
    }

    
    const addToMyListHandler = (movieID, authID) => {
        setAddedNotif(true)
        setTimeout(() => {
            setAddedNotif(false)
        }, 3000)
        dispatch(addMovieToMyList(movieID, authID))
    }

    const removeToMyListHandler = (movieID, authID) => {
        setRemovedNotif(true)
        setTimeout(() => {
            setRemovedNotif(false)
        }, 3000)
        dispatch(removeMovieToMyList(movieID, authID))
    }

    const onVidReadyHandler = (movieID, authID, duration) => {
        // setVidState({
        //     ...vidState,
        //     duration: vidRef.current.getDuration()
        // })

        dispatch(updateMovieDuration(movieID, authID, duration))
    }

    const onVidPausedHandler = (movieID, authID, progress) => {
        // setVidState({
        //     ...vidState,
        //     currentTime: Math.ceil(vidRef.current.getCurrentTime())
        // })

        // firestore
        dispatch(updateMovieProgress(movieID, authID, progress))

        setShowVid(false)
    }

    const onVidStartHandler = (movieID) => {
        // vidRef.current.seekTo(vidState.currentTime)
        // firestore
        !storeState.auth.user.continueWatching[movieID].ended
        ?
                vidRef.current.seekTo(storeState.auth.user.continueWatching[movieID].progress)
            :
                storeState.auth.user.continueWatching[movieID].progress == storeState.auth.user.continueWatching[movieID].duration
                ?
                    vidRef.current.seekTo(0)
                :
                    vidRef.current.seekTo(storeState.auth.user.continueWatching[movieID].progress)
    }
    
    const onVidEndedHandler = (movieID, authID, progress) => {
        // setVidState({
        //     ...vidState,
        //     currentTime: Math.ceil(vidRef.current.getCurrentTime())
        // })
        setShowVid(false)

        // firestore
        // dispatch(updateMovieProgress(movieID, authID, progress))
        dispatch(updateMovieEnded(movieID, authID, progress))
    }
    console.log('started: ', movieStarted, 'progress: ', movieProgress, 'ended: ', movieEnded, 'duration: ', movieDuration)
    

    return (
        !storeState.auth.user.uid 
        ?
            <Navigate to={`/`} replace={true} /> 
        :
            movie
            ? 
                <Layout>
                    <section className='WatchPage' style={{  
                        backgroundImage: `url(${poster})`,
                        backgroundPosition: '40vw',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                        {
                            !showVid
                            ?
                            <div className="controlsContainer">
                                <div className="controlsContainer_details">
                                    <h1 className='controlsContainer_details_title'>{title}</h1>
                                    <div className='controlsContainer_details_yearDuration'>
                                        <span className='year'>{year}</span>
                                        <span className='duration'>{duration}</span>
                                    </div>
                                    <p className="controlsContainer_details_summary">{summary}</p>
                                    <ul className='controlsContainer_details_genre'>
                                        {genreList}
                                    </ul>
                                    {castsList && <p className='controlsContainer_details_cast'><span>Cast: </span>{castsList}</p>}
                                    {
                                        movieEnded
                                        ? 
                                            <p className='controlsContainer_details_watched'>Watched</p>
                                        :
                                            null

                                    }
                                    <div className="controlsContainer_details_progress">
                                        {
                                            movieProgress > 0 && movieProgress < movieDuration
                                            ?
                                                <>
                                                    <ProgressBar className='progress' max={movieDuration} size='small' type='inline' value={storeState.auth.user.continueWatching[id].progress} label='' /><span className='percent' style={{color:'#fff'}}>{Math.floor(movieProgress / movieDuration * 100)} %</span>
                                                </>
                                            :
                                                null

                                        }
                                    </div>
                                </div>
                                <div className="controlsContainer_buttons">
                                    <div>
                                        <Button className='vidControl' onClick={() => playHandler(id, storeState.auth.user.uid, movieIndex)}><Play />{!movieStarted && !movieProgress && !movieEnded ? 'Play' : movieProgress > 0 && movieProgress < movieDuration ? 'Continue Watching' : 'Watch again'}</Button>
                                    </div>
                                    <div>
                                        {
                                            myList.length 
                                            ?
                                                myList.includes(id) 
                                                ? 
                                                    <Button className='vidControl' kind='danger' onClick={() => removeToMyListHandler(id, storeState.auth.user.uid)}><Subtract />Remove from My List</Button>
                                                :
                                                    <Button className='vidControl' kind='secondary' onClick={() => addToMyListHandler(id, storeState.auth.user.uid)}><Add />Add to My List</Button>
                                            :
                                                <Button className='vidControl' kind='secondary' onClick={() => addToMyListHandler(id, storeState.auth.user.uid)}><Add />Add to My List</Button>
                                        }
                                    </div>
                                </div>
                                


                                {/* Notifications */}
                                <ToastNotification className={`myListNotification ${addedNotif}`} title='Successfully added to My List' kind='success' />
                                <ToastNotification className={`myListNotification ${removedNotif}`}  title='Successfully removed from My List' kind='success' />
                            </div>
                            :
                            <div className="WatchPage_vid">
                                {/* <ReactPlayer ref={vidRef} playing={isPlaying} height='100%' width='100%' url={trailer} className='reactPlayer' onPause={onVidPausedHandler} controls={true} onReady={onVidReadyHandler} onStart={onVidStartHandler} onEnded={onVidEndedHandler}/> */}
                                <ReactPlayer playsinline={true} ref={vidRef} playing={isPlaying} height='100%' width='100%' url={trailer} className='reactPlayer' onPause={() => onVidPausedHandler(id, storeState.auth.user.uid, Math.ceil(vidRef.current.getCurrentTime()))} controls={true} onReady={() => onVidReadyHandler(id, storeState.auth.user.uid, vidRef.current.getDuration())} onStart={() => onVidStartHandler(id)} onEnded={() => {onVidEndedHandler(id, storeState.auth.user.uid, Math.ceil(vidRef.current.getDuration()))}}/>
                            </div>
                        }
                    </section>
                </Layout>
            :
                <div className="loadingScreen">
                    <div class="loader"></div>
                </div>
    );
}

export default Watch;