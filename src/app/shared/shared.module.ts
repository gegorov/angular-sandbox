import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/index';
import { LoaderComponent } from './loader/index';

@NgModule({
    declarations: [LoaderComponent],
    imports: [CommonModule, MaterialModule],
    exports: [LoaderComponent, MaterialModule]
})
export class SharedModule {}
