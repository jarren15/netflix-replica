

export const hoveredMovie = (id) => {
    return (dispatch, getState) => {
        // const movies = getState().movies;
        const movies = getState().auth.user.movies;
        const hoveredMovie = movies.find(movie => {
            return movie.id == id;
        })
        dispatch({
            type: 'HOVERED_MOVIE',
            payload: hoveredMovie
        })
    }
}