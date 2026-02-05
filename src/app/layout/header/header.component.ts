import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../core/models/user.model';
import { UserMenuComponent } from '../../shared/components/user-menu/user-menu.component';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule, UserMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user$: Observable<User | null>;
  isLoggedIn$: Observable<boolean>;
  authReady$: Observable<boolean>;

  constructor(private auth: AuthService) {
    this.user$ = this.auth.user$;
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    this.authReady$ = this.auth.authReady$;
  }

  login() {
    this.auth.login();
  }

}
