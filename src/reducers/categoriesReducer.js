let initState = [];

export const categoriesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'UPDATED_CATEGORIES':
            return action.payload;
        case 'WATCHED_CATEGORIES':
            return action.payload        
        default:
            return state;
    }
    return state;
}

export default categoriesReducer;