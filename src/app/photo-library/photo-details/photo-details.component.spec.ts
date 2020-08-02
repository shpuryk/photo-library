import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { PhotoDetailsComponent } from './photo-details.component';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { PhotoLibraryService, FavoritePhoto } from 'src/app/core/photo-library.service';
import { of } from 'rxjs';

describe('PhotoDetailsComponent', () => {
  let component: PhotoDetailsComponent;
  let fixture: ComponentFixture<PhotoDetailsComponent>;

  let routerSpy: jasmine.SpyObj<Router>;
  let photoLibSpy: jasmine.SpyObj<PhotoLibraryService>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('routerSpy', ['navigate']);
    photoLibSpy = jasmine.createSpyObj('photoLibSpy', [
      'getFromFavorites',
      'removeFromFavorites',
    ]);
    photoLibSpy.getFromFavorites.and.returnValue(of({id: 1, url: 'url'}));
    photoLibSpy.removeFromFavorites.and.returnValue(of());
    TestBed.configureTestingModule({
      declarations: [PhotoDetailsComponent],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: PhotoLibraryService, useValue: photoLibSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: 1}} } },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getFromFavorites on init ', () => {
    component.ngOnInit();
    expect(photoLibSpy.getFromFavorites).toHaveBeenCalledWith(1);
  });

  it('should set data ', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.photo).toEqual({id: 1, url: 'url'});
  }));

  it('should call removeFromFavorites on remove ', () => {
    component.photo = {id: 1} as FavoritePhoto;
    component.removeFromFavorites();
    expect(photoLibSpy.removeFromFavorites).toHaveBeenCalledWith(1);
  });
});
