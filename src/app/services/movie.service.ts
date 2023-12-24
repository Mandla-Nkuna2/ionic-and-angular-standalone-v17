import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';

const BASE_URL = 'http://localhost:3000/posts'
const API_KEY = environment.apiKey

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private http = inject(HttpClient);

  constructor() { }

  getTopRatedMovies(page = 1): Observable<Movie[]>{
    return this.http.get<Movie[]>(`${BASE_URL}?_page=${page}`)
    // .pipe(delay(4000));
  }

  getMovieDetails(id: number): Observable<Movie>{
    return this.http.get<Movie>(`${BASE_URL}/${id}`)
  }
}
