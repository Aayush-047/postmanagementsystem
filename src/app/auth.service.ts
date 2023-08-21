import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  login(username: string, password: string) {
    // Simulate an API call to authenticate user
    if (username === 'user' && password === 'password') {
      sessionStorage.setItem('loggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }

  logout() {
    sessionStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return sessionStorage.getItem('loggedIn') === 'true';
  }
}
