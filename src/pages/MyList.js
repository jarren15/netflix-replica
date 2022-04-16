import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Link, Navigate } from 'react-router-dom';
import MyListCard from '../components/my_list/MyListCard';

function MyList() {
    const storeState = useSelector(state => {
        return state;
    })
    const params = useParams();
    const pageID = params.id
    const movieListIDs = Object.keys(storeState.auth.user).length ? storeState.auth.user.myList : []
    const myListMovies = movieListIDs.length ? movieListIDs.map((movieID) => {
        const filteredMovie = storeState.auth.user.movies.find((movie) => {
            return movie.id == movieID
        })
        return (
            <MyListCard {...filteredMovie} key={filteredMovie.id} />
        )

    }) : <p>No movie</p>

    return (
        !storeState.auth.user.uid
        ?
            <Navigate to={`/`} replace={true} /> 
        :
            Object.keys(storeState.auth.user).length
            ?
                <Layout>
                    <section className="myListPage">
                        <div className="cds--grid cds--grid--condensed">
                            <div className="cds--row">
                                {myListMovies}
                            </div>
                        </div>
                    </section>
                </Layout>
            :
                <div className="loadingScreen">Loading...</div>
    )
}

export default MyList;