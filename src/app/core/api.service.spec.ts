import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  const IMAGES_COUNT = 50;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
      service.fetchPhotos(30, 30).subscribe(nextdata => {
        expect(nextdata.length).toBe(20); // 50 - 30 = 20
        done();
      });
    });
  });
});
