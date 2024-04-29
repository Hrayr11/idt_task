import {Injectable} from '@angular/core';

import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {LoadingService} from './loading.service';
import {Router} from '@angular/router';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService,
              private loadingService: LoadingService,
              private route: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        authorization: this.authService.getToken()
      }
    })
    this.loadingService.enableLoading()
    return next.handle(req).pipe(
      catchError((resp: HttpErrorResponse) => {
        if (resp.status === 403) {
          localStorage.removeItem('token');
          this.route.navigate(['login'])
        }

        return throwError(resp)
      }), finalize(() => {
        this.loadingService.disableLoading()
      })
    )
  }
}
