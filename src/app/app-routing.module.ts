import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchPageComponent } from './search-page/index';
import { FilmsToWatchComponent } from './films-to-watch/index';

const routes: Routes = [
    { path: '', component: SearchPageComponent },
    { path: 'filmstowatch', component: FilmsToWatchComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
