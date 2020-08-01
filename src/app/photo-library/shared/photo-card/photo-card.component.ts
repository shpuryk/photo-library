import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent implements OnInit {

  @Input() imageUrl: string;
  @Output() onClick: EventEmitter<sting> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
