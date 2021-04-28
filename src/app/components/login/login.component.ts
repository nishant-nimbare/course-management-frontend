import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { User } from 'src/app/models/User';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private authService: SocialAuthService) { }

  ngOnInit(): void {
  }


  signInWithGoogle(): void {
    console.log('trying login');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(()=>{
      console.log('logged in');
      this.router.navigate(['/home'])
    });
  }

}
