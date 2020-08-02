import { Component, OnInit } from '@angular/core';
import { FavoritePhoto } from 'src/app/core/photo-library.service';
import { PhotoLibraryService } from '../../core/photo-library.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  photos: FavoritePhoto[] = [];

  constructor(private photoLibrary: PhotoLibraryService) { }

  ngOnInit(): void {
    this.photoLibrary.fetchFavorites().pipe(take(1)).subscribe(data => {
      this.photos = data;
    });
  }

  openDetails(photo: FavoritePhoto): void {
    console.log(photo);
  }

}
