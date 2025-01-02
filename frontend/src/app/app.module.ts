import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeModule } from './pages/home/home.module';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './pages/login/login.module';
import { RouterModule, Routes } from '@angular/router';
import { ProfileModule } from './pages/profile/profile.module';
import { StoreModule } from './pages/store/store.module';
import { HelpModule } from './pages/help/help.module';
import { RegisterModule } from './pages/register/register.module';
import { CreatePostsModule } from './pages/create-posts/create-posts.module';
import { MypostsModule } from './pages/myposts/myposts.module';
import { ForgottenPasswordModule } from './pages/forgotten-password/forgotten-password.module';
import { ResetPasswordModule } from './pages/reset-password/reset-password.module';
import { PostsModule } from './pages/posts/posts.module';
import { EditPostModule } from './pages/edit-post/edit-post.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CreatePostsModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    FormsModule,
    LoginModule,
    RouterModule,
    ProfileModule,
    StoreModule,
    HelpModule,
    RegisterModule,
    MypostsModule,
    PostsModule,
    ForgottenPasswordModule,
    EditPostModule,
    ResetPasswordModule,
    ReactiveFormsModule
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideAnimationsAsync('noop'),
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
