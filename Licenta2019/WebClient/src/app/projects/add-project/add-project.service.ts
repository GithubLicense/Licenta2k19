import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../models/project';
import { Observable } from 'rxjs';
import { Team } from '../../models/team';
import { Evaluation } from '../../models/evaluation';
import { Email } from '../../models/email';

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

  getProjectYear(courseId: string, projectId: string): Observable<any> {
    return this.http.get("https://localhost:44308/api/v1/profile/" + courseId + "/projects/" + projectId + "/year").pipe();
  }

  getAssignedToProject(courseId: string, userId: string): Observable<any> {
    return this.http.get("https://localhost:44308/api/v1/profile/" + courseId + "/checkAssigned/" + userId).pipe();
  }

  sendEmail(email: Email, userId: string): Observable<any>{
    return this.http.post<Email>("https://localhost:44308/api/v1/profile/"+userId+"/send-email",email).pipe();
  }

  assignToProject(team: Team, courseId: string, projectId: string): Observable<any>{
    return this.http.post<Project>("https://localhost:44308/api/v1/profile/"+courseId+"/projects/" + projectId + "/assign", team).pipe();
  }

  getTeamsByProject(courseId: string, projectId: string): Observable<any> {
    return this.http.get("https://localhost:44308/api/v1/profile/"+courseId+"/projects/" + projectId + "/teams").pipe();
  }

  addEvalution(evalution: Evaluation, courseId: string, projectId: string, teamId: string): Observable<any>{
    return this.http.post<Project>("https://localhost:44308/api/v1/profile/"+courseId+"/projects/" + projectId + "/teams/" + teamId, evalution).pipe();
  }

  getEvaluations(courseId: string, userId: string): Observable<any> {
    return this.http.get("https://localhost:44308/api/v1/profile/"+courseId+"/evaluations/" + userId).pipe();
  }

  getResources(courseId: string): Observable<any> {
    return this.http.get("https://localhost:44308/api/v1/files/"+courseId).pipe();
  }

  addFile(courseId: string, file: any): Observable<any> {
    return this.http.post<any>("https://localhost:44308/api/v1/files/"+courseId+"/upload", file).pipe();
  }

  getTeamInfo(courseId: string, userId: string): Observable<any> {
    return this.http.get("https://localhost:44308/api/v1/profile/"+courseId+"/teamInfo/" + userId).pipe();
  }

  getTeamStatistics(courseId: string, projectId: string, teamId: string):Observable<any>{
    return this.http.get("https://localhost:44308/api/v1/profile/"+courseId+"/projects/" + projectId + "/teams/" + teamId + "/statistics").pipe();
  }
}
