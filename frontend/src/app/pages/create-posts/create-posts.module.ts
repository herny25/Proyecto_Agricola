import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { CreatePostsRoutingModule } from './create-posts-routing.module';
import { CreatePostsPageComponent } from './create-posts-page/create-posts-page.component';

@NgModule({
  declarations: [CreatePostsPageComponent
  ],
  imports: [
    CommonModule,
    CreatePostsRoutingModule,
    FormsModule
  ]
})
export class CreatePostsModule { }
