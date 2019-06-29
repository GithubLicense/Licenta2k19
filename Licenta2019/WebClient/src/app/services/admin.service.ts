import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Student } from '../models/student';
import { Observable } from 'rxjs';
import { Teacher } from '../models/teacher';
import { Course } from '../models/course';
import { CourseManagement } from '../admin/assign-user-to-course/assign-user-to-course.component';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addStudent(student: Student): Observable<any>{
    return this.http.post<Student>("https://localhost:44368/api/v1/users/students", student).pipe();
  }

  addTeacher(teacher: Teacher): Observable<any>{
    return this.http.post<Teacher>("https://localhost:44368/api/v1/users/teachers", teacher).pipe();
  }

  addCourse(course: Course): Observable<any>{
    return this.http.post<Course>("https://localhost:44368/api/v1/courses", course).pipe();
  }

  getCourses(): Observable<any> {
    return this.http.get("https://localhost:44368/api/v1/courses").pipe();
  }

  getUsers(): Observable<any> {
    return this.http.get("https://localhost:44368/api/v1/users").pipe();
  }

  addCourseManagement(courseManagement: CourseManagement): Observable<any> {
    return this.http.post<CourseManagement>("https://localhost:44368/api/v1/courses/manage", courseManagement).pipe();
  }
}
