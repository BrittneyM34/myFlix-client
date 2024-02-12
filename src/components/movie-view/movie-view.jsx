export const MovieView = ({ movie, onBackClick }) => {
  return (
    <div>
      <div>
        <img src={movie.imagePath} />
      </div>
      <div>
        <span>
          <b>Title: </b>
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
        <span>{movie.genreName}</span>
      </div>
      <div>
        <span>
          <b>Director: </b>
        </span>
        <span>{movie.directorName}</span>
      </div>
      <div>
        <span>
          <b>Featured: </b>
        </span>
        <span>{movie.featured}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};