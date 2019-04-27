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
    CourseCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
