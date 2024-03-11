// Here you import the PropTypes library
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, addFav, removeFav, user }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user]);

  return (
    <Card className="h-100">
      <div className="position-relative .d-inline-block">
        <Card.Img variant="top" src={movie.imagePath} />
        <div>
          {isFavorite ? (
            <Button onClick={() => removeFav(movie._id)}> Remove from favorites</Button>
          ) : (
            <Button onClick={() => addFav(movie._id)}>Add to favorites</Button>
          )}
        </div>
      </div>
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.description}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
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
  // onMovieClick: PropTypes.func.isRequired,
};
