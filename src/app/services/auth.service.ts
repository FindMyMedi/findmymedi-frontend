import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  distinctUntilChanged,
  map,
  Observable,
  of,
  shareReplay,
  tap,
} from 'rxjs';
import { User } from '../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private authReadySubject = new BehaviorSubject<boolean>(false);

  user$ = this.userSubject.asObservable().pipe(distinctUntilChanged(), shareReplay(1));
  isLoggedIn$ = this.user$.pipe(
    map((u) => !!u),
    distinctUntilChanged(),
    shareReplay(1),
  );
  authReady$ = this.authReadySubject.asObservable().pipe(distinctUntilChanged(), shareReplay(1));

  constructor(private http: HttpClient) {}

  login() {
    window.location.assign(`${environment.backendBaseUrl}/oauth2/authorization/wso2`);
  }

  logout() {
    this.userSubject.next(null);
    window.location.replace(`${environment.backendBaseUrl}/auth/logout`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.backendBaseUrl}/auth/current-user`, {
      withCredentials: true,
    });
  }

  refreshAuthState(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      tap((user) => this.userSubject.next(user)),
      map(() => true),
      catchError(() => {
        this.userSubject.next(null);
        return of(false);
      }),
      tap(() => this.authReadySubject.next(true)),
    );
  }
}
