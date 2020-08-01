import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoFeedComponent } from './photo-feed/photo-feed.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { GalleryComponent } from './shared/gallery/gallery.component';
import { PhotoCardComponent } from './shared/photo-card/photo-card.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    PhotoFeedComponent,
    FavoritesComponent,
    HeaderComponent,
    GalleryComponent,
    PhotoCardComponent,
  ],
  exports: [PhotoFeedComponent, FavoritesComponent, HeaderComponent],
  imports: [CommonModule, RouterModule, ScrollingModule, MatProgressSpinnerModule],
})
export class PhotoLibraryModule {}
