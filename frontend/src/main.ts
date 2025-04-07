import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import axios from 'axios';

const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
