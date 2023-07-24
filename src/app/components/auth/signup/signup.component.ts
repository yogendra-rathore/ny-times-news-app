import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserAuthService } from 'src/app/services/authService/user-auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  showAlert:boolean=false;
  alertContent={
    "type":'success',
    "message":'User Created Successfully'
  }
  constructor(private service:UserAuthService) { }
  signupform=new FormGroup({
    email:new FormControl(''),
    name:new FormControl(''),
    org:new FormControl(''),
    password:new FormControl(''),
    // cpassword:new FormControl('')
    
  })
  ngOnInit(): void {
  }
  async userSignUp(){
     console.log("final sign up data",this.signupform.value);
     
    let payload={
      email: this.signupform.value.email,
      password: this.signupform.value.password,
      name: this.signupform.value.name,
      org: this.signupform.value.org,

    }
    console.log("final response send",payload);
    
    await this.service.registerUser(payload).subscribe((response)=>{
      console.log("data received from service",response);
    
       this.showAlert=true; 
       this.signupform.reset({});
     
    },
    (error)=>{
      console.log("inside error",error);
      // this.errorAlert=true;
      // this.errorMessage=true;
      
    }
    );

    
    
  }
  resetForm(){
    this.signupform.reset({});
  }

}
