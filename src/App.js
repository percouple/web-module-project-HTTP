import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from './components/EditMovieForm';

import MovieHeader from './components/MovieHeader';

import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';
import AddMovieForm from "./components/AddMovieForm";

const App = (props) => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  const deleteMovie = (id) => {
    // Make a DELETE request using Axios
    axios.delete(`http://localhost:9000/api/movies/${id}`)
    // On success update the movies list in state
    .then((res) => {
      console.log(res)
      setMovies(res.data)
    })
    // and navigate the user to /movies
    navigate('/movies');
    // Hand this function down to the correct component
  }

  const addToFavorites = (movie) => {
    // Stretch goal, see the README
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies} />

          <Routes>
            <Route path="movies/add" element={<AddMovieForm setMovies={setMovies}/>}/>
            
            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies}/>}/>

            <Route path="movies/:id" element={<Movie deleteMovie={deleteMovie}/>}/>

            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
