import React, { useState, UseEffect } from "react";
import "./profile-view.scss";
import { useNavigate } from "react-router-dom";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
// import UserInfo from "./user-info";
// import FavoriteMovies from "./favorite-movies";
// import UpdateUser from "./update-user";

export const ProfileView = ({ user, movies, setUser, removeFav, addFav }) => {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [birthday, setBirthday] = useState(user.birthday);
    const [password, setPassword] = useState("");

    // Navigate
    const navigate = useNavigate();

    // Return list of favorite movies
    const favoriteMovieList = movies.filter((m) =>
        user.favoriteMovies.includes(m._id)
    );

    // const token
    const token = localStorage.getItem("token");

    // Update user info
    const handleUpdate = (event) => {
        // This prevents the default behavior of the form which is to reload the entire page
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));

        const data = {
            username: username,
            email: email,
            birthday: birthday,
        };

        fetch(
            `https://my-movies-8ed51d856f3e.herokuapp.com/users/${user.username}`,
            {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then(async (response) => {
                console.log(response);
                if (response.ok) {
                    const updatedUser = await response.json();
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    alert("Update was successful");
                } else {
                    alert("Update failed");
                }
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    };

    // Delete User
    const handleDelete = () => {
        fetch(
            `https://my-movies-8ed51d856f3e.herokuapp.com/users/${user.username}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then((response) => {
            if (response.ok) {
                setUser(null);
                alert("User has been deleted");
                localStorage.clear();
                // go back to home page
                navigate("/");
            } else {
                alert("Failed to delete user");
            }
        });
    };

    return (
        <Container className="my-5">
            <Row>
                <Col md={4} className="text-center text-md-start ms-3">
                    <Card>
                        <Card.Body>
                            <Card.Title>My Profile</Card.Title>
                            <Card.Text>Username: {user.username}</Card.Text>
                            <Card.Text>Email: {user.email}</Card.Text>
                            <Card.Text>Birthday: {user.birthday}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={7} className="mt-5">
                    <Form onSubmit={handleUpdate}>
                        <Form.Group controlId="formUsername">
                            <Form.Control
                                className="mb-3"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                minLength="5"
                            />
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Control
                                className="mb-3"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formBirthday">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                className="mb-2"
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                className="mb-2"
                                ttype="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}>
                            </Form.Control>
                        </Form.Group>
                        <Button type="submit" onClick={handleUpdate} className="mt-3 me-2">
                            Update
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="mt-3 bg-blue border-blue text-white"
                        >
                            Delete account
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2>
                <Row className="justify-content-center">
                    {favoriteMovieList?.length !== 0 ? (
                        favoriteMovieList?.map((movie) => (
                            <Col
                                sm={7}
                                md={5}
                                lg={3}
                                xl={2}
                                className="mx-2 mt-2 mb-5 col-6 similar-movies-img"
                                key={movie._id}
                            >
                                <MovieCard
                                    user={user}
                                    movie={movie}
                                    removeFav={removeFav}
                                    addFav={addFav}
                                    isFavorite={user.favoriteMovies.includes(movie._id)}
                                />
                            </Col>
                        ))
                    ) : (
                        <Col>
                            <p>There are no favorite movies</p>
                        </Col>
                    )}
                </Row>
            </Row>
        </Container>
    );
};

// export function ProfileView({ movies, onUpdatedUserInfo }) {
//   return (
//     <div>
//       <UserInfo name={(user, username)} email={user.email} />
//       <FavoriteMovies favoriteMovieList={favoriteMovieList} />
//       <UpdateUser handleSubmit={handleSubmit} handleUpdate={handleUpdate} />
//     </div>
//   );
// }
