import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';
import { DirectorDetailsComponent } from '../director-details/director-details.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.scss'],
    standalone: false
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // Object to store user data
  favoriteMovies: any = []; // Array to store favorite movies

  constructor(
    public fetchMovies: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private fetchApiData: FetchApiDataService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getUserData();
    this.getFavoriteMovies();
  }
  /**
   * Fetches user data from local storage
   * @returns {void}
   * @method getUserData
   * @memberof UserProfileComponent
   */
  getUserData(): void {
    const userData = localStorage.getItem('user'); // Assume user ID is stored in localStorage
    if (userData) {
      this.user = JSON.parse(userData);
    }
  }

  /**
   * Fetches user's favorite movies from the database
   * @returns {void}
   * @method getFavoriteMovies
   * @memberof UserProfileComponent
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((movies: any[]) => {
      if (this.user.favorites) {
        console.log('Favorite Movies:', this.user.favorites);
        this.favoriteMovies = movies.filter((movie) => this.user.favorites.includes(movie._id));
      }
    }, (err) => {
      console.error('Error, fetching movies:', err);
    });
  }

  /**
   * Opens the edit profile dialog
   * @returns {void}
   * @method openEditProfileDialog
   * @memberof UserProfileComponent
   */
  openEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileFormComponent, {
      width: '400px',
      data: this.user // Pass user data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result; // Update user data after successful edit
        localStorage.setItem('user', JSON.stringify(this.user)); // Update local storage
      }
    });
  }

  /**
   * Deletes user account from the app
   * @returns {void}
   * @method deleteProfile
   * @memberof UserProfileComponent
   */
  deleteProfile(): void {

    const userId = this.user._id;
    this.router.navigate(['welcome']);

    this.fetchApiData.deleteUser(userId).subscribe((result) => {
      console.log('User deleted successfully:', result.message);
      this.snackBar.open('Your account has been deleted!', 'OK', {
        duration: 2000
      });
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }, (error) => {
      console.error('Error deleting user:', error);
    });
  }

  /**
   * Navigates back to the movies view
   * @returns {void}
   * @method goBack
   * @memberof UserProfileComponent
   */
  goBack(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Logs out the user and clears local storage
   * @returns {void}
   * @method onLogout
   * @memberof UserProfileComponent
   */
  Logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
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
}
