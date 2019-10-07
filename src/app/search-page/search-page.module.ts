import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { ResultsComponent } from './results/results.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SearchPageComponent } from './search-page.component';
import { MaterialModule } from '../material/material.module';
import { LoaderComponent } from '../loader/loader.component';
@NgModule({
  declarations: [InputComponent, LoaderComponent, MovieCardComponent, SearchPageComponent, ResultsComponent],
  imports: [CommonModule, FormsModule, MaterialModule, ReactiveFormsModule],
  exports: [SearchPageComponent],
})
export class SearchPageModule {}
