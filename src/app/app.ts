import { AuthService } from './services/auth.service';
import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit{
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.refreshAuthState().subscribe();
  }

  protected readonly title = signal('front-end');
}
