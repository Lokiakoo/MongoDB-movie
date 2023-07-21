# MongoDB

This is a MongoDB database, in this database, you can use the API to perform a wide range of operations,</br>
A example of RESTful API, Including GET, PUT, POST, DELETE.</br>
The API provides a simple and flexible interface for interacting with your data,
and can be used to build applications that can scale and adapt to changing requirements.

## Endpoint List

### Film
- /count - (GET) Retrieve the total number of films in the database.
- /about-us - (GET) Retrieve information about the API and its developers.
- /filmcord/:title - (GET) Retrieve film information from the OMDB API based on the given title.
- /film/:film - (GET) Retrieve information for a select film.
- /searchkeyword/:keyword - (GET) Search for films based on a keyword.
- /filmtype/:keyword - (GET) Retrieve all films of a select type.
- /list - (GET) List all films in the database.
- /film - (POST) Add a new film to the database.
- /comment - (POST) Add a comment to a film.
- /removefilm/:film - (DELETE) Remove a select film from the database.

### User
- /apply - (POST) Add a new user account to the database.
- /auth - (POST) Authenticate a user and generate a JSON Web Token (JWT).
- /logout - (POST) Logout the current user and destroy the JWT.
- /sendmessage - (POST) Send a message to another user.
- /update - (PUT) Update the user information.
- /removeuser/:username - (DELETE) Remove a user account from the database.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Resources

[MongoDB Documentation](https://www.mongodb.com/docs/)
</br>
[MongoDB Atlas](https://www.mongodb.com/docs/atlas/api/)
