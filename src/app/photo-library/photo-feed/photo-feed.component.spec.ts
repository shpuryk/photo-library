import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PhotoFeedComponent } from './photo-feed.component';
import { ApiService } from 'src/app/core/api.service';
import { of } from 'rxjs';
import { GalleryComponent } from '../shared/gallery/gallery.component';
import { IMAGES_TO_LOAD } from '../shared/gallery/gallery.const';

describe('PhotoFeedComponent', () => {
  let component: PhotoFeedComponent;
  let fixture: ComponentFixture<PhotoFeedComponent>;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;
  beforeEach(async(() => {

    apiServiceSpy = jasmine.createSpyObj('apiServiceSpy', [
      'fetchPhotos'
    ]);
    apiServiceSpy.fetchPhotos.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [ PhotoFeedComponent, GalleryComponent ],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call fetchPhotos', fakeAsync(() => {
    component.getBatch(10);
    expect(apiServiceSpy.fetchPhotos).toHaveBeenCalledWith(IMAGES_TO_LOAD, 10);
  }));


});
