import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { log } from 'node:util';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';

  private authService = inject(AuthService);

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe(console.log);
  }
}
