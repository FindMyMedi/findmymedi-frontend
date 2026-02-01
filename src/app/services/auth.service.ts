import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, distinctUntilChanged, map, Observable, of, tap } from 'rxjs';
import { CurrentUserResponse } from '../core/models/currentUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<CurrentUserResponse | null>(null);

  currentUser$ = this.currentUserSubject.asObservable();

  isLoggedIn$ = this.currentUser$.pipe(
    map((u) => !!u),
    distinctUntilChanged()
  );

  constructor(private http:HttpClient){}

  login() {
    window.location.assign(`${environment.backendBaseUrl}/oauth2/authorization/wso2`);
  }

  logout() {
    this.currentUserSubject.next(null);
    window.location.assign(`${environment.backendBaseUrl}/auth/logout`);
  }

  currentUserApi(): Observable<CurrentUserResponse> {
    return this.http.get<CurrentUserResponse>(`${environment.backendBaseUrl}/auth/current-user`, {
      withCredentials: true,
    });
  }

  refreshAuthState(): Observable<boolean> {
    return this.currentUserApi().pipe(
      tap((user) => this.currentUserSubject.next(user)),
      map(() => true),
      catchError(() => {
        this.currentUserSubject.next(null);
        return of(false);
      })
    );
  }
}
