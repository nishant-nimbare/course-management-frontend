import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate{
  user:BehaviorSubject<User> = new BehaviorSubject(null);;
  currentUser:SocialUser;
  loggedIn:boolean;
  trainer:boolean;

  constructor(private injector: Injector, private router: Router,private http: HttpClient, private authService: SocialAuthService) {
    this.authService.authState.subscribe((user) => {
      this.setUser(user);
    });
   }
   

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // //for testing
    // return true;
    
    if(!this.loggedIn)
      this.router.navigate(['/login']);
    
    return this.loggedIn;
  }


  

  setUser(user:SocialUser):void{

    this.logIn(user).subscribe(u=>{
      this.currentUser = user;
      this.loggedIn = !!user;
      localStorage.setItem('user', JSON.stringify(u));
      
      this.trainer = (u.role === 'TRAINER');
      
      let cu:User = {...u};
      cu.isTrainer = this.trainer;
      
      console.log("user",cu); 
      this.user.next(cu);
      this.router.navigate(['/home']);
    });
  }


  getUser():SocialUser {
    return this.currentUser;
  }

  isLoggedIn():boolean {
    return this.loggedIn;
  }

  //call server enpoint
  logIn(user:SocialUser):Observable<User>{
    let formData: FormData = new FormData();

    formData.append('email', user.email);
    formData.append('name', user.name);
    return this.http.post<User>(new URL("/user/login",environment.BaseUrl).href, formData);
  }



}
