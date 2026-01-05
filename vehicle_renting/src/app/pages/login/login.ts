import { Component, inject, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  // Hardcoded Login with Reactive Forms
  // FormControl can be done with signal as well
  //
  // userForm: FormGroup = new FormGroup({
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  // });

  // OR

  username = signal(new FormControl(''));
  password = signal(new FormControl(''));

  router = inject(Router);
  messageService = inject(MessageService);

  onLogin() {
    if (this.username().value?.toLowerCase() === 'admin' && this.password().value === '223344') {
      this.router.navigateByUrl('/dashboard');
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Failed',
        detail: 'Invalid username or password',
        life: 3000,
      });
    }
  }
}
