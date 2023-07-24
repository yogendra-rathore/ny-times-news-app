import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private http:HttpClient) { }

  getJwtToken(data:any){
    let url='http://localhost:8000/auth/login';
    return this.http.post(url,data,{headers:{skip:"true"}})
  }

  refreshJwtToken(data:any){
    let url='http://localhost:8000/auth/login';
    return this.http.post(url,data,{headers:{skip:"true"}})
  }


  registerUser(data:any){
    let url='http://localhost:8000/auth/signup';
    return this.http.post(url,data,{headers:{skip:"true"}});
  }
}
