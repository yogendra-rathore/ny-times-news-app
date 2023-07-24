import { Injectable } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { UserAuthService } from '../authService/user-auth.service';

@Injectable({
  providedIn: 'root'
})

// This interceptor service will inject jwt token for every API call we are making
// In given task as NY Times API bloking us to inject JWT token as a part of headers
// But yes this interceptor can be leverage when we have our own backend server


export class TokenInterceptorService {
  token:String='';
  userCred:String='';
  constructor(private sharedService:SharedService,private authService: UserAuthService) { }
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (req.headers.get("skip") || req.method== 'OPTIONS' ){
      console.log("skip auth",req.headers);
      return next.handle(req);
    }
          
    else{
       this.sharedService.userToken.subscribe(tok=>{
        this.token=tok;
        console.log("Updated Token Value",this.token);
        
        
      });
     
      // let tokenizedReq=req.clone({
      //   setHeaders:{
      //     Authorization:`Bearer ${this.token}`
      //   }
      // })
      // console.log("updated req",tokenizedReq);
      
      return next.handle(req);
    }
  }
}
