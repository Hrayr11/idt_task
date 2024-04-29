import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';
import {MainResponseInterface} from '../interface/main-response.interface';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  checkPhone(data: {
    username: string
  }): Observable<any> {

    return this.http.post<MainResponseInterface>(`${environment.apiUrl}/checkPhone`, data)
      .pipe(map(res => res.message));
  }

  login(data: {
    username: string,
    password: string
  }): Observable<any> {
    return this.http.post<MainResponseInterface>(`${environment.apiUrl}/login`, data)
      .pipe(tap((res) => {
        localStorage.setItem('token', res.token)
      }));
  }

  isLogedIn() {
    return !!this.getToken()
  }

  getToken() {
    return (localStorage.getItem('token') || '')
  }

}
