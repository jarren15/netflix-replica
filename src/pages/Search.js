import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CarbonSearch from "carbon-components-react/lib/components/Search/next/Search";
import Checkbox from "carbon-components-react/lib/components/Checkbox";
import SearchCard from "../components/search/SearchCard";
import Layout from '../components/Layout';
import { ArrowUp } from "@carbon/icons-react";
import Button from "carbon-components-react/lib/components/Button";

function Search() {
    const storeState = useSelector(state => {
        return state;
    })
    const [searchVal, setSearchVal] = useState('')
    const [hideSuggestions, setHideSuggestions] = useState(true)
    const [selectedFilter, setSelectedFilter] = useState([])
    const [showSTTBtn, setShowSTTBtn] = useState(false)

    const genresArr = ['Action', 'Action fiction', 'Action Thriller', 'Adventure', 'Adventure fiction', 'Animation', 'Anime', 'British', 'Buddy', 'Buddy cop', 'Children\'s film', 'Comedy', 'Comedy horror', 'Comedy music', 'Coming-of-age story', 'Costume drama', 'Crime fiction', 'Crime film', 'Crime Thriller', 'Cult film', 'Cyberpunk', 'Dark comedy', 'Dark fantasy', 'Disaster', 'Docufiction', 'Documentary', 'Documentary film', 'Drama', 'Dramedy', 'Family film', 'Fantasy', 'Heist', 'Historical drama', 'Historical fiction', 'Historical film', 'History', 'Horror', 'Indie film', 'Magical realism', 'Manga', 'Martial arts', 'Melodrama', 'Miniseries', 'Monster', 'Music', 'Musical', 'Musical drama', 'Mystery', 'Nature documentary', 'Neo-noir', 'Noir', 'Post-apocalyptic', 'Prison', 'Psychological horror', 'Psychological thriller', 'Road', 'Romance', 'Romantic comedy', 'Science & nature documentary', 'Science fantasy', 'Science fiction', 'Slasher', 'Splatter', 'Sports', 'Sports manga', 'Superhero', 'Supernatural', 'Suspense', 'Sword-and-sandal', 'Tech noir', 'Teen', 'Television documentary', 'Thriller', 'True crime', 'True crime documentary', 'War', 'Zombie']

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

    const findCommonElement = (arr1, arr2) => {
        // Loop for arr1
        for(let i = 0; i < arr1.length; i++) {
            
            // Loop for arr2
            for(let j = 0; j < arr2.length; j++) {
                
                // Compare the element of each and
                // every element from both of the
                // arrays
                if(arr1[i] === arr2[j]) {
                
                    // Return if common element found
                    return true;
                }
            }
        }
        
        // Return if no common element exist
        return false;
    }

    const onSearchChangeHandler = (e) => {
        setSearchVal(e.target.value)
        setHideSuggestions(false)
        // if(searchVal == ''){
        //     setHideSuggestions(true)
        // }
    }

    const mapSuggestionToSearchVal = (e) => {
        setSearchVal(e.target.innerHTML)
        setHideSuggestions(true)
    }

    const onFilterChange = (value, id, event) => {
        setHideSuggestions(true)
        if(value) {
            setSelectedFilter([
                ...selectedFilter,
                id
            ])
        } else {
            setSelectedFilter((current) => {
                return current.filter(cur => {
                    return cur !== id
                })
            })
        }
    }
    

    const searchedMovies = Object.keys(storeState.auth.user).length 
    ? 
        searchVal.length || selectedFilter.length
        ?
            storeState.auth.user.movies.filter(movie => {
                if(findCommonElement(selectedFilter, movie.genre) || searchVal.length > 0) {
                    var selectedFilterBoo;
                    var searchValBool;
                    if(searchVal.length > 0) {
                        if(movie.title.toLowerCase().indexOf(searchVal.toLowerCase()) > -1 && searchVal.toLowerCase() != '') {
                            searchValBool = true
                        } else {
                            searchValBool = false
                        }
                    } else {
                        searchValBool = false
                    }

                    if (findCommonElement(selectedFilter, movie.genre)) {
                        selectedFilterBoo = true
                    } else {
                        selectedFilterBoo = false
                    }

                    return selectedFilterBoo || searchValBool
                } else {
                    return false
                }
            }).map(movie => {
                return <SearchCard key={movie.id} {...movie} />
            })
        :
            null
    :
        null

    const searchSuggestions = Object.keys(storeState.auth.user).length 
    ? 
        searchVal != ''
        ?
            storeState.auth.user.movies.filter(movie => {
                return movie.title.toLowerCase().indexOf(searchVal.toLowerCase()) > -1
            }).map(movie => {
                // return <SearchCard key={movie.key} {...movie} />
                return <li onClick={mapSuggestionToSearchVal} key={movie.id}>{movie.title}</li>
            })
        :
            null
    :
        null

    const categoriesAndGenres = genresArr.map(cat => {
        return <Checkbox id={cat} key={cat} labelText={cat} onChange={onFilterChange} />
    })
        

    // console.log(searchVal, searchVal.length, searchedMovies)
    return(
        !storeState.auth.user.uid
        ?
            <Navigate to={`/`} replace={true} /> 
        :
            storeState.categories.length && Object.keys(storeState.auth.user).length
            ?
            <Layout>
                <section className="searchPage">
                    <div className="searchPage_controls">
                        <div className="searchPage_controls_filter">
                            <h1>Genres & Categories</h1>
                            <div>
                                {categoriesAndGenres}
                            </div>
                        </div>
                        <div className="searchPage_controls_searchField">
                            <CarbonSearch size="lg" placeholder='Movie title' value={searchVal} labelText="Search" onChange={(e) => onSearchChangeHandler(e)} />
                            <div className="searchPage_controls_searchField_resultsCount">
                                {
                                    searchedMovies 
                                        ?
                                            searchedMovies.length == 1
                                            ?
                                                `${searchedMovies.length} result found.`
                                            :
                                                searchedMovies.length > 1
                                                ?
                                                    `${searchedMovies.length} results found.`
                                                :
                                                'No result found.' 
                                        :
                                            null 
                                }
                            </div>
                            {
                                hideSuggestions 
                                ?
                                    null
                                :
                                    <ul>
                                        {searchSuggestions || null}
                                    </ul>
                            }
                        </div>
                        
                    </div>
                    <div className="searchPage_resultsContainer cds--grid cds--grid--condensed">
                        <div className="cds--row">
                            {searchedMovies}
                        </div>
                    </div>
                    <Button className={`scrollTopBtn scrollTopBtn_${showSTTBtn}`} hasIconOnly iconDescription="Back to top" onClick={topFunction} renderIcon={ArrowUp} />
                </section>
            </Layout>
            :
                <div className="loadingScreen">Loading...</div>
    )
}

export default Search