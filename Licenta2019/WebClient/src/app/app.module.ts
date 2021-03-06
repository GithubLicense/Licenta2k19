import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupService } from './signup/signup.service';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProjectsComponent } from './projects/projects.component';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { HeaderComponent } from './header/header.component';
import { StartUpComponent } from './start-up/start-up.component';
import { ProjectCardComponent } from './projects/project-card/project-card.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { AssignComponent } from './projects/assign/assign.component';
import { CourseCardComponent } from './course/course-card/course-card.component';
import { TeamsComponent } from './projects/teams/teams.component';
import { EvaluationComponent } from './projects/evaluation/evaluation.component';
import { EmailsComponent } from './emails/emails.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { ResourcesComponent } from './resources-course/resources.component';
import { StatisticsComponent } from './projects/statistics/statistics.component';
import { MatTableModule } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignUpAdminComponent } from './sign-up-admin/sign-up-admin.component';
import { AddStudentComponent } from './admin/add-student/add-student.component';
import { AddTeacherComponent } from './admin/add-teacher/add-teacher.component';
import { AddCourseComponent } from './admin/add-course/add-course.component';
import {MatSelectModule} from '@angular/material/select';
import { AssignUserToCourseComponent } from './admin/assign-user-to-course/assign-user-to-course.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    ProfileComponent,
    SidebarComponent,
    ProjectsComponent,
    AddProjectComponent,
    HeaderComponent,
    StartUpComponent,
    ProjectCardComponent,
    ProjectsListComponent,
    ProjectDetailsComponent,
    AssignComponent,
    CourseCardComponent,
    TeamsComponent,
    EvaluationComponent,
    EmailsComponent,
    CourseDetailsComponent,
    ResourcesComponent,
    StatisticsComponent,
    SignUpAdminComponent,
    AddStudentComponent,
    AddTeacherComponent,
    AddCourseComponent,
    AssignUserToCourseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatSelectModule
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
