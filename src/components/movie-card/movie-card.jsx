// Here you import the PropTypes library
import PropTypes from "prop-types"

import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };

  // Here is where we define all the props constraints for the MovieCard
  MovieCard.PropTypes = {
    movie:PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      director: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };