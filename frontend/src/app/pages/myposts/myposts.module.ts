import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypostsRoutingModule } from './myposts-routing.module';
import { RouterModule } from '@angular/router';
import { MypostsComponent } from './myposts/myposts.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MypostsComponent
  ],
  imports: [
    CommonModule,
    MypostsRoutingModule,
    RouterModule,
    FormsModule
  ]
})
export class MypostsModule { }
