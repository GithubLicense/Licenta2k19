import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuardService } from './auth-guard.service';
import { AddProjectComponent } from './projects/add-project/add-project.component';
import { StartUpComponent } from './start-up/start-up.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { AssignComponent } from './projects/assign/assign.component';
import { TeamsComponent } from './projects/teams/teams.component';
import { EvaluationComponent } from './projects/evaluation/evaluation.component';
import { EmailsComponent } from './emails/emails.component';
import { CourseDetailsComponent } from './course/course-details/course-details.component';
import { ResourcesComponent } from './resources-course/resources.component';
import { StatisticsComponent } from './projects/statistics/statistics.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: SignupComponent
  },
  {
    path: 'year/:year/profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id',
    component: CourseDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id/add-project',
    component: AddProjectComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id/projects',
    component: ProjectsListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id/projects/:projectid',
    component: ProjectDetailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id/projects/:projectid/assign',
    component: AssignComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id/projects/:projectid/teams',
    component: TeamsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id/evaluations',
    component: EvaluationComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id/emails',
    component: EmailsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id/resources',
    component: ResourcesComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'year/:year/profile/:id/statistics',
    component: StatisticsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'home',
    component: StartUpComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
