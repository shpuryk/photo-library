import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PhotoLibraryService,
  FavoritePhoto,
} from 'src/app/core/photo-library.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.scss'],
})
export class PhotoDetailsComponent implements OnInit {
  photo: FavoritePhoto;
  errorText: string;
  constructor(
    private activeRouter: ActivatedRoute,
    private router: Router,
    private photoLibrary: PhotoLibraryService
  ) {}

  ngOnInit(): void {
    this.photoLibrary
      .getFromFavorites(+this.activeRouter.snapshot.params['id'])
      .pipe(take(1))
      .subscribe((data) => {
        // get bigger image
        data.url = data.url.replace('640', '1600').replace('480', '1200');
        this.photo = data;
      }, (error) => {
        this.errorText = error;
      });
  }

  removeFromFavorites(): void{
    this.photoLibrary.removeFromFavorites(this.photo.id).pipe(take(1)).subscribe(() => {
      this.router.navigate(['favorites']);
    });
  }
}
