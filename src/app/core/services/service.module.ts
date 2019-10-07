import { NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MovieApiService } from './movie-api.service';
import { ApiInterceptor } from './api.interceptor';

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiInterceptor,
  multi: true,
};

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [INTERCEPTOR_PROVIDER, MovieApiService],
})
export class ServiceModule {}
