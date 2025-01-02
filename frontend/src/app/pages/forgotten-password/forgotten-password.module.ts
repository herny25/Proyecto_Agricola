import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgottenPasswordRoutingModule } from './forgotten-password-routing.module';
import { ForgottenPasswordPageComponent } from './forgotten-password-page/forgotten-password-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ForgottenPasswordPageComponent
  ],
  imports: [
    CommonModule,
    ForgottenPasswordRoutingModule,
    FormsModule
  ]
})
export class ForgottenPasswordModule { }
