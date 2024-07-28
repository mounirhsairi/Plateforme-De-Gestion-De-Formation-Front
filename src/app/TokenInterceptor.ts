import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router, RouterEvent } from '@angular/router';
import { LoginServiceService } from './Service/login-service.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: LoginServiceService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // Handle successful response here
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const token = localStorage.getItem('access_token'); // Replace with your actual access token

          // Handle token expiration here
          // For example, you can redirect the user to the login page or refresh the token
          if(token)
          this.refreshToken(token);
        }
        return throwError(error);
      })
    );
  }
  private refreshToken(refreshToken: string) {
    this.authService.refreshToken(refreshToken)
      .subscribe(
        response => {
          // Handle successful token refresh response
          console.log('Token refreshed successfully:', response);
          // You may need to update your token storage here
        },
        error => {
          // Handle error appropriately, e.g., redirect to login page
          console.error('Error refreshing token:', error);
        }
      );
  }
}
