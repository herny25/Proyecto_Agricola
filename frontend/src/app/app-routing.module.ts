import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile/profile-page/profile-page.component';
import { StorePageComponent } from './pages/store/store-page/store-page.component';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { PostsPageComponent } from './pages/posts/posts-page/posts-page.component';
import { HelpPageComponent } from './pages/help/help-page/help-page.component';
import { HomePageComponent } from './pages/home/home-page/home-page.component';
import { RegisterPageComponent } from './pages/register/register-page/register-page.component';
import { MypostsComponent } from './pages/myposts/myposts/myposts.component';
import { CreatePostsPageComponent } from './pages/create-posts/create-posts-page/create-posts-page.component';
import { ForgottenPasswordPageComponent } from './pages/forgotten-password/forgotten-password-page/forgotten-password-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password/reset-password-page/reset-password-page.component';
import { EditPostPageComponent } from './pages/edit-post/edit-post-page/edit-post-page.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component:HomePageComponent },
  { path: 'store', component:StorePageComponent, },
  { path: 'profile', component:ProfilePageComponent, canActivate: [AuthGuard] },
  { path: 'posts/:id', component: PostsPageComponent },
  { path: 'help', component:HelpPageComponent },
  { path: 'register', component:RegisterPageComponent },
  { path: 'myposts', component:MypostsComponent, canActivate: [AuthGuard] },
  { path: 'create-posts', component:CreatePostsPageComponent, canActivate: [AuthGuard] },
  { path: 'forgotten-password', component:ForgottenPasswordPageComponent },
  { path: 'reset-password', component:ResetPasswordPageComponent },
  { path: 'edit-product/:id', component:EditPostPageComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
