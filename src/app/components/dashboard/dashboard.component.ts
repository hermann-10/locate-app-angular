import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }
  
  constructor(private authService: AuthService, public auth: AngularFireAuth) { }

  ngOnInit() {
  }

  logout(){
    this.authService.SignOut();
  }

}
