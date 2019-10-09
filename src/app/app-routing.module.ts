import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/search-page.component';
import { FilmsToWatchComponent } from './films-to-watch/films-to-watch.component';

const routes: Routes = [
    { path: '', component: SearchPageComponent },
    { path: 'filmstowatch', component: FilmsToWatchComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
