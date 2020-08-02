import { Injectable } from '@angular/core';
import { MockDataService } from './mock-data.service';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LocalStorageService } from './local-storage.service';

const IMAGES_COUNT = 50;
export const FAVORITES_KEY = 'favorites';

export interface FavoritePhoto {
  id: number;
  url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PhotoLibraryService {
  mockImageUrls: string[] = [];

  constructor(
    private mockData: MockDataService,
    private localStorage: LocalStorageService
  ) {
    this.mockImageUrls = this.mockData.generateRandomImages(IMAGES_COUNT);

    if (!this.localStorage.get(FAVORITES_KEY)) {
      this.localStorage.set(FAVORITES_KEY, []);
    }
  }
  /**
   * fetch photos for random photostream with pagination
   * @param amount number of photos to get for one batch
   * @param offset index of first photo
   */
  fetchPhotos(amount: number, offset: number): Observable<string[]> {
    return of(this.mockImageUrls.slice(offset, amount + offset)).pipe(
      delay(500)
    );
  }

  fetchFavorites(): Observable<FavoritePhoto[]> {
    return of(this.getFavorites());
  }

  addToFavorites(imageUrl: string): Observable<void> {
    return new Observable<void>((observer) => {
      const favorites = this.getFavorites();
      if (favorites.some(f => f.url === imageUrl)) {
        return observer.error();
      }
      this.setFavorites([
        ...favorites,
        {
          id: favorites.length ? favorites[favorites.length - 1].id + 1 : 1,
          url: imageUrl,
        },
      ]);
      return observer.next();
    });
  }

  removeFromFavorites(id: number): Observable<void> {
    return new Observable<void>((observer) => {
      this.setFavorites(this.getFavorites().filter((f) => f.id !== id));
      return observer.next();
    });
  }

  private getFavorites(): FavoritePhoto[] {
    return this.localStorage.get(FAVORITES_KEY);
  }

  private setFavorites(items: FavoritePhoto[]): void {
    return this.localStorage.set(FAVORITES_KEY, items);
  }

}
