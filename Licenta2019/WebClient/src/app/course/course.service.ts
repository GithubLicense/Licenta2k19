import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  getUserCourses(userId: string): Observable<any> {
    return this.http.get("https://localhost:44368/api/v1/courses/users/" + userId).pipe();
  }

  getCourseById(courseId: string): Observable<any> {
    return this.http.get("https://localhost:44368/api/v1/courses/" + courseId).pipe();
  }
}
