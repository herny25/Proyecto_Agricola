  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';

  import { HelpRoutingModule } from './help-routing.module';
  import { HelpPageComponent } from './help-page/help-page.component';
import { RouterModule } from '@angular/router';


  @NgModule({
    declarations: [
      HelpPageComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      HelpRoutingModule
    ]
  })
  export class HelpModule { }
