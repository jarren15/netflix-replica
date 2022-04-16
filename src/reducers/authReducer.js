let initState = {
    authErr: null,
    user: {}
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SIGNUP': 
            return {
                ...state,
                ...action.payload
            }
        case 'SIGNIN': 
            return {
                ...state,
                ...action.payload
            }
        case 'SIGNOUT': 
            return {
                ...state,
                user: action.payload
            }
        
        // case 'UPDATED_USERS': 
        //     return {
        //         ...state, 
        //         user: action.payload
        //     }
        case 'WATCHED_USER_PROPS': 
            return {
                ...state, 
                user: action.payload
            }
        case 'WATCHED_USER':
            return {
                ...state,
                user: action.payload
            }
        
        default:
            return state;
    }
}

export default authReducer;