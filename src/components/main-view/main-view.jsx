import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "17 Again",
            description:
                "Mike O'Donnell (Matthew Perry) was a high-school basketball star with a bright future, but he threw it all away to marry his girlfriend and raise their child. Almost 20 years later, Mike'/s marriage has failed, his kids think he'/s a loser, and his job is going nowhere. He gets a chance to correct the mistakes of his past and change his life when he is miraculously transformed into a teenager (Zac Efron), but in trying to fix his past, Mike may be jeopardizing his present and future.",
            genre: "Comedy",
            director: {
                Name: "Burr Steers",
                Bio: "Burr Gore Steers is an American actor, screenwriter, and director. His films include Igby Goes Down and 17 Again.",
                Birth: "1965"
            },
            image: "https://upload.wikimedia.org/wikipedia/en/e/e1/17again.jpg",
        },
        {
            id: 2,
            title: "Us",
            description:
                "The film follows Adelaide Wilson (Nyong'o) and her family, who are attacked by a group of menacing doppelgängers, called the 'Tethered'.",
            genre: "Horror",
            director: {
                Name: "Jordan Peele",
                Bio: "American comedian, writer, director, and producer who was known for creating both comedy and horror films and TV shows that address popular culture and social issues, especially race relations.",
                Birth:"1979"
            },
            image:
                "https://play-lh.googleusercontent.com/3a6ZV1MgQ4iLwpU0rWUO-KO0VVW0NdEj7V8xjNk-mraZ66SIXbO-Ca08uUm82KnCPyzQowGr5bHGsgJAuZ0",
        },
        {
            id: 3,
            title: "Grown Ups",
            description:
                "The film tells a story of five lifelong friends who won their junior high school basketball championship in 1978. They reunite three decades later for a 4th of July weekend after learning about the sudden death of their basketball coach.",
            genre: "Comedy",
            director: {
                Name: "Dennis Dugan",
                Bio: "Dennis Barton Dugan is an American film director, actor, comedian and screenwriter from Wheaton, Illinois who directed several films featuring Adam Sandler including Happy Gilmore, Big Daddy, Jack & Jill, Grown Ups, I Now Pronounce You Chuck & Larry and You Don't Mess With the Zohan.",
                Birth:"1946"
            },
            image:
                "https://m.media-amazon.com/images/M/MV5BMjA0ODYwNzU5Nl5BMl5BanBnXkFtZTcwNTI1MTgxMw@@._V1_.jpg",
        },
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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