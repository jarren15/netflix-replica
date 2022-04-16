import React from 'react';
import { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player/youtube'
import MovieHomePreview from '../components/movie_preview/MovieHomePreview';
import MovieHomePreviewNull from '../components/movie_preview/MovieHomePreviewNull';
import MovieCategories from '../components/movie_slider/MovieCategories';
import Layout from '../components/Layout';
// import Sidebar from '../components/nav/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { addDoc, collection, deleteDoc, query, where, getDocs, doc } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { movies } from '../upload';
import { getCategories, watchCategories } from '../thunks/categoriesActionCreator';
import { getMovies, watchMovies } from '../thunks/moviesActionCreator';

function Main() {

    const dispatch = useDispatch();
    
    const storeState = useSelector(state => {
        return state;
    })

    // const storeAuth = useSelector(state => {
    //     return state.auth;
    // })

    // const hoveredMovie = useSelector(state => {
    //     return state.hoveredMovie;
    // })

    const deleteMovie = async () => {
        // // deleteDoc(query(collection(db, "movies"), where("category", "==", "children_family")));
        // const q = query(collection(db, "movies"), where("category", "==", "children_family"))
        // const snapshot =  await getDocs(q);
        // let toDelete = [];
        // snapshot.forEach((doc) => {
        //     toDelete.push(doc.id);
        // });
        // toDelete.forEach(item => {
        //     deleteDoc((doc(db, "movies", item)));
        // })
        // console.log('check this', doc(db, "movies", "UAPD7GaHRpOnGf3gm9qP"));
    }

    // const uploadMovie = (movies) => {
    //     movies.forEach(movie => {
    //         addDoc(collection(db, "movies"), {...movie});
    //     });
    // }

    // console.log(storeState);

    console.log(storeState)
    
    useEffect(() => {
        //Initial read
        // dispatch(getCategories());
        // dispatch(getMovies());
        //Realtime read
        // dispatch(watchCategories());
        // dispatch(watchMovies());

        // console.log(auth)

        // deleteMovie();
        // uploadMovie(movies);
    }, []);

    
    return (
        !storeState.auth.user.uid 
        ?
            <Navigate to={`/`} replace={true} /> 
        :
            // storeState.categories.length && storeState.movies.length 
            storeState.categories.length && Object.keys(storeState.auth.user).length
            ?
                <Layout>
                    <section className='MainPage'>
                        {/* {hoveredMovie ? <MovieHomePreview {...hoveredMovie} /> : <MovieHomePreviewNull />} */}
                        {storeState.hoveredMovie ? <MovieHomePreview storeState={storeState} {...storeState.hoveredMovie} /> : <MovieHomePreviewNull storeState={storeState} />}
                        <MovieCategories categories={storeState.categories} movies={storeState.auth.user.movies} continueWatching={storeState.auth.user.continueWatching} user={storeState.auth.user} />
                    </section>
                </Layout>
            :
                <div className="loadingScreen">
                    Loading...
                </div>
    );
}

export default Main;