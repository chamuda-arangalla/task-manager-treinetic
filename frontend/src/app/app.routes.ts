import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskUpdateFormComponent } from './pages/task-update-form/task-update-form.component';

export const routes: Routes = [
    { path:'login',component:LoginComponent},
    { path:'signup',component:SignupComponent},
    { path:'dashboard',component:DashboardComponent},
    { path:'taskForm',component:TaskFormComponent},
    { path:'taskEdit',component:TaskUpdateFormComponent},
];
