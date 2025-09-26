// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'; // Assuming you have a Router service

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    // Handle 401 Unauthorized error
                    // Example: Clear session, redirect to login
                    console.error('Unauthorized request, redirecting to login...');
                    localStorage.removeItem('userDetail')
                    localStorage.removeItem('token')
                    // You might want to clear local storage or a service's state here
                    this.router.navigate(['/sign-in']); // Redirect to your login page
                }
                return throwError(() => error); // Re-throw the error for other handlers
            })
        );
    }
}