import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    try {
      const res = await this.authService.login({ username, password });
      localStorage.setItem('token', res.token); // Store JWT
      this.router.navigate(['/dashboard']);
    } catch (err) {
      alert('Login failed. Please check your credentials.');
      console.error(err);
    }
  }
}
