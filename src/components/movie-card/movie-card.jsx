// Here you import the PropTypes library
import PropTypes from "prop-types"

import React from "react";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie)}}>
        {movie.title}
      </div>
    );
  };

  // Here is where we define all the props constraints for the MovieCard

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      _id: PropTypes.string.isRequired, 
      imagePath: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      director: PropTypes.shape({ 
        name: PropTypes.string, 
        bio: PropTypes.string,
        birth: PropTypes.string,
      }),
      genre: PropTypes.shape({
        genreName: PropTypes.string,
        description: PropTypes.string,
      }),
      featured: PropTypes.bool,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired,
  };