import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password });
  }

  sendOtp(phone: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/send-otp`, { phone });
  }

  verifyOtp(phone: string, code: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/verify-otp`, { phone, code });
  }
}
