import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

// manually get the token from local storage and add it to the request
// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' +  localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.apiUrl;

constructor(

  private http: HttpClient

) { }
  // implementation for manuallly adding the token
  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.baseUrl + 'users', httpOptions); // get method returns an object
  // }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + '/users'); // get method returns an object
  }


  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users/' + id);
  }

}
