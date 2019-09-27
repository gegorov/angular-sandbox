import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [],
  imports: [CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatSidenavModule, MatInputModule],
  exports: [MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule, MatInputModule]
})
export class MaterialModule {}
