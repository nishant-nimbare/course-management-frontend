import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { AuthGuardService } from './auth-guard.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements  HttpInterceptor {

  constructor(private authGuard : AuthGuardService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  
    let u = this.authGuard.user.getValue(); 

    if(u){

      let headers:HttpHeaders = request.headers;
      
      if(u.email){
        headers = headers.set('userId', u.email);
      }
      //  headers['userId'] = u.email;
      
      if(u.role){
        headers = headers.set('role', u.role)
      } 
      // headers['role'] = u.role;
      
      request = request.clone({headers});

      console.log('inercepted - ', request.url, request.headers);
    }

    return next.handle(request);
  }
}
