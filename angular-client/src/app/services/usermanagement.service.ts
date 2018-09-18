import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsermanagementService {

  constructor(private http: HttpClient) { }

  signin(data): Promise<any> {
    return this.http.post('api/user/signin', data).toPromise();
  }

  signup(data): Promise<any> {
    return this.http.post('api/user/signup', data).toPromise();
  }

  logout() {
    return this.http.post('api/user/logout', {}).toPromise();
  }

  me() {
    return this.http.get('api/user/me').toPromise();
  }

  changePassword(data) {
    return this.http.put('api/user/me/password', data).toPromise();
  }

  changeEmail(data) {
    return this.http.put('api/user/me/email', data).toPromise();
  }

  lostPassword(data) {
    return this.http.post('api/user/lost_password', data).toPromise();
  }

  changeLostPassword(data) {
    return this.http.put('api/user/lost_password', data).toPromise();
  }

  sendVerificationEmail(data) {
    return this.http.post('api/user/me/send_verification_email', data).toPromise();
  }
}
