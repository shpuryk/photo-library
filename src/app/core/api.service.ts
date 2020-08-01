import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const IMAGES_COUNT = 50;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  mockImageUrls: string[] = [];

  constructor(private mockData: MockDataService) {
    this.mockImageUrls = this.mockData.generateRandomImages(IMAGES_COUNT);
  }
  /**
   * fetch photos for random photostream with pagination
   * @param amount number of photos to get for one batch
   * @param offset index of first photo
   */
  fetchPhotos(amount: number, offset: number): Observable<string[]> {
    return of(this.mockImageUrls.slice(offset, amount + offset)).pipe(delay(500));
  }
}
