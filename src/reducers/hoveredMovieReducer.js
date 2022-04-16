let initState = null;

const hoveredMovieReducer = (state = initState, action) => {
    switch (action.type) {
        case 'HOVERED_MOVIE':
            return action.payload
        case 'UNHOVERED_MOVIE':
            return null
        default:
            return state;
    }
}

export default hoveredMovieReducer;