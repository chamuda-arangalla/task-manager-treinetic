import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private API_URL = 'http://localhost:8085/api/v1/user';

  async login(credentials: { username: string; password: string }): Promise<{ token: string }> {
    try {
      const response = await axios.post(`${this.API_URL}/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
        //  DO NOT include `withCredentials` here unless you're using cookies
      });

      const token = response.data.token;

      //  Save token to localStorage
      localStorage.setItem('token', token);

      //  Set token globally for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;


      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  //register a user
  async register(credentials: { username: string; password: string }): Promise<any> {
    const response = await axios.post(`${this.API_URL}/register`, credentials);
    return response.data;
  }
  

  logout(): void {
    localStorage.removeItem('token');

    //  Remove default header on logout
    delete axios.defaults.headers.common['Authorization'];
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
