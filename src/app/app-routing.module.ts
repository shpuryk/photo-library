import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoFeedComponent } from './photo-library/photo-feed/photo-feed.component';
import { FavoritesComponent } from './photo-library/favorites/favorites.component';
import { PhotoDetailsComponent } from './photo-library/photo-details/photo-details.component';

export const routes: Routes = [
  { path: '', component: PhotoFeedComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'photos/:id', component: PhotoDetailsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
