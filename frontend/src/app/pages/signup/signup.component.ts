import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSignup(): Promise<void> {
    if (this.signupForm.invalid) return;

    const { username, password } = this.signupForm.value;
    try {
      const res = await this.authService.register({ username, password });
      alert('Registration successful! Please log in.');
      this.router.navigate(['/login']);
    } catch (err) {
      console.error('Signup failed:', err);
      alert('Signup failed. Try a different username.');
    }
  }
}
