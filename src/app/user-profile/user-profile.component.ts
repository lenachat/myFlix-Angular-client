import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {}; // Object to store user data
  favoriteMovies: any = []; // Array to store favorite movies

  constructor(
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
        console.log(this.user.favorites);
        this.favoriteMovies = movies.filter((movie) => this.user.favorites.includes(movie._id));
      }}, (err) => {
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

}
