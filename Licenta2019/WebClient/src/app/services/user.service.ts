import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(protected http: HttpClient) { }

  getProjects(year: string): Observable<any> {
    return this.http.get("https://localhost:44308/api/v1/users/year/" + year).pipe();
  }
}
