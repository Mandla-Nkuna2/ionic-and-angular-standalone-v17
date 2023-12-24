import { Component, inject, HostListener } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonAvatar,
  IonItem,
  IonList,
  IonSkeletonText,
  IonAlert,
  IonLabel,
  IonBadge,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from '@ionic/angular/standalone';

import { MovieService } from '../../services/movie.service';
import { catchError, finalize } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonSkeletonText,
    IonAlert,
    IonLabel,
    DatePipe,
    RouterModule,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class HomePage {
  private movieService = inject(MovieService);

  // values used in the DOM must be public
  public currentPage = 1;
  public error = null;
  public isLoading = false;
  public movies: Movie[] = [];
  public dummyArray = new Array(10);

  constructor() {
    this.loadMovies();
  }

  // Scroll event listener
  @HostListener('window:scroll', ['$event'])
  onScroll(event: InfiniteScrollCustomEvent): void {
    // Check if the user has scrolled to the bottom (adjust threshold as needed)
    this.currentPage++;
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 100
    ) {
      this.loadMovies(event);
    }
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;
    if (!event) this.isLoading = true;

    this.movieService
      .getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) event.target.complete();
        }),
        catchError((err: any) => {
          console.log('error :>> ', err);
          this.error = err.message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          if (res.length > 0) {
            res.map((movie) => {
              this.movies.push(movie);
            });
            // event.target.disabled = res.total_pages === yhis.currentPage
          } else // if we reach the end of the data, disable infinite loading
            if (event) event.target.disabled = true; 
        },
      });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }
}
