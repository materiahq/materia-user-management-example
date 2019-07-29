import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  signin(data): Observable<User> {
    return this.http.post<User>('api/user/signin', data);
  }

  signup(data): Observable<User> {
    return this.http.post<User>('api/user/signup', data);
  }

  logout(): Observable<any> {
    return this.http.post('api/user/logout', null);
  }

  me(): Observable<User> {
    return this.http.get<User>('api/user/me');
  }

  changePassword(data: {new_password: string, old_password: string}): Observable<any> {
    return this.http.put('api/user/me/password', data);
  }

  changeEmail(data: {new_email: string}): Observable<any> {
    return this.http.put('api/user/me/email', data);
  }

  lostPassword(data: {email: string}): Observable<any> {
    return this.http.post('api/user/lost_password', data);
  }

  changeLostPassword(data: {
    id_user: number,
    key: string,
    new_password: string
  }): Observable<any> {
    return this.http.put('api/user/lost_password', data);
  }

  sendVerificationEmail(): Observable<any> {
    return this.http.post('api/user/me/send_verification_email', null);
  }
}
