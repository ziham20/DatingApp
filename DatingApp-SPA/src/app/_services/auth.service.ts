import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map} from 'rxjs/operators';
import {  JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // baseUrl = 'http://localhost:60885/api/auth/';
  baseUrl = environment.apiUrl + '/auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  curentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

constructor(

  private http: HttpClient

  ) { }

  changeMemberPhoto(photoUrl: string){
    this.photoUrl.next(photoUrl);
  }

  loggedIn()
  {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
    .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token',  user.token);
            localStorage.setItem('user',  JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.curentUser =  user.user;
            this.changeMemberPhoto(this.curentUser.photoUrl)
          }
        })
    ); // rxjs operator - get response from the server
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }



}
