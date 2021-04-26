import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseEditorComponent } from './components/course-editor/course-editor.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'detail/:id', component: CourseDetailComponent},
  {path:'edit/:id', component: CourseEditorComponent},
  {path:'edit', component: CourseEditorComponent},
  {path:'', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
