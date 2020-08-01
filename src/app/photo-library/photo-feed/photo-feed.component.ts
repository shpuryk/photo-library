import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { take } from 'rxjs/operators';
import { IMAGES_TO_LOAD } from '../shared/gallery/gallery.const';

@Component({
  selector: 'app-photo-feed',
  templateUrl: './photo-feed.component.html',
  styleUrls: ['./photo-feed.component.scss']
})
export class PhotoFeedComponent {

  photoBatch: string[];

  constructor(private api: ApiService) { }

  addToFavorites(e): void {
    console.log('addToFavorites  ', e);
  }

  getBatch(offset: number): void {
    this.api.fetchPhotos(IMAGES_TO_LOAD, offset).pipe(take(1))
    .subscribe(data => {
        this.photoBatch = data;
      });
  }

}
