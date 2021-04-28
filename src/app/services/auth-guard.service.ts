import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService  implements CanActivate {

  currentUser:SocialUser;
  loggedIn:boolean;

  constructor(private router: Router,private socialAuthService: SocialAuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('-------Auth Guard -----------', this.currentUser);
    
    //for testing
    return true;
    
    if(!this.loggedIn)
      this.router.navigate(['/login']);
    
    return this.loggedIn;
  }

  setUser(user:SocialUser):void{
    this.currentUser = user;
    this.loggedIn = !!user;
    localStorage.setItem('user', JSON.stringify(user));
  }


  getUser():SocialUser {
    return this.currentUser;
  }

  isLoggedIn():boolean {
    return this.loggedIn;
  }

}
