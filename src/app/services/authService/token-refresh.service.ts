import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenRefreshService {

  constructor(private authService:UserAuthService) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    console.log("Inside isTokenExpired",token);
    
    if (!token) return true;

    const tokenExpiration = this.getTokenExpirationDate(token);
    console.log("Inside expiration time isTokenExpired",tokenExpiration?.getTime());
    console.log("Inside current time isTokenExpired",new Date().getTime());

    if (!tokenExpiration) return true;

    return tokenExpiration.getTime() < new Date().getTime();
  }

  getTokenExpirationDate(token: string): Date | null {
    try {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return new Date(decodedToken.exp * 1000);
    } catch (error) {
      return null;
    }
  }

  getUserDetailsFromToken(){
    try {
      let token:string|null=this.getToken();
      if(token){

        var decodedToken = JSON.parse(atob(token.split('.')[1]));
      }
      return decodedToken;
    } catch (error) {
      return null;
    }
  }

  refreshToken(userData:any) {
    this.authService.refreshJwtToken(userData).subscribe((data:any)=>{

        console.log("Token Has been Refreshed");
        localStorage.setItem('token',data['access_token']);
        
    });
   
  }

}
