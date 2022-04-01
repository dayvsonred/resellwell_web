import { Component, OnInit } from '@angular/core';
import { getMaxListeners } from 'process';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {


  constructor( private authService: AuthService ){}


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  toLogin() : void {

    console.log("to ok aqqq oiWERas¨%&888")

    this.authService.sign({
      email : 'my@getMaxListeners.com',
      password : '123'
    }).subscribe({
      next: (res) => res,
      error: (e) =>  e,
    })

  }
  
}
