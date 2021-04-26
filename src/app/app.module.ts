import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { HomeComponent } from './components/home/home.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseEditorComponent } from './components/course-editor/course-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { MaterialEditorComponent } from './components/material-editor/material-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseItemComponent,
    HomeComponent,
    CourseDetailComponent,
    CourseEditorComponent,
    MaterialListComponent,
    MaterialDetailComponent,
    MaterialEditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
