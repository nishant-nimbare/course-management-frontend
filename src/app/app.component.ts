import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from 'angularx-social-login';
import { User } from './models/User';
import { AuthGuardService } from './services/auth-guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'course-management';
  user:User;
  loggedIn:boolean;

  constructor(private router: Router, private authService: SocialAuthService, private authGuard: AuthGuardService){}

  ngOnInit(): void {
    // this.authService.authState.subscribe((user) => {
    //   this.authGuard.setUser(user);
      
    // });

    this.authGuard.user.subscribe(u=>{
      this.user = u;
      this.loggedIn = (u != null);
    })
  }

  logOut():void {
    this.authService.signOut().then(()=>{
      this.authGuard.setUser(null);
      console.log('logged out');
      this.router.navigate(['/login']);
    });
  }

  isTrainer():boolean{
    return this.authGuard.isTrainer();
  }

}
