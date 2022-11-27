import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FormGroup, NgForm } from '@angular/forms';
import { Movies } from '../movies';
import { MoviesService } from 'src/app/service/movies.service';

@Component({
  selector: 'app-moives-editor',
  templateUrl: './moives-editor.component.html',
  styleUrls: ['./moives-editor.component.scss'],
})
export class MoivesEditorComponent implements OnInit {

  movie: Movies = new Movies;

  movies$: Observable<Movies> = this.activatedRoute.params.pipe(
    switchMap((params) => this.movieService.get(params['id']))
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) =>
          this.movieService.get(params['id']).subscribe((movie) => {
            this.movie = movie || new Movies();
          })
        );
  }

  onUpdate(moviesForm: NgForm):void {
    this.movieService.update(moviesForm.value).subscribe((movie) => {
      this.router.navigate(['/', 'movie']);
    });
  }
}
