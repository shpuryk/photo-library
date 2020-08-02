import { Component } from '@angular/core';
import { PhotoLibraryService } from '../../core/photo-library.service';
import { take } from 'rxjs/operators';
import { IMAGES_TO_LOAD } from '../shared/gallery/gallery.const';

@Component({
  selector: 'app-photo-feed',
  templateUrl: './photo-feed.component.html',
  styleUrls: ['./photo-feed.component.scss']
})
export class PhotoFeedComponent {

  photoBatch: string[];

  constructor(private photoLibrary: PhotoLibraryService) { }

  addToFavorites(imgUrl: string): void {
    this.photoLibrary.addToFavorites(imgUrl).subscribe(() => {
      console.log('added to favorites');
    }, () => {
      console.log('already added to favorites');
    });
  }

  getBatch(offset: number): void {
    this.photoLibrary.fetchPhotos(IMAGES_TO_LOAD, offset).pipe(take(1))
    .subscribe(data => {
        this.photoBatch = data;
      });
  }

}
