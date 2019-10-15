import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceModule } from './services/service.module';
import { StoreModule } from '@ngrx/store';
import * as fromState from './store';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        ServiceModule,
        StoreModule.forFeature(fromState.stateFeatureKey, fromState.reducers, { metaReducers: fromState.metaReducers })
    ]
})
export class CoreModule {}
