import { Injectable } from '@angular/core';
import * as faker from 'faker';

/**
 * there are only 130 unique images on lorempixel which faker using
 * (13 image categories, 10 images in category)
 */
export const MAX_IMAGES_COUNT = 130;

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  generateRandomImages(count?: number): string[] {
    if (typeof count === 'undefined' || count < 1 || count > MAX_IMAGES_COUNT) {
      count = MAX_IMAGES_COUNT;
    }
    const imgUrls: string[] = [];
    while (imgUrls.length < count) {
      // example of url: 'http://lorempixel.com/400/200/sports/1'
      const imageUrl = `${faker.image.image()}\/${Math.ceil(Math.random() * 10)}`;
      if (imgUrls.includes(imageUrl)) {
        continue;
      } else {
        imgUrls.push(imageUrl);
      }
    }
    return imgUrls;
  }
}
