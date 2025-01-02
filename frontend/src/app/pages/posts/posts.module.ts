import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostsPageComponent } from './posts-page/posts-page.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PostsPageComponent
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    FormsModule
  ]
})
export class PostsModule { }
