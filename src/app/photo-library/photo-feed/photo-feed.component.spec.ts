import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoFeedComponent } from './photo-feed.component';

describe('PhotoFeedComponent', () => {
  let component: PhotoFeedComponent;
  let fixture: ComponentFixture<PhotoFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
