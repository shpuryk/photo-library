import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { PhotoFeedComponent } from './photo-feed.component';
import { PhotoLibraryService } from 'src/app/core/photo-library.service';
import { of } from 'rxjs';
import { GalleryComponent } from '../shared/gallery/gallery.component';
import { IMAGES_TO_LOAD } from '../shared/gallery/gallery.const';

describe('PhotoFeedComponent', () => {
  let component: PhotoFeedComponent;
  let fixture: ComponentFixture<PhotoFeedComponent>;
  let photoLibraryServiceSpy: jasmine.SpyObj<PhotoLibraryService>;
  beforeEach(async(() => {

    photoLibraryServiceSpy = jasmine.createSpyObj('photoLibraryServiceSpy', [
      'fetchPhotos'
    ]);
    photoLibraryServiceSpy.fetchPhotos.and.returnValue(of([]));

    TestBed.configureTestingModule({
      declarations: [ PhotoFeedComponent, GalleryComponent ],
      providers: [{ provide: PhotoLibraryService, useValue: photoLibraryServiceSpy }]
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
    expect(photoLibraryServiceSpy.fetchPhotos).toHaveBeenCalledWith(IMAGES_TO_LOAD, 10);
  }));


});
