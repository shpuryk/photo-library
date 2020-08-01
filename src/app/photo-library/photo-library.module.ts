import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoFeedComponent } from './photo-feed/photo-feed.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [PhotoFeedComponent, FavoritesComponent, HeaderComponent],
  exports: [PhotoFeedComponent, FavoritesComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class PhotoLibraryModule { }
