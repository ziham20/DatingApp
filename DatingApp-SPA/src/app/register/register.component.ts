import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDaterangepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/user';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDaterangepickerConfig>; // partial key will make all fields optional
  
  constructor(
    private authService: AuthService,
    private aletrify: AlertifyService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() { 
    this.bsConfig = {
      containerClass: 'theme-default'
    },
    this.createRegisterForm();
}

createRegisterForm(){
  this.registerForm = this.fb.group({
    gender: ['male'],
    username: ['', Validators.required],
    knownAs: ['', Validators.required],
    dateOfBirth: [null, Validators.required],
    city: ['', Validators.required],
    country: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
    confirmPassword: ['', Validators.required]
  }, {validators: this.passwordMatchValidator});
}


passwordMatchValidator(g: FormGroup){
  return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
}

  register() {
    if (this.registerForm.valid)  {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(
        () => {
          this.aletrify.success('Registration successfull');
        },
        error => {
          this.aletrify.error(error);
        }, () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(['/members']);
          });
        }
      );
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}




// this.registerForm = new FormGroup({
//   username : new FormControl('', Validators.required),
//   password : new FormControl('',
//   [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
//   confirmPassword : new FormControl('', Validators.required)