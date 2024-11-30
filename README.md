# myFlix Angular App

myFlix is a single-page, responsive movie app built with Angular. The app allows users to access information about different movies, directors, and genres, and to create a profile to save their favorite movies. This project serves as the client-side for the myFlix app. It interacts with an existing REST API to handle user requests (see movie_api on GitHub: https://github.com/lenachat/movie_api).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 19.0.2.

## Features

- **User Registration & Login**: Users can register for an account or log in to access the app.
- **Movie List**: Authenticated users can view a list of all available movies.
- **Movie Details**: Upon selecting a movie, users can view detailed information about the movie, including its director and genre. Users can also add movies to their list of favorites. Users can also retrieve details of the movie's director or its genre.
- **Profile View**: Users can view their user data, update their user information, or deregister from the app.
- **Responsive Design**: The app is designed to work across various devices and screen sizes.

## Technologies Used

- Angular (version 9+)
- Angular Material for UI design
- REST API for backend communication
- TypeDoc for code documentation
- Node.js and npm for dependency management

## Key Views

- **Welcome View**: Users can log in or register.
- **Movies View**: Displays all movies fetched from the REST API.
- **Movie Details View**: Provides more information about a selected movie.
  - Includes buttons for navigating to the **Director View** and **Genre View**.
- **Profile View**: Shows user's profile data, as well as list of favorite movies.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/lenachat/myFlix-Angular-client.git
    ```

2. Navigate into the project directory:
    ```bash
    cd myFlix-Angular-client
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Run the Angular app:
    ```bash
    ng serve
    ```

5. Open your browser and navigate to `http://localhost:4200/`.

## API Integration

The app interacts with the movie REST API to handle the following operations:

- User registration and login
- Fetching a list of movies
- Retrieving details about a selected movie, director, or genre
- Fetching and updating user data

## Documentation

- The app's codebase is fully documented using TypeDoc for easy handoff and collaboration.
- All functions and modules include comments following TypeDoc standards.

## Deployment

The app is hosted on GitHub Pages for public access. You can view the live demo here: https://lenachat.github.io/myFlix-Angular-client/

