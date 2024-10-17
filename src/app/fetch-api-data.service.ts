import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators/catchError';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnonymousSubject } from 'rxjs/internal/Subject';

//Declaring the api url that will provide data for the client app

/**
 * API URL
 * @const {string}
 */
const apiUrl = 'https://moviemate-mk9e.onrender.com/';

@Injectable({
  providedIn: 'root'
})

export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  // Making the api call for the user registration endpoint

  /**
   * POST - API call for user registration endpoint
   * @param userDetails - object with username, password, email, and birthday
   * @returns server response of user registration endpoint
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * POST - API call for user login endpoint
   * @param userDetails - object with username and password
   * @returns server response of user login endpoint
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET - API call to retrieve all movies
   * @returns array of all movie objects in the database
   * The request header includes user's bearer token for authorization
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: `Bearer ${token}`,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET - API call to retrieve a single movie by title
   * @param title - movie title as a string
   * @returns movie object with matching title
   */
  public getMovie(title: string): Observable<any> {
    return this.http.get(apiUrl + `movies/${title}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET - API call to retrieve a single movie by ID
   * @param id - movie ID as a string
   * @returns movie object with matching ID
   */
  public getMovieById(id: string): Observable<any> {
    return this.http.get(apiUrl + `movies/id/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET - API call to retrieve a director by name
   * @param name - director name as a string
   * @returns director object with matching name
   */
  public getDirector(name: string): Observable<any> {
    return this.http.get(apiUrl + `movies/director/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET - API call to retrieve a genre by name
   * @param name - genre name as a string
   * @returns genre object with matching name
   */
  public getGenre(name: string): Observable<any> {
    return this.http.get(apiUrl + `movies/genre/${name}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * GET - API call to retrieve a user by ID
   * @param id - user ID as a string
   * @returns user object with matching ID
   */
  public getUser(id: string): Observable<any> {
    return this.http.get(apiUrl + `users/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * PUT - API call to update user details
   * @param id - user ID as a string
   * @param userDetails - object with username, password, email, and birthday
   * @returns updated user object
   * The request header includes user's bearer token for authorization
   */
  public updateUser(id: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${id}`, userDetails, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE - API call to delete a user
   * @param id - user ID as a string
   * @returns success message
   * The request header includes user's bearer token for authorization
   */
  public deleteUser(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * POST - API call to add a movie to user's list of favorites
   * @param userId - user ID as a string
   * @param movieId - movie ID as a string
   * @returns updated user object and success message
   * The request header includes user's bearer token for authorization
   */
  public addFavoriteMovie(userId: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${userId}/favorites/${movieId}`, {}, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * DELETE - API call to remove a movie from user's list of favorites
   * @param userId - user ID as a string
   * @param movieId - movie ID as a string
   * @returns updated user object and success message
   * The request header includes user's bearer token for authorization
   */
  public removeFavoriteMovie(id: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${id}/favorites/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handles errors in API calls
   * @param error - error response from API call
   * @returns error message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some client-side error occurred:', error.error.message);
    } else {
      console.error(
        `Backend error status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}