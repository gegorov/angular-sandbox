import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SearchPageModule } from './search-page/search-page.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { FilmPageComponent } from './film-page/film-page.component';

@NgModule({
    declarations: [AppComponent, FilmPageComponent],
    imports: [BrowserAnimationsModule, BrowserModule, CoreModule, SearchPageModule, SharedModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
