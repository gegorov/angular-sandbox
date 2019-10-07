import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';
import { SearchPageModule } from './search-page/search-page.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserAnimationsModule, BrowserModule, CoreModule, MaterialModule, SearchPageModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
