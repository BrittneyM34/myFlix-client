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

//   import PropTypes from "prop-types";
// import { Button, Card } from "react-bootstrap";

// export const MovieCard = ({ movie, onMovieClick }) => {
//   return (
//     <Card className="h-100">
//       <Card.Img variant="top" src={movie.imagePath} />
//       <Card.Body>
//         <Card.Title>{movie.title}</Card.Title>
//         <Card.Text>{movie.description}</Card.Text>
//         <Button onClick={() => onMovieClick(movie)} variant="link">
//           Open
//         </Button>
//       </Card.Body>
//     </Card>
//   );
// };

// // Here is where we define all the props constraints for the MovieCard

// MovieCard.propTypes = {
//   movie: PropTypes.shape({
//     _id: PropTypes.string.isRequired,
//     imagePath: PropTypes.string,
//     title: PropTypes.string.isRequired,
//     description: PropTypes.string,
//     director: PropTypes.shape({
//       name: PropTypes.string,
//       bio: PropTypes.string,
//       birth: PropTypes.string,
//     }),
//     genre: PropTypes.shape({
//       genreName: PropTypes.string,
//       description: PropTypes.string,
//     }),
//     featured: PropTypes.bool,
//   }).isRequired,
//   onMovieClick: PropTypes.func.isRequired,
// };
