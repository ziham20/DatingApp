import { PaginatedResult } from './../_models/pagination';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

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

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if(userParams != null){
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http.get<User[]>(this.baseUrl + '/users', { observe: 'response', params}) // get method returns an object
      .pipe(
        map( response => {
          paginatedResult.result = response.body;
          if ( response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        }
        )
      );
    }


  getUser(id): Observable<User> {
    return this.http.get<User>(this.baseUrl + '/users/' + id);
  }

  updateUser(id: number, user: User){
    return this.http.put(this.baseUrl + '/users/' + id, user);
  }

  setMainPhoto(userId: number, id: number){
    return this.http.post(this.baseUrl + '/users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number){
    return this.http.delete(this.baseUrl + '/users/' + userId + '/photos/' + id);
  }


}
