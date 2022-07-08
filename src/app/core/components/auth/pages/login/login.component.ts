import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, NgForm , FormsModule} from '@angular/forms';
import { getMaxListeners } from 'process';
import { UserLogin } from '../../../../../models/UserLogin.model';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {
  public formCliente: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    pass: ['', [Validators.required]],
  });
  public userLogin: UserLogin;
   

  constructor(private authService: AuthService,
     private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.createForm(new UserLogin());
 
  }

  onFormSubmit(): void {

  }

  toLogin(): void {

    console.log("to ok aqqq oiWERas¨%&888")
    console.log(this.formCliente.value.email)

    this.authService.sign({
      email: this.formCliente.value.email,
      password: this.formCliente.value.pass
    }).subscribe({
      next: (res) => res,
      error: (e) => e,
    })

  }

  createForm(userLogin: UserLogin) {
    this.formCliente = new FormGroup({
      email: new FormControl(userLogin.email),
      pass: new FormControl(userLogin.pass),
    })
  }

}
