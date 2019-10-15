import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { CoreModule } from './core/index';
import { SearchPageModule } from './search-page/index';
import { SharedModule } from './shared/index';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FilmsToWatchComponent } from './films-to-watch/index';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [AppComponent, FilmsToWatchComponent],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        AppRoutingModule,
        CoreModule,
        SearchPageModule,
        SharedModule,
        StoreModule.forRoot({}),
        !environment.production ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
