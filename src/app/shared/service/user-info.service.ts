import {Injectable} from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CountryCodeItemInterface} from '../interface/country-code.interface';
import {MainResponseInterface} from '../interface/main-response.interface';
import {UserDataInterface} from '../interface/userData.interface';
import {BankAccountInterface} from '../interface/bankAccount.interface';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {

  constructor(private http: HttpClient) {
  }

  getSelectCode(): Observable<CountryCodeItemInterface> {
    return this.http.get<MainResponseInterface>(`${environment.apiUrl}/GetCountryCode`)
      .pipe(map(res => res.result));
  }

  getUserData(): Observable<UserDataInterface> {
    return this.http.get<MainResponseInterface>(`${environment.apiUrl}/getUserData`)
      .pipe(map(res => res.result));
  }

  getBankAccounts(): Observable<BankAccountInterface[]> {
    return this.http.get<MainResponseInterface>(`${environment.apiUrl}/getBankAccounts`)
      .pipe(map(res => res.result));
  }

  getAdditionalData(): Observable<string> {
    return this.http.get<MainResponseInterface>(`${environment.apiUrl}/getAdditionalData`)
      .pipe(map(res => res.result.description));
  }

  getTransactions(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/getTransactions`).pipe(catchError(() => of([])));
  }

}
