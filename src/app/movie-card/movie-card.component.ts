import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
  standalone: false
})
export class MovieCardComponent implements OnInit {

  @Input() movie: any; // Accept the movie object as input

  movies: any[] = [];

  constructor(
    public fetchMovies: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Fetches all movies from the database
   */
  getMovies(): void {
    this.fetchMovies.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Opens the movie details dialog
   * @param movie - The movie object to be displayed in the dialog
   * @returns {void}
   * @method showMovieDetails
   * @memberof MovieCardComponent
   */
  showMovieDetails(movie: any): void {
    console.log(movie);
    this.dialog.open(MovieDetailsComponent, {
      data: movie,
      width: '400px'
    });
  }

  /**
   * Navigates to the user profile page
   * @returns {void}
   * @method seeProfile
   * @memberof MovieCardComponent
   */
  seeProfile(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user._id;
      console.log(user._id);
      this.router.navigate(['users/' + userId]);
    }
  }

  /**
   * Logs the user out and redirects to the welcome page
   * @returns {void}
   * @method Logout
   * @memberof MovieCardComponent
   */
  Logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }

  /**
   * Checks if a movie is in the user's favorites
   * @param movie 
   * @returns {boolean}
   * @method isFavorite
   * @memberof MovieCardComponent
   */
  isFavorite(movie: any): boolean {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.favorites.includes(movie._id); // Check if movie is in favorites
    }
    return false;
  }

  /**
   * Adds or removes a movie from the user's favorites
   * @param movie 
   * @returns {void}
   * @method toggleFavorites
   * @memberof MovieCardComponent
   */
  toggleFavorites(movie: any): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const userId = user._id;
      const movieId = movie._id;

      if (!this.isFavorite(movie)) {

        this.fetchMovies.addFavoriteMovie(userId, movieId).subscribe((updatedUser: any) => {
          this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });

          // Update localStorage with the updated user object
          localStorage.setItem('user', JSON.stringify(updatedUser));
        });
      } else {
        this.fetchMovies.removeFavoriteMovie(userId, movieId).subscribe((updatedUser: any) => {
          this.snackBar.open('Removed from favorites!', 'OK', { duration: 2000 });

          // Update localStorage with the updated user object
          localStorage.setItem('user', JSON.stringify(updatedUser));
        });
      }
    }
  }

  /**
   * Opens the director details dialog
   * @param director - The director object to be displayed in the dialog
   * @returns {void}
   * @method showDirectorDetails
   * @memberof MovieCardComponent
   */
  showDirectorDetails(director: { name: string, biography: string, birth: string, death: string }): void {
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        name: director.name,
        biography: director.biography,
        birth: director.birth,
        death: director.death
      },
      width: '400px'
    });
  }

  /**
   * Opens the genre details dialog
   * @param genre - The genre object to be displayed in the dialog
   * @returns {void}
   * @method showGenreDetails
   * @memberof MovieCardComponent
   */
  showGenreDetails(genre: { name: string, description: string }): void {
    this.dialog.open(GenreDetailsComponent, {
      data: {
        name: genre.name,
        description: genre.description
      },
      width: '400px'
    });
  }

  /**
   * Navigates back to the movies page
   * @returns {void}
   * @method goBack
   * @memberof MovieCardComponent
   */
  goBack(): void {
    this.router.navigate(['movies']);
  }

}