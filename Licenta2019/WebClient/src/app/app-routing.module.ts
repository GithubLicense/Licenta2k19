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
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/:id/add-project',
    component: AddProjectComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/:id/projects',
    component: ProjectsListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/:id/projects/:projectid',
    component: ProjectDetailsComponent,
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
