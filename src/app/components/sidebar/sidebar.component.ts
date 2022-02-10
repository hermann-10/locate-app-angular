import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

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
