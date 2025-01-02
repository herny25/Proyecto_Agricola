import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StorePageComponent } from './store-page/store-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    StorePageComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule
  ]
})
export class StoreModule { }
