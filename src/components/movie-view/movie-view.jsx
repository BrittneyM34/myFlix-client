export const MovieView = ({ movie, onBackClick }) => {
    return (
      <div>
        <div>
          <img src={movie.image} />
        </div>
        <div>
          <span>
            <b>Title:</b>
          </span>
          <span>{movie.title}</span>
        </div>
        <div>
          <span>
            <b>Description: </b>
          </span>
          <span>{movie.description}</span>
        </div>
        <div>
          <span>
            <b>Genre: </b>
          </span>
          <span>{movie.genre}</span>
        </div>
        <div>
          <span>
            <b>Director: </b>
          </span>
          <span>{movie.director}</span>
        </div>
        <button onClick={onBackClick}>Back</button>
      </div>
    );
  };