import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/models/jwtResponse';
import { UserAuthService } from 'src/app/services/authService/user-auth.service';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  errorMessage=false;
  showPassword=false;
  errorAlert=false;
  alertContent={
    "type":'danger',
    "message":'Incorrect Credentials'
  }
  constructor(private router:Router,private authService:UserAuthService,private shared:SharedService) { 

  }

  ngOnInit(): void {
   
  }
   getLoginDetails(data:any ){
    console.log("email",data.email); 
     this.authService.getJwtToken(data).subscribe((response:any)=>{
      console.log("data received from service",response);
    
        console.log("inside if token value",response['access_token']);
        localStorage.setItem('token',response['access_token']);
        this.shared.setCurrentUser(data.email);
        this.shared.setCurrentUserPass(data.email);
        this.shared.setToken(response['token']);
        // this.router.navigateByUrl('home');
        this.router.navigateByUrl('news-articles');
     
    },
    (error)=>{
      console.log("inside error",error);
      this.errorAlert=true;
      this.errorMessage=true;
      
    }
    );
    
  }

  showPass(){
    this.showPassword=!this.showPassword;
  }


}
