import { Injectable } from '@angular/core';
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken { exp: number; }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private API_URL = 'http://localhost:8085/api/v1/user';

  constructor() {
    this.loadToken();
    this.setupInterceptors();
  }

  // Load any existing token at startup
  private loadToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }

  // Configure axios interceptors
  private setupInterceptors(): void {
    // 1) Request interceptor
    axios.interceptors.request.use(
      config => {
        const url = config.url ?? '';

        // If hitting login or register, strip out any leftover Authorization header
        if (url.endsWith('/login') || url.endsWith('/register')) {
          if (config.headers) {
            delete (config.headers as Record<string, any>)['Authorization'];
          }
          return config;
        }

        // Otherwise ensure headers object exists
        config.headers = config.headers || {};

        // Attach current token
        const token = this.getToken();
        if (token) {
          (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
        }

        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );

    // 2) Response interceptor to catch 401s
    axios.interceptors.response.use(
      response => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          this.logout();
          // optional: redirect user to login page
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Check if a JWT’s exp timestamp is in the past
  private isTokenExpired(token: string): boolean {
    try {
      const { exp } = jwtDecode<DecodedToken>(token);
      return exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  // Public method: is user still “logged in”?
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token || this.isTokenExpired(token)) {
      this.logout();
      return false;
    }
    return true;
  }

  // Public method: get raw token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Login endpoint: saves token on success
  async login(credentials: { username: string; password: string }): Promise<{ token: string }> {
    const response = await axios.post(
      `${this.API_URL}/login`,
      credentials,
      { headers: { 'Content-Type': 'application/json' } }
    );
    const token = response.data.token;
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return response.data;
  }

  // Register endpoint: explicitly set headers so no Authorization header is sent
  async register(credentials: { username: string; password: string }): Promise<any> {
    const response = await axios.post(
      `${this.API_URL}/register`,
      credentials,
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data;
  }

  // Logout: clear token from storage and axios defaults
  logout(): void {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
}
