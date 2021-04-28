import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseEditorComponent } from './components/course-editor/course-editor.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { MaterialEditorComponent } from './components/material-editor/material-editor.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'home', component: HomeComponent},

  {path:'detail/:id', component: CourseDetailComponent},
  {path:'edit/:id', component: CourseEditorComponent},
  {path:'edit', component: CourseEditorComponent},

  {path:'material/detail/:id', component: MaterialDetailComponent},
  {path:'material/edit/:id', component:MaterialEditorComponent},
  {path:'material/new/:courseId', component:MaterialEditorComponent},

  {path:'', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
