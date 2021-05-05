import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseItemComponent } from './components/course-item/course-item.component';
import { HomeComponent } from './components/home/home.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseEditorComponent } from './components/course-editor/course-editor.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialListComponent } from './components/material-list/material-list.component';
import { MaterialDetailComponent } from './components/material-detail/material-detail.component';
import { MaterialEditorComponent } from './components/material-editor/material-editor.component';
import { LoginComponent } from './components/login/login.component';

import {environment} from '../environments/environment';
import { AuthGuardService } from './services/auth-guard.service';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    CourseItemComponent,
    HomeComponent,
    CourseDetailComponent,
    CourseEditorComponent,
    MaterialListComponent,
    MaterialDetailComponent,
    MaterialEditorComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocialLoginModule,
    FormsModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.googleClientID
            )
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
