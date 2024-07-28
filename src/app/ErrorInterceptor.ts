/*import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError, Observable, EMPTY } from 'rxjs';
import { LoginServiceService } from './Service/login-service.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: LoginServiceService) {}
  
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Token expired, try refreshing token
            return this.authService.refreshToken().pipe(
              switchMap((newToken: string) => {
                // Retry request with new token
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  }
                });
                return next.handle(request);
              }),
              catchError((refreshError) => {
                // If refresh token also fails, redirect to login page
                this.authService.logout();
                return EMPTY; // Return EMPTY to complete the observable chain
              })
            );
          }
          // For other errors, just throw the error
          return throwError(error);
        })
      );
    }
  }
  */