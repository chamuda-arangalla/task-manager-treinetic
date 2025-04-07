import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskUpdateFormComponent } from './pages/task-update-form/task-update-form.component';
import { LandingComponent } from './shared/landing/landing.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path:'login',component:LoginComponent},
    { path:'signup',component:SignupComponent},
    { path:'dashboard',component:DashboardComponent,canActivate: [AuthGuard]},
    { path:'taskForm',component:TaskFormComponent,canActivate: [AuthGuard]},
    { path:'taskEdit',component:TaskUpdateFormComponent,canActivate: [AuthGuard]},
];
