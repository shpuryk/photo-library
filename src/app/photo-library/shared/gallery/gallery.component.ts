import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @Input() photos: string[];
  @Output() photoClick: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
