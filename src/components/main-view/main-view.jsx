import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Components
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { forEach, values } from "lodash";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [query, setQuery] = useState("");

  // Connect App to API
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://my-movies-8ed51d856f3e.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            imagePath: movie.ImagePath || "default-image-path.jpg",
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

  const handleSearch = (e) => {
    
    const query = e.target.value;
 
    setQuery(query);

   movies.forEach (item=>{
    console.log("value:"+ item.title)
   }    
   );

    const filteredMovies = movies.filter((movie) => {
      return (
        movie.title.includes(query)
      );
    })

    setMovies(filteredMovies);
  }

  // Add Favorite Movie
  const addFav = (id) => {
    fetch(
      `https://my-movies-8ed51d856f3e.herokuapp.com/users/${user.username}/movies/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to add");
        }
      })
      .then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  // Remove Favorite Movie
  const removeFav = (id) => {
    fetch(
      `https://my-movies-8ed51d856f3e.herokuapp.com/users/${user.username}/movies/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed to remove");
        }
      }).then((user) => {
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        query={query}
        handleSearch={handleSearch}
        movies={movies}
        onLoggedOut={() => {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          {/* Return SignUpView if not logged in, otherwise mainpage */}
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          {/* Return LoginView if not logged in, otherwise mainpage  */}
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView
                      onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            // Return MovieView if logged in, otherwise LoginView
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView
                      movies={movies}
                      removeFav={removeFav}
                      addFav={addFav} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            // Return MovieCards if logged in, otherwise LoginView
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-4" key={movie._id} md={3}>
                        <MovieCard
                          user={user}
                          addFav={addFav}
                          removeFav={removeFav}
                          movie={movie}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
          <Route
            // Return ProfileView if logged in, otherwise LoginView
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col>
                    <ProfileView
                      user={user}
                      movies={movies}
                      removeFav={removeFav}
                      addFav={addFav}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
