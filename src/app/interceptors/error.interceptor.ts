import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            const error = err.error || err.message;
            if (error.code === (400 || 404 || 500)) {
               alert(error.error);
            }
            if (error.code === (401)) {        
                alert(error.error);        
                this.authenticationService.logout();
                location.reload();
            }
           
            return throwError(error);
        }))
    }
}