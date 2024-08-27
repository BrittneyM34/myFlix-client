# MyFlix Movie App

MyFlix is web application that allows users to explore a collection of movies, manage their favorite movies, and update their user profile.

## Overview

MyFlix is a full-stack application built with React, Node.js, Express, and MongoDB. It provides features such as user authentication, profile management, and the ability to browse and interact with a catalog of movies.

## Features

- **User Authentication**: Users can sign up, log in, and log out securely.
- **User Profile**: Users can view and update their profile information, including username, password, email, and date of birth.
- **Favorite Movies**: Users can add and remove movies from their list of favorite movies.
- **Movie Catalog**: Users can explore a catalog of movies, view movie details, and search for movies based on title.

## Technology Used
- **Frontend**: React
- **Backend**: Node.js, Express, MongoDB
- **Authentification**: JWT ( JSON Web Tokens)
- **Database**: MongoDB Atlas

## Server-Side
- Allows users to see a list of all movies in the database
- Allows users to get detailed information about a single movie by movie title
- Allows new users to create a user account
- Allow existing users to update their user info or to delete their account
- Allow existing users to add movies to their favorites
- Allow existing users to remove movies from their favorites

## Dependencies 
- bcrypt
- body-parser
- cors
- express
- express-validator
- jsonwebtoken
- mongoose
- morgan
- passport
- passport-jwt
- passport-local
- uuid

## Endpoints
### Get a list of all movies 
**Endpoint:** /movies
**HTTP Method:** GET
**Request body data format:** None
**Response body data format:** JSON Object holding data about all movies

### Get data about a single movie by title
**Endpoint:** /movies/:title
**HTTP Method:** GET
**Request body data format:** None
**Response body data format:** A JSON object holding data about a single movie, containing title, genre, director, and featured.
**Response Example:**
```
{
    "genre": {
        "name": "comedy",
        "description": "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
    },
    "director": {
        "name": "Burr Steers",
        "bio": "Burr Gore Steers is an American actor, screenwriter, and director. His films include Igby Goes Down and 17 Again.",
        "birth": "1965"
    },
    "actors": [],
    "_id": "6571e846ee4021c4a7dd5c1a",
    "title": "17 Again",
    "description": "Mike O'Donnell (Matthew Perry) was a high-school basketball star with a bright future, but he threw it all away to marry his girlfriend and raise their child. Almost 20 years later, Mike'/s marriage has failed, his kids think he'/s a loser, and his job is going nowhere. He gets a chance to correct the mistakes of his past and change his life when he is miraculously transformed into a teenager (Zac Efron), but in trying to fix his past, Mike may be jeopardizing his present and future.",
    "ImagePath": "https://upload.wikimedia.org/wikipedia/en/e/e1/17again.jpg"
}
```

### Get data about a genre by name
**Endpoint:** /movies/:genreName
**HTTP Method:** GET
**Request body data format:** None
**Response body data format:** A JSON object holding data about a movie genre containing name and description.
**Response Example:**
```
{
    "name": "Comedy",
    "description": "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
}
```

### Get data about a director by name
**Endpoint:** /movies/:directorName
**HTTP Method:** GET
**Request body data format:** None
**Response body data format:** A JSON object holding data about a single director, containing director name and bio. 
**Response Example:**
```
{
"Name": 'Burr Steers',
"Bio": "Burr Gore Steers is an American actor, screenwriter, and director. His films include Igby Goes Down and 17 Again.",
},
```

### Get list of all users
**Endpoint:** /users
**HTTP Method:** GET
**Request body data format:** None
**Response body data format:** A JSON object holding data about all users

### Get a user by username
**Endpoint:** /users/:username
**HTTP Method:** GET
**Request body data format:** None
**Response body data format:** A JSON object holding data about the user.
**Response Example:**
```
{
    "_id": "65bfea0fb7d7167cf6900cf4",
    "username": "sample01",
    "password": "$2b$10$.rFc0cmnUN/55LLmfhTQfOLOMBUytTxwXlWADTGQeHoVw/H3LUVgq",
    "email": "sample@gmail.com",
    "birthday": "1993-04-24T00:00:00.000Z",
    "favoriteMovies": [],
    "__v": 0
}
```

### Add a New User
**Endpoint:** /users
**HTTP Method:** POST
**Request body data format:** JSON object holding data about a user, structured like:
**Request Example:**
```
{
    "username":"sample01",
    "password":"password",
    "email":"sample@gmail.com",
    "birthday":"04-24-1993"
}
```
**Response body data format:** A JSON object holding data about the user.
**Response Example:**
```
{
    "username": "sample01",
    "password": "$2b$10$axxu3EeRJYDE8Ti6ye0Y8.p0aRdT1WCpZ5XCeJov0qyQI2pD1oh.i",
    "email": "sample@gmail.com",
    "birthday": "1993-04-24T00:00:00.000Z",
    "favoriteMovies": [],
    "_id": "66cdef84977c1cde0b6e446f",
    "__v": 0
}
```

### Update user info by username
**Endpoint:** /users/:username
**HTTP Method:** PUT
**Request body data format:** JSON object holding data to be updated, structured like:
```
{
    "Username": "sample01",
    "Password": "getNewPassword",
    "Email": "sample01@gmail.com",
    "Birthday": "1984-10-06T00:00:00.000Z"    
}
```
**Response body data format:** A JSON object holding updated user info
**Response Example:**
```
{
    "Favorites": [
        "5dbc29331c8922ba13eb0361",
        "5dbc27dc1c8922ba13eb035f"
    ],
    "_id": "5dca6f0e309c02bd94b20429",
    "Username": "sample01",
    "Password": "getNewPassword",
    "Email": "sample01@gmail.com",
    "Birthday": "1984-10-06T00:00:00.000Z"
}
```

### Add a movie to list of favorites by movie ID
**Endpoint:** /users/:username/movies/:movieID
**HTTP Method:** POST
**Request body data format:** None
**Response body data format:** An updated list of favorite movies
**Response Example:**
```
{
    "_id": "65bfea0fb7d7167cf6900cf4",
    "username": "sample01",
    "password": "$2b$10$.rFc0cmnUN/55LLmfhTQfOLOMBUytTxwXlWADTGQeHoVw/H3LUVgq",
    "email": "sample@gmail.com",
    "birthday": "1993-04-24T00:00:00.000Z",
    "favoriteMovies": [
        "6571ef65ee4021c4a7dd5c22"
    ],
    "__v": 0
}
```

### Delete a movie to list of favorites by movie ID
**Endpoint:** /users/:username/movies/:movieID
**HTTP Method:** DELETE
**Request body data format:** None
**Response body data format:** An updated list of favorite movies
**Response Example:**
```
{
    "_id": "65bfea0fb7d7167cf6900cf4",
    "username": "sample01",
    "password": "$2b$10$.rFc0cmnUN/55LLmfhTQfOLOMBUytTxwXlWADTGQeHoVw/H3LUVgq",
    "email": "sample@gmail.com",
    "birthday": "1993-04-24T00:00:00.000Z",
    "favoriteMovies": [],
    "__v": 0
}
```

### Delete user by username
**Endpoint:** /users/:username
**HTTP Method:** DELETE
**Request body data format:** None
**Response body data format:** A text message indicating whether the user account was successfully deleted.
**Response Example:**
```
sample01 was deleted
```

-------------------------

