import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from './services/service.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import * as fromState from './store/index';
import { StoreFacadeModule } from './store-facades/index';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ServiceModule,
        StoreModule.forRoot(fromState.reducers, { metaReducers: fromState.metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreFacadeModule
    ]
})
export class CoreModule {}
