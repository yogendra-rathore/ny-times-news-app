import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  loggedInUser:BehaviorSubject<String>;
  userPass:BehaviorSubject<String>;
  userToken:BehaviorSubject<String>;
  historySearches:BehaviorSubject<any[]>;
  user:String='';
  pass:String='';
  token:String='';
  keywords:any[]=[];
  constructor() {
    this.loggedInUser=new BehaviorSubject(this.user);
    this.userPass=new BehaviorSubject(this.pass);
    this.userToken=new BehaviorSubject(this.token);
    this.historySearches=new BehaviorSubject(this.keywords);
   }

   setCurrentUser(username:String){
     this.loggedInUser.next(username);
   }

   setCurrentUserPass(pass:String){
    this.userPass.next(pass);
  }


   setToken(token:String){
      this.userToken.next(token);
   }

   setHistorySearches(data:any[]){
    this.historySearches.next(data);
 }
}
