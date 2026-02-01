import { CommonModule } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  constructor(private authService: AuthService) {}

 ngOnInit(): void {
  this.isLoggedIn$ = this.authService.isLoggedIn$;
  this.authService.refreshAuthState().subscribe();
}
  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
  }
}
