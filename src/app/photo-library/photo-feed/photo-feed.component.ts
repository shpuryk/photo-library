import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-photo-feed',
  templateUrl: './photo-feed.component.html',
  styleUrls: ['./photo-feed.component.scss']
})
export class PhotoFeedComponent implements OnInit {

  photos: string[];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.fetchPhotos(20, 0).pipe(take(1)).subscribe(data => {
      this.photos = data;
    });
  }

  addToFavorites(e): void {
    console.log('addToFavorites  ', e);
  }

}
