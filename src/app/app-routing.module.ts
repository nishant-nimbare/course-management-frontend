import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseEditorComponent } from './components/course-editor/course-editor.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { MaterialEditorComponent } from './components/material-editor/material-editor.component';
import { TrendsComponent } from './components/trends/trends.component';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {path:'login', component:LoginComponent},

  {path:'home', component: HomeComponent, canActivate:[AuthGuard]},

  {path:'detail/:id', component: CourseDetailComponent, canActivate:[AuthGuard]},
  {path:'edit/:id', component: CourseEditorComponent, canActivate:[AuthGuard]},
  {path:'edit', component: CourseEditorComponent, canActivate:[AuthGuard]},

  {path:'material/detail/:id', component: MaterialDetailComponent, canActivate:[AuthGuard]},
  {path:'material/edit/:id', component:MaterialEditorComponent, canActivate:[AuthGuard]},
  {path:'material/new/:courseId', component:MaterialEditorComponent, canActivate:[AuthGuard]},

  {path:'trends', component: TrendsComponent},

  {path:'', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
