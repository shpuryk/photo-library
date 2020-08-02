import { TestBed } from '@angular/core/testing';
import { PhotoLibraryService, FAVORITES_KEY } from './photo-library.service';
import * as faker from 'faker';
import { LocalStorageService } from './local-storage.service';

describe('PhotoLibraryService', () => {
  let service: PhotoLibraryService;
  const IMAGES_COUNT = 50;
  let localStorageSpy: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    localStorageSpy = jasmine.createSpyObj('localStorageSpy', ['set', 'get']);
    localStorageSpy.get.and.returnValue([]);

    TestBed.configureTestingModule({
      providers: [{ provide: LocalStorageService, useValue: localStorageSpy }],
    });
    service = TestBed.inject(PhotoLibraryService);
  });

  it('should init mock data', () => {
    expect(service.mockImageUrls.length).toBe(IMAGES_COUNT);
  });

  it('should fetch first batch', (done) => {
    const photos$ = service.fetchPhotos(30, 0);
    photos$.subscribe((data) => {
      expect(data.length).toBe(30);
      done();
    });
  });

  it('should fetch second batch', (done) => {
    service.fetchPhotos(30, 0).subscribe((data) => {
      service.fetchPhotos(30, 30).subscribe((nextdata) => {
        expect(nextdata.length).toBe(20); // 50 - 30 = 20
        done();
      });
    });
  });

  it('should fetch favorites', (done) => {
    service.fetchFavorites().subscribe((data) => {
      expect(localStorageSpy.get).toHaveBeenCalled();
      done();
    });
  });

  it('should add to favorites', (done) => {
    const url = faker.random.image();
    service.addToFavorites(url).subscribe(() => {
      expect(localStorageSpy.set).toHaveBeenCalledWith(FAVORITES_KEY, [
        { id: 1, url },
      ]);
      done();
    });
  });

  it('should remove from favorites', (done) => {
    const url = faker.random.image();
    service.addToFavorites(url).subscribe(() => {
      service.removeFromFavorites(1).subscribe(() => {
        expect(localStorageSpy.set).toHaveBeenCalledWith(FAVORITES_KEY, []);
        done();
      });
    });
  });
});
