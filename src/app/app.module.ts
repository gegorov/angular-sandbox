import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { SearchPageModule } from './search-page/search-page.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FilmsToWatchComponent } from './films-to-watch/films-to-watch.component';
@NgModule({
    declarations: [AppComponent, FilmsToWatchComponent],
    imports: [BrowserAnimationsModule, BrowserModule, AppRoutingModule, CoreModule, SearchPageModule, SharedModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
