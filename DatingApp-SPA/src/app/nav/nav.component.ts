import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  login() {
      this.authService.login(this.model).subscribe(next => {
        this.alertify.success('Logged in successfully');
      }, error => {
        this.alertify.error('Failed to login');
      }, () => {
        this.router.navigate(['/members']);
      }
      );
  }

  loggedIn() {
    return this.authService.loggedIn();
   /* //without 3rd party token verification
    const token = localStorage.getItem('token');
    return !!token; // return true or false based on token value
    */
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }


}
