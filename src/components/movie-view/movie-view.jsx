export const MovieView = ({ movie, onBackClick }) => {
  console.log(movie);
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
        <span>{movie.genre.name}</span>
      </div>
      <div>
        <span>
          <b>Director: </b>
        </span>
        <span>{movie.director.name}</span>
      </div>
      <button onClick={onBackClick}>Back</button>
    </div>
  );
};
