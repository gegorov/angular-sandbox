import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatIconModule, MatSidenavModule, MatInputModule],
  exports: [MatButtonModule, MatIconModule, MatSidenavModule, MatInputModule]
})
export class MaterialModule {}
