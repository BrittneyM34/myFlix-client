import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col } from "react-bootstrap";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://my-movies-8ed51d856f3e.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                // debug
                console.log(data);
                const moviesFromApi = data.map((movie) => {
                    return {
                        imagePath: movie.imagePath || "default-image-path.jpg",
                        _id: movie._id,
                        title: movie.title,
                        description: movie.description,
                        genre: {
                            name: movie.genre.name,
                            description: movie.genre.description,
                        },
                        director: {
                            name: movie.director.name,
                            bio: movie.director.bio,
                            birth: movie.director.birth,
                        },
                    };
                });
                setMovies(moviesFromApi);
            });
    }, [token]);

    if (!user) {
        return (
            <Row className="justify-content-md-center">
                <Col md={5}>
                    <LoginView
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }}
                    />
                    or
                    <SignupView />
                </Col>
            </Row>
        );
    }

    if (selectedMovie) {
        return (
            <Row className="justify-content-md-center">
                <Col md={8} style={{ border: "1px solid black" }}>
                    <MovieView
                        style={{ border: "1px solid green" }}
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            </Row>
        );
    }

    if (movies.length === 0) {
        return (
            <Row className="justify-content-md-center">
                <>
                    <button
                        onClick={() => {
                            setUser(null);
                            setToken(null);
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </button>
                    <div>The list is empty!</div>;
                </>
            </Row>
        );
    }

    return (
        <Row className="justify-content-md-center">
            <div>
                {movies.map((movie) => (
                    <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onMovieClick={(newSelectedMovie) => {
                                setSelectedMovie(newSelectedMovie);
                            }}
                        />
                    </Col>
                ))}
                <button
                    onClick={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                    }}
                >
                    Logout
                </button>
            </div>
        </Row>
    );
};
