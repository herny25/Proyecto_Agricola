import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { FormsModule } from '@angular/forms';
import { RegisterPageComponent } from './register-page/register-page.component';

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FormsModule
  ]
})

export class RegisterModule {}
