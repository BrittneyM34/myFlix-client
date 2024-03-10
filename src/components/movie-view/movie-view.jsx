import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const MovieView = ({ movies, removeFav, addFav }) => {
  const { movieId } = useParams();
  const movie = movies.find((movie) => movie._id === movieId);

  // User
  const user = JSON.parse(localStorage.getItem("user"));

  // Debug
  console.log(user);

  return (
    <>
      <Row className="my-5 justify-content-md-center">
      <Col>
        <img src={movie.imagePath} />
       </Col>
      <Col md={5} className="col-12">
        <div>
          <span className="h6">{movie.title}</span>
        </div>
      <div className="my-1">
        <span className="h6">
          <b>Description: </b>
        </span>
        <span>{movie.description}</span>
      </div>
      <div className="my-1">
        <span className="h6">
          <b>Genre: </b>
        </span>
        <span>{movie.genre.name}</span>
      </div>
      <div className="my-1">
        <span className="h6">
          <b>Director: </b>
        </span>
        <span>{movie.director.name}</span>
      </div>
          <div>
            {user.favoriteMovies.includes(movie._id) ? (
              <Button className="my-2 me-2" onClick={() => removeFav(movie._id)}>
                Remove from favorites
              </Button>
            ) : (
              <Button className="my-2 me-2" onClick={() => addFav(movie._id)}>
                Add to favorites
              </Button>
            )}
          </div>
          <Link to={`/`}>
            <Button className="my-2">Back</Button>
          </Link>
        </Col>
      </Row>
   {/* <Row className="justify-content-center">
        <Col>
        <MovieCard
                movie={movie}
                removeFav={removeFav}
                addFav={addFav}
                isFavorite={user.favoriteMovies.includes(movie._id)}
              />
            </Col>
    </Row> */}
    </>
    );
};
