import { Component, ElementRef, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-menu',
  imports: [CommonModule, RouterModule],
  templateUrl: './user-menu.component.html',
  styleUrl: './user-menu.component.css',
})
export class UserMenuComponent {
  user$: Observable<User | null>;
  isOpen = false;

  constructor(
    private auth: AuthService,
    private el: ElementRef<HTMLElement>,
  ) {
    this.user$ = this.auth.user$;
  }

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  closeMenu(): void {
    this.isOpen = false;
  }

  logout(): void {
    this.closeMenu();
    this.auth.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.isOpen) return;

    const clickedInside = this.el.nativeElement.contains(event.target as Node);
    if (!clickedInside) this.closeMenu();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isOpen) this.closeMenu();
  }
}
