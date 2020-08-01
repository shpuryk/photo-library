import { TestBed } from '@angular/core/testing';

import { MockDataService, MAX_IMAGES_COUNT } from './mock-data.service';

describe('MockDataService', () => {
  let service: MockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should generate list of urls', () => {
    const list = service.generateRandomImages(5);
    expect(list.length).toBe(5);
  });

  it('should generate list of urls if count not specified', () => {
    const list = service.generateRandomImages();
    expect(list.length).toBe(MAX_IMAGES_COUNT);
  });

  it('should generate list of urls if count is negative', () => {
    const list = service.generateRandomImages();
    expect(list.length).toBe(MAX_IMAGES_COUNT);
  });

  it('list should constains urls ', () => {
    const list = service.generateRandomImages(10);
    expect(list[0].startsWith('http')).toBeTruthy();
  });
});
