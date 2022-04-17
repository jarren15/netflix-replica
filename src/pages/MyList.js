import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import { Link, Navigate } from 'react-router-dom';
import MyListCard from '../components/my_list/MyListCard';
import { ArrowUp } from "@carbon/icons-react";
import Button from "carbon-components-react/lib/components/Button";

function MyList() {
    const storeState = useSelector(state => {
        return state;
    })
    const [showSTTBtn, setShowSTTBtn] = useState(false)
    const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setShowSTTBtn(true)
        } else {
            setShowSTTBtn(false)
        }
    }

    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    window.onscroll = () => {
        scrollFunction()
    }
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
                        <h1>My List</h1>
                        <div className="cds--grid cds--grid--condensed">
                            <div className="cds--row">
                                {myListMovies}
                            </div>
                        </div>
                        <Button className={`scrollTopBtn scrollTopBtn_${showSTTBtn}`} hasIconOnly iconDescription="Back to top" onClick={topFunction} renderIcon={ArrowUp} />
                    </section>
                </Layout>
            :
                <div className="loadingScreen">Loading...</div>
    )
}

export default MyList;