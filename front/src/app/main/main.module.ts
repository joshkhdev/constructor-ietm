import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MatButtonModule } from '@angular/material/button';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  declarations: [MainComponent, SidenavComponent],
  imports: [CommonModule, MainRoutingModule, MatButtonModule],
})
export class MainModule {}
