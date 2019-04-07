import { Injectable } from '@angular/core';
import { User, UserLogin } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {
     }

    public isAuthenticated(): boolean {
      const token = window.localStorage.getItem('token');
      console.log(token);
      if (token == null)
      {
        return false;
      }
      return true;
    }

  signUp(userInformation: User): Observable<any>{
      return this.http.post<User>("https://localhost:44308/api/v1/register", userInformation).pipe();
  }

  login(userInformation: UserLogin): Observable<any>{
      return this.http.post<UserLogin>("https://localhost:44308/api/v1/login", userInformation).pipe();
  }
}
