import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CurrentUserResponse } from '../core/models/currentUser.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http:HttpClient){}

  login() {
    window.location.assign(`${environment.backendBaseUrl}/oauth2/authorization/wso2`);
  }

  logout() {
    window.location.assign(`${environment.backendBaseUrl}/auth/logout`);
  }

  currentUser(): Observable<CurrentUserResponse> {
    return this.http.get<CurrentUserResponse>(`${environment.backendBaseUrl}/auth/current-user`, {
      withCredentials: true,
    });
  }
}
