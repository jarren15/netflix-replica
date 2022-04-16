let initState = [];

const moviesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATED_MOVIES':
            return action.payload
        case 'WATCHED_MOVIES':
            return action.payload
        default:
            return state;
    }
}

export default moviesReducer;