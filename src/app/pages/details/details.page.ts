import { Component, Input, WritableSignal, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/models/movie.model';
import { addIcons } from 'ionicons';
import {cashOutline, calendarOutline } from 'ionicons/icons'

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ]
})
export class DetailsPage {
  private movieService = inject(MovieService);
  public movie: WritableSignal<Movie | null> = signal(null);

  @Input()
  set id(movieId: number) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      console.log('movie :>> ', movie);
      this.movie.set(movie);
    })
  }

  constructor() {
    addIcons({ cashOutline, calendarOutline})
  }
}
