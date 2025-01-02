import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordPageComponent } from './reset-password-page/reset-password-page.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [];

@NgModule({
  declarations: [
    ResetPasswordPageComponent
  ],
  imports: [FormsModule, FormsModule, RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule]
})
export class ResetPasswordRoutingModule { }
