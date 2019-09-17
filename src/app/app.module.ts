import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { ResultsComponent } from './results/results.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, InputComponent, ResultsComponent],
  imports: [BrowserModule, HttpClientModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
