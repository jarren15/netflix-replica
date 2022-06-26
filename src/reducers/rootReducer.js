import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";
import hoveredMovieReducer from "./hoveredMovieReducer";
import authReducer from "./authReducer";


const rootReducer = combineReducers({
    // movies: moviesReducer,
    categories: categoriesReducer,
    // continueWatching: continueWatchingReducer,
    hoveredMovie: hoveredMovieReducer, 
    auth: authReducer
});

export default rootReducer;
