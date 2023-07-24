import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
const routes: Routes = [
  {path:'',component: SigninComponent},
  {path:'signup',component: SignupComponent},
  { path: 'news-articles', loadChildren: () => import('./components/stories-feature/stories-feature.module').then(m => m.StoriesFeatureModule) },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
