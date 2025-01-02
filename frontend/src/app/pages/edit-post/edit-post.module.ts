import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditPostRoutingModule } from './edit-post-routing.module';
import { EditPostPageComponent } from './edit-post-page/edit-post-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EditPostPageComponent
  ],
  imports: [
    CommonModule,
    EditPostRoutingModule,
    FormsModule
  ]
})
export class EditPostModule { }
