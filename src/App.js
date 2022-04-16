import React from 'react'
import {
  Routes,
  Route
} from "react-router-dom";
// import "./css/main.css";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Watch from "./pages/Watch";
import MyList from './pages/MyList';
import Search from './pages/Search';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { getAuth } from 'firebase/auth';
import { auth } from './firebaseConfig';
import { readAuth, watchAuth, watchUserProps } from './thunks/authActionCreator';
import { getCategories, watchCategories } from './thunks/categoriesActionCreator';
import { getMovies, watchMovies, moviesCopy } from './thunks/moviesActionCreator';

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    //Initial read
    // dispatch(readAuth())
    // dispatch(getCategories());
    // dispatch(getMovies());
    //Realtime read
    dispatch(watchUserProps())
    dispatch(watchAuth())
    dispatch(watchCategories());
    // dispatch(watchMovies());
  }, [])
  return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/:id" element={<Main />} />
          <Route path="/user/:id/watch/:id" element={<Watch />} />
          <Route path="/user/:id/myList" element={<MyList />} />
          <Route path="/user/:id/search" element={<Search />} />
        </Routes>
      </div>
  );
}

export default App;
