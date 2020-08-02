import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { Router } from '@angular/router';
import { PhotoLibraryService } from 'src/app/core/photo-library.service';
import { of } from 'rxjs';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let photoLibSpy: jasmine.SpyObj<PhotoLibraryService>;

  const testPhoto = {
    id: 1,
    url: 'url'
  };

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('routerSpy', ['navigate']);
    photoLibSpy = jasmine.createSpyObj('photoLibSpy', ['fetchFavorites']);
    photoLibSpy.fetchFavorites.and.returnValue(of([testPhoto]));
    TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: PhotoLibraryService, useValue: photoLibSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch data', () => {
    component.ngOnInit();
    expect(photoLibSpy.fetchFavorites).toHaveBeenCalled();
  });

  it('should init data', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.photos).toEqual([testPhoto]);
  }));

  it('should navigate to photo details', () => {
    component.openDetails(testPhoto);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['photos', testPhoto.id]);
  });
});
