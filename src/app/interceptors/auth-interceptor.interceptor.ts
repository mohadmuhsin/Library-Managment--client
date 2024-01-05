// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';
// import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
// import { catchError, switchMap, filter, take } from 'rxjs/operators';
// import { AuthServiceService } from '../services/auth-service.service';


// @Injectable()
// export class AuthInterceptorInterceptor implements HttpInterceptor {
//   private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//   constructor(private service :AuthServiceService){}
//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const token = localStorage.getItem('jwt');
//     const adminToken = localStorage.getItem('adJwt');
    
//     if (token) {
//       request = this.addToken(request, token);
//     }

//     if(adminToken){
//       request = this.addToken(request, adminToken);
//     }

//     return next.handle(request).pipe(
//       catchError(error => {
//         if (error.status === 401) {
//           return this.handle401Error(request, next);
//         }
//         return throwError(error);
//       })
//     );
//   }

//   private addToken(request: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
//     return request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }

//   private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     if (!this.refreshTokenSubject.value) {
//       this.refreshTokenSubject.next(null);
//       let newToken!:any;
//       this.service.refreshToken().subscribe({
//         next:(res:any)=>{
//           localStorage.setItem('tok',res.accessToken);
//           newToken = res.accessToken
//         },error:(err)=>{
//           console.log(err);
//         }
//       })

//       this.refreshTokenSubject.next(newToken);

//       return next.handle(this.addToken(request, newToken));
//     }


//     return this.refreshTokenSubject.pipe(
//       filter(token => token !== null),
//       take(1),
//       switchMap(() => next.handle(this.addToken(request, this.refreshTokenSubject.value)))
//     );
//   }
// }


import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userToken = localStorage.getItem('jwt');
    const adminToken = localStorage.getItem('adJwt');

    if (userToken) {
      request = this.addToken(request, userToken, "user");
    } else if (adminToken) {
      request = this.addToken(request, adminToken, "admin");
    }

    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>, token: string , role:string): HttpRequest<unknown> {
    console.log(request, token,"from interceptor");
    
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token} ${role}`
      }
    });
  }
}
