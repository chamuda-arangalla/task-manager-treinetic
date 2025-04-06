import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';

export const routes: Routes = [
    { path:'login',component:LoginComponent},
    { path:'signup',component:SignupComponent},
    { path:'dashboard',component:DashboardComponent},
    { path:'task-form',component:TaskFormComponent},
];
