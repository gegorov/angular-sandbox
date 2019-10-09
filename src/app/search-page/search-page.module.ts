import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/input.component';
import { ResultsComponent } from './results/results.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SearchPageComponent } from './search-page.component';
import { SharedModule } from '../shared/shared.module';
@NgModule({
    declarations: [InputComponent, MovieCardComponent, SearchPageComponent, ResultsComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
    exports: [SearchPageComponent]
})
export class SearchPageModule {}
