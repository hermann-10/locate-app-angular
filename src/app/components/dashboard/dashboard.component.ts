import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    users$!: Observable<any[]>;

  /* status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }*/
  
  constructor(private authService: AuthService, public auth: AngularFireAuth, private userService: UserService) { }

  ngOnInit() {
    this.users$ = this.userService.getUsers();
    console.log('this.users$', this.users$);
  }

  logout(){
    this.authService.SignOut();
  }

}
