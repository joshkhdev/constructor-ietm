import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SceneRoutingModule } from './scene-routing.module';
import { SceneComponent } from './scene.component';
import { MatButtonModule } from '@angular/material/button';
import { ViewerToolbarComponent } from './components/viewer-toolbar/viewer-toolbar.component';
import { ViewerButtonComponent } from './components/viewer-button/viewer-button.component';

@NgModule({
  declarations: [SceneComponent, ViewerToolbarComponent, ViewerButtonComponent],
  imports: [CommonModule, SceneRoutingModule, MatButtonModule],
  exports: [SceneComponent],
})
export class SceneModule {}
