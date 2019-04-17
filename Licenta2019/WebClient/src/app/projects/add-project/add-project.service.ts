import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddProjectService {

  constructor(private http: HttpClient) { }

  addProject(project: Project, courseId: string): Observable<any>{
    return this.http.post<Project>("https://localhost:44308/api/v1/profile/"+courseId+"/add-project", project).pipe();
  }

  getProjects(courseId: string): Observable<any> {
    return this.http.get("https://localhost:44308/api/v1/profile/" + courseId + "/projects").pipe();
  }

  getProjectById(courseId: string, projectId: string): Observable<any> {
    return this.http.get("https://localhost:44308/api/v1/profile/" + courseId + "/projects/" + projectId).pipe();
  }
}
