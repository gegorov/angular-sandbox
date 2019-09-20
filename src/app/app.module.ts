import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { MaterialModule } from './material/material.module';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { ResultsComponent } from './results/results.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

@NgModule({
  declarations: [AppComponent, InputComponent, ResultsComponent, MovieCardComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
