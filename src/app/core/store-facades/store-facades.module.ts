import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmsToWatchStoreFacade } from './films-to-watch.store-facade';

@NgModule({
    imports: [CommonModule],
    providers: [FilmsToWatchStoreFacade]
})
export class StoreFacadeModule {}
