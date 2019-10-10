import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputComponent } from './input/index';
import { ResultsComponent } from './results/index';
import { MovieCardComponent } from './movie-card/index';
import { SearchPageComponent } from './index';
import { SharedModule } from '../shared/index';
@NgModule({
    declarations: [InputComponent, MovieCardComponent, SearchPageComponent, ResultsComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
    exports: [SearchPageComponent]
})
export class SearchPageModule {}
