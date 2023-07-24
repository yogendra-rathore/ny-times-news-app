import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  islandingPage=true;
  loggedInUser:any="";
  constructor(public router:Router,private shared:SharedService) { }
  ngOnInit(): void {
    this.shared.loggedInUser.subscribe(user=>{
      console.log("Inside shared sub",user);
      
      this.loggedInUser=user;
    })
    // this.loggedInUser=localStorage.getItem('currentUser')?localStorage.getItem('currentUser'):"Guest";
  }

  handleLogout() {
    this.shared.setCurrentUser("");
    this.shared.setToken("");
    this.router.navigateByUrl('/');
    }


}
