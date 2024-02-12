import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://my-movies-8ed51d856f3e.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((movie) => {
                return {
                    imagePath: movie.imagePath,
                    id: movie._id,
                    title: movie.title,
                    description: movie.description,
                    genre: {
                        genreName: movie.genre.name,
                        description: movie.genre.description
                      },
                      director: {
                        directorName: movie.director.directorName,
                        bio: movie.director.bio,
                        birth: movie.director.birth
                      },
                      featured: movie.featured,
                    };
                  });
            setMovies(moviesFromApi);
        });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
            />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};