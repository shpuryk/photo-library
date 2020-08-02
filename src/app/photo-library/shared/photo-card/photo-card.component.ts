import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FavoritePhoto } from 'src/app/core/photo-library.service';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent implements OnInit {

  @Input() image: string | FavoritePhoto;
  @Output() onClick: EventEmitter<string | FavoritePhoto> = new EventEmitter();

  imageUrl: string;

  constructor() { }

  ngOnInit(): void {
    this.imageUrl = typeof this.image === 'object' ? this.image.url : this.image;
  }

}
